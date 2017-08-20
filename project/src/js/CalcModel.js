goog.module('CalcModel');
const CalcCommand = goog.require('CalcCommand');

class CalcModel {
    constructor() {
        /** @private {number} */
        this._result = 0;

        /** @private {number} */
        this._currentValue = 0;

        /** @private {number} */
        this._currentNumbersAfterComma = 0;

        /** @private {?string} */
        this._currentOperand = null;

        /** @private {boolean} */
        this._isComma = false;

        /** @private {boolean} */
        this._newNumber = false;

        /** @private {Array} */
        this._commands = [];

        /** @private {number} */
        this._currentCommand = 0;
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

    undoLastCommand() {
        if (this._currentCommand != 0)
        {
            let lastCommand = this._commands[this._currentCommand - 1];
            lastCommand.undo(this, lastCommand.value);
            this._currentCommand--;
        }
    }

    redoLastCommand() {
        if (this._currentCommand != this._commands.length)
        {
            let lastCommand = this._commands[this._currentCommand];
            lastCommand.execute(this, lastCommand.value);
            this._currentCommand++;
        }
    }

    /** @private */
    _clearCommandsList() {
        this._currentCommand = 0;
        this._commands = [];
    }

    /**
     *
     * @param number {number}
     */
    onNumberButtonClicked(number) {
        let numberCommand = new CalcCommand(this._enterNumber, this._removeNumber, number);
        numberCommand.execute(this, number);
        this._commands.push(numberCommand);
        this._currentCommand++;
    }

    /**
     *
     * @param thisPtr {Object}
     * @param number {number}
     * @private
     */
    _enterNumber(thisPtr, number) {
        if (thisPtr._newNumber == true) {
            this._clearCommandsList();
            thisPtr._newNumber = false;
            thisPtr._currentValue = 0;

            if (!thisPtr._currentOperand) {
                thisPtr._result = 0;
            }
        }
        if (!thisPtr._isComma) {
            thisPtr._currentValue = thisPtr._currentValue * 10 + parseInt(number, 10);
        } else {
            thisPtr._currentNumbersAfterComma++;
            thisPtr._currentValue = thisPtr._currentValue + (parseInt(number, 10) / Math.pow(10,thisPtr._currentNumbersAfterComma));
        }
    }

    /**
     *
     * @param thisPtr
     * @private
     */
    _removeNumber(thisPtr) {
        if (!thisPtr._isComma) {
            thisPtr._currentValue = Math.floor(thisPtr._currentValue / 10);
        } else {
            if (thisPtr._currentNumbersAfterComma == 0) {
                thisPtr._isComma = false;
            }
            else {
                thisPtr._currentValue = parseFloat(thisPtr._currentValue.toString().substring(0, thisPtr._currentValue.toString().length - 1));
                thisPtr._currentNumbersAfterComma--;
            }
        }
    }

    /**
     *
     * @param thisPtr
     * @private
     */
    _addComma(thisPtr) {
        if (!thisPtr._isComma) {
            thisPtr._currentNumbersAfterComma = 0;
            thisPtr._isComma = true;
        }
    }

    /**
     *
     * @param thisPtr
     * @private
     */
    _removeComma(thisPtr) {
        if (thisPtr._isComma) {
            thisPtr._currentNumbersAfterComma = 0;
            thisPtr._isComma = false;
        }
    }

    onCommaButtonClicked() {
        let commaCommand = new CalcCommand(this._addComma, this._removeComma, null);
        commaCommand.execute(this);
        this._commands.push(commaCommand);
        this._currentCommand++;
    }

    onClearButtonClicked() {
        this._result = 0;
        this._currentValue = 0;
        this._currentNumbersAfterComma = 0;
        this._currentOperand = null;
        this._isComma = false;
        this._newNumber = false;

        this._clearCommandsList();
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