/**
 * @param {Object} prediction
 * @constructor
 * @hideconstructor
 */
class Prediction {
    constructor(prediction = {}) {
        if (!(prediction instanceof Object) || prediction.constructor !== Object) throw new Error('Whoops! Prediction must be an object literal.');
        prediction = {
            output: '',
            confidence: 0,
            ...prediction
        };
        this._output = prediction.label;
        this._confidence = prediction.confidence;
    }

    /**
     * Label of the prediction
     *
     * @type {string}
     */
    get output() {
        return this._output;
    }

    set output(label) {
        if (typeof label !== 'string') throw new Error('Whoops! Output must be a string.');
        this._label = label;
    }

    /**
     * Confidence of the prediction
     *
     * @type {number}
     */
    get confidence() {
        return this._confidence;
    }

    set confidence(confidence) {
        if (typeof confidence !== 'number') throw new Error('Whoops! confidence must be a number');
        this._confidence = confidence
    }
}

export default Prediction;
