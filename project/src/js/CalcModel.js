goog.module('CalcModel');

class CalcModel {
    constructor() {
        /** @private {number} */
        this._result = 0;

        /** @private {number} */
        this._currentValue = 0;

        /** @private {number} */
        this._resultNumbersAfterComma = 0;

        /** @private {number} */
        this._currentNumbersAfterComma = 0;

        /** @private {?string} */
        this._currentOperand = null;

        /** @private {boolean} */
        this._isComma = false;

        /** @private {boolean} */
        this._newNumber = false;
    }

    /**
     *
     * @returns {string}
     */
    getResult() {
        return this._formatNumber(this._result);
    }

    /**
     *
     * @returns {string}
     */
    getCurrentValue() {
        return this._formatNumber(this._currentValue);
    }

    /**
     *
     * @param number {number}
     */
    onNumberButtonClicked(number) {
        if (this._newNumber == true) {
            this._newNumber = false;
            this._currentValue = 0;

            if (!this._currentOperand) {
                this._result = 0;
            }
        }

        if (!this._isComma) {
            this._currentValue = this._currentValue * 10 + parseInt(number, 10);
        } else {
            this._currentNumbersAfterComma++;
            this._currentValue = this._currentValue + (parseInt(number, 10) / Math.pow(10,this._currentNumbersAfterComma));
        }
    }

    onCommaButtonClicked() {
        if (!this._isComma) {
            this._currentNumbersAfterComma = 0;
            this._isComma = true;
        }
    }

    onClearButtonClicked() {
        this._result = 0;
        this._currentValue = 0;
        this._resultNumbersAfterComma = 0;
        this._currentNumbersAfterComma = 0;
        this._currentOperand = null;
        this._isComma = false;
        this._newNumber = false;
    }

    onPlusMinusButtonClicked() {
        if (this._currentValue != 0) {
            this._currentValue *= -1;
        }
    }

    onPercentButtonClicked() {
        this._currentValue = this._result * (this._currentValue / 100);
    }

    onDivideButtonClicked() {
        this._resetNumber();
        this._performOperation();
        this._currentOperand = '/';
        this._currentValue = this._result;
    }

    onMultiplyButtonClicked() {
        this._resetNumber();
        this._performOperation();
        this._currentOperand = '*';
        this._currentValue = this._result;
    }

    onPlusButtonClicked() {
        this._resetNumber();
        this._performOperation();
        this._currentOperand = '+';
        this._currentValue = this._result;
    }

    onMinusButtonClicked() {
        this._resetNumber();
        this._performOperation();
        this._currentOperand = '-';
        this._currentValue = this._result;
    }

    onEqualsButtonClicked() {
        this._resetNumber();
        this._performOperation();

        this._currentOperand = null;
        this._currentValue = this._result;
    }

    /**
     *
     * @param number {number}
     * @returns {string}
     * @private
     */
    _formatNumber(number){
        let result = number;
        if (this._currentNumbersAfterComma == 0 && this._isComma) {
            result += '.';
        }

        return result.toString();
    }

    /** @private */
    _performOperation() {
        switch (this._currentOperand)
        {
            case '/':
                this._result = this._result / this._currentValue;
                break;
            case '*':
                this._result = this._result * this._currentValue;
                break;
            case '-':
                this._result = this._result - this._currentValue;
                break;
            case '+':
                this._result = this._result + this._currentValue;
                break;
            default:
                this._result = this._currentValue;
                break;
        }
    }

    /** @private */
    _resetNumber() {
        this._newNumber = true;
        this._isComma = false;
    }
}

exports = CalcModel;