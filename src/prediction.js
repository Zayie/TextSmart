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
        this.output = prediction.output;
        this.confidence = prediction.confidence;
    }

    /**
     * Label of the prediction
     *
     * @type {string}
     */
    getOutput() {
        return this.output;
    }

    setOutput(variable) {
        if (typeof variable !== 'string') {
            throw new Error('Whoops! Output must be a string.')
        } else {
            this.output = variable;
        }
    }

    /**
     * Confidence of the prediction
     *
     * @type {number}
     */
    getConfidence() {
        return this.confidence;
    }

    setConfidence(variable) {
        if (typeof variable !== 'number') { throw new Error('Whoops! Confidence must be a number.') };
        this.confidence = variable;
    }
}

export default Prediction;
