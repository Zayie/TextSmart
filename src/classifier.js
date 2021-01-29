// =============================================================================
//
// • MODULE/PKG: TextSmart
// • COPYRIGHT: © Copyright Zayie Software, Inc. 2021
// • LICENSE: Licensed under the CC0-1.0 License (https://creativecommons.org/publicdomain/zero/1.0)
//
// =============================================================================

import XRegExp from 'xregexp';
import Model from './model';
import Prediction from './prediction';

class Classifier {
    constructor(model = {}) {
        if (!(model instanceof Model)) model = new Model(model);
        this._model = model;
    }

    get model() {
        return this._model;
    }

    set model(model) {
        if (!(model instanceof Model)) model = new Model(model);
        this._model = model;
    }

    /**
     * Train the brain to understand an input and output or a set of inputs with 1 output.
     *
     * @param {(string|string[])} input - String, or an array of strings, the input.
     * @param {string} output - String, the expected output.
     * @return {this}
     */
    train(input, output) {
        if (typeof input !== 'string' && !(input instanceof Array)) throw new Error('Whoops! Input must be either a string or array');
        if (typeof output !== 'string') throw new Error('Whoops! Output must be a string');
        if (!(input instanceof Array)) input = [input];
        input.forEach(string => {
            let tokens = this.tokenize(string)
            if (this._model.vocabulary !== false) tokens = this.vectorize(tokens);
            if (typeof this._model.data[output] === 'undefined') this._model.data[output] = {};
            Object.keys(tokens).forEach(index => {
                let occurrences = tokens[index];
                if (typeof this._model.data[output][index] === 'undefined') this._model.data[output][index] = 0;
                this._model.data[output][index] += occurrences;
            });
        });
        return this;
    }

    /**
     * Return an array of one or more Predictions from an input.
     *
     * @param {string} input - Text to make a prediction from
     * @param {int} [maxMatches=1] Maximum number of predictions to return
     * @param {float} [minimumConfidence=0.2] Minimum confidence required to include a prediction
     * @return {Array}
     */
    predict(input, maxMatches = 1, minimumConfidence = 0.2) {
        if (typeof input !== 'string') throw new Error('Whooops! input must be a string.');
        if (typeof minimumConfidence !== 'number') throw new Error('Whoops! minimumConfidence must be a number.');
        if (minimumConfidence < 0) throw new Error('Whoops! minimumConfidence can not be lower than 0.');
        if (minimumConfidence > 1) throw new Error('Whoops! minimumConfidence can not be higher than 1.');
        let tokens = this.tokenize(input);
        if (this.vocabulary !== false) tokens = this.vectorize(tokens);
        let predictions = []
        Object.keys(this._model.data).forEach(output => {
            let entry = this._model.data[output]
            let confidence = this.cosineSimilarity(tokens, entry)
            if (confidence >= minimumConfidence) {
                predictions.push(new Prediction({
                    output,
                    confidence
                }));
            }
        });
        predictions.sort((a, b) => {
            if (a.confidence === b.confidence) return 0;
            return a.confidence > b.confidence ? -1 : 1
        });
        return predictions.slice(0, Math.min(predictions.length, maxMatches));
    }

    /**
     * Split a string into an array of lowercase words, with all non-letter characters removed.
     * 
     * @param {string} input
     * @return {Array}
     */
    splitWords(input) {
        if (typeof input !== 'string') throw new Error('Whoops! Input must be a string');
        input = input.replace(/'|´|’|-/g, '');
        input = XRegExp.replace(input.toLocaleLowerCase(), XRegExp('\\P{L}+', 'g'), ' ').trim();
        return input.split(' ');
    }

    /**
     * Create an object of unique tokens (ngrams) as keys, and their
     * respective occurrences as values based on an input string, or an array.
     *
     * @param {(string|string[])} input
     * @return {Object}
     */
    tokenize(input) {
        let words = typeof input === 'string' ? this.splitWords(input) : input
        if (!(words instanceof Array)) throw new Error('Whoops! Input must be either a string or array.');
        if (this._model.nGramMax < this._model.nGramMin) throw new Error('Whoops! Invalid nGramMin/nGramMax combination in model config.');
        let tokens = {};
        words.forEach((word, index) => {
            let sequence = ''
            words.slice(index).forEach(nextWord => {
                sequence += sequence ? (' ' + nextWord) : nextWord
                let tokenCount = sequence.split(' ').length
                if (tokenCount < this._model.nGramMin || tokenCount > this._model.nGramMax) return;
                if (typeof tokens[sequence] === 'undefined') tokens[sequence] = 0;
                ++tokens[sequence]
            })
        })
        return tokens;
    }

    /**
     * Convert a tokenized object into a new object with all keys (terms)
     * translated to their index in the vocabulary (adding all terms to
     * the vocabulary that do not already exist).
     *
     * @param {Object} tokens
     * @return {Object}
     */
    vectorize(tokens) {
        if (!(tokens instanceof Object) || tokens.constructor !== Object) throw new Error('Whoops! Tokens must be an object literal.');
        if (this._model.vocabulary === false) throw new Error('Whoops! Cannot vectorize tokens when vocabulary is false.');
        let vector = {};
        Object.keys(tokens).forEach(token => {
            let vocabularyIndex = this._model.vocabulary.indexOf(token);
            if (vocabularyIndex === -1) {
                this._model.vocabulary.add(token)
                vocabularyIndex = this._model.vocabulary.size - 1
            }
            vector[vocabularyIndex] = tokens[token];
        });
        return vector;
    }

    /**
     * Return the cosine similarity between two vectors.
     *
     * @param {Object} v1
     * @param {Object} v2
     * @return {float}
     */
    cosineSimilarity(v1, v2) {
        if (!(v1 instanceof Object) || v1.constructor !== Object) throw new Error('Whoops! v1 must be an object literal.');
        if (!(v2 instanceof Object) || v2.constructor !== Object) throw new Error('Whoops! v2 must be an object literal.');
        let prod = 0.0;
        let v1Norm = 0.0;
        Object.keys(v1).forEach(i => {
            let xi = v1[i];
            if (typeof v2[i] !== 'undefined') {
                prod += xi * v2[i];
            }
            v1Norm += xi * xi;
        });
        v1Norm = Math.sqrt(v1Norm);
        if (v1Norm === 0) return 0;
        let v2Norm = 0.0;
        Object.keys(v2).forEach(i => {
            let xi = v2[i]
            v2Norm += xi * xi
        });
        v2Norm = Math.sqrt(v2Norm)
        if (v2Norm === 0) return 0;
        return prod / (v1Norm * v2Norm);
    }
}

export default Classifier;