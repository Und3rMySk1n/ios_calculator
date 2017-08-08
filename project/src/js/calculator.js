'use strict';

class CalcView {
    constructor(container) {
        this._maxDigits = 6;

        this._document = document;
        this._container = this._document.getElementById(container);
        this._resultScreen = null;
        this._buttonsPanel = null;
        this._operandsPanel = null;

        this._clearButton = null;
        this._plusMinusButton = null;
        this._percentButton = null;
        this._commaButton = null;
        this._divideButton = null;
        this._multiplyButton = null;
        this._minusButton = null;
        this._plusButton = null;
        this._equalsButton = null;
        this._numberButtons = [];

        this._initResultScreen();
        this._initButtonsPanel();
        this._initOperandsPanel();
    }

    ShowResult(resultValue) {
        let result = resultValue;
        let resultParts = resultValue.split('.');
        if (resultParts.length == 2)
        {
            resultParts[1] = resultParts[1].substring(0, this._maxDigits - resultParts[0].length);
            result = resultParts[0] + '.' + resultParts[1];
        }

        this._resultScreen.innerHTML = result;
    }

    /**
     *
     * @private
     */
    _initResultScreen() {
        this._resultScreen = this._document.createElement('div');
        this._resultScreen.className = 'b-calculator__result-screen';
        this._resultScreen.innerText = 0;
        this._container.appendChild(this._resultScreen);
    }

    /**
     *
     * @private
     */
    _initButtonsPanel() {
        this._buttonsPanel = this._document.createElement('div');
        this._buttonsPanel.className = 'b-calculator__digits-panel b-panel b-panel_digits-panel';
        this._container.appendChild(this._buttonsPanel);

        this._initClearButton();
        this._initPlusMinusButton();
        this._initPercentButton();
        this._initNumbers([7, 8, 9, 4, 5, 6, 1, 2, 3, 0]);
        this._initCommaButton();
    }

    /**
     *
     * @private
     */
    _initOperandsPanel() {
        this._operandsPanel = this._document.createElement('div');
        this._operandsPanel.className = 'b-calculator__operands-panel b-panel b-panel_operands-panel';
        this._container.appendChild(this._operandsPanel);

        this._initDivideButton();
        this._initMultiplyButton();
        this._initMinusButton();
        this._initPlusButton();
        this._initEqualsButton();
    }

    /**
     *
     * @private
     */
    _initClearButton() {
        this._clearButton = this._document.createElement('div');
        this._clearButton.className = 'b-panel__button';
        this._clearButton.innerText = 'C';
        this._buttonsPanel.appendChild(this._clearButton);

        this._clearButton.addEventListener('click', () => {
            var clearButtonEvent = new Event('onClearButtonClicked', {bubbles: true});
            this._clearButton.dispatchEvent(clearButtonEvent);
        });
    }

    /**
     *
     * @private
     */
    _initPlusMinusButton() {
        this._plusMinusButton = this._document.createElement('div');
        this._plusMinusButton.className = 'b-panel__button';
        this._plusMinusButton.innerHTML = '&plusmn;';
        this._buttonsPanel.appendChild(this._plusMinusButton);

        this._plusMinusButton.addEventListener('click', () => {
            var plusMinusButtonEvent = new Event('onPlusMinusButtonClicked', {bubbles: true});
            this._plusMinusButton.dispatchEvent(plusMinusButtonEvent);
        });
    }

    /**
     *
     * @private
     */
    _initPercentButton() {
        this._percentButton = this._document.createElement('div');
        this._percentButton.className = 'b-panel__button';
        this._percentButton.innerHTML = '%';
        this._buttonsPanel.appendChild(this._percentButton);

        this._percentButton.addEventListener('click', () => {
            var percentButtonEvent = new Event('onPercentButtonClicked', {bubbles: true});
            this._percentButton.dispatchEvent(percentButtonEvent);
        });
    }

    /**
     *
     * @param numbers
     * @private
     */
    _initNumbers(numbers) {
        numbers.forEach((item, i, arr) => {
            let number = this._document.createElement('div');
            number.className = 'b-panel__button';
            if (item == 0) {
                number.className = 'b-panel__button b-panel__button_double';
            }
            number.innerHTML = item;
            this._buttonsPanel.appendChild(number);
            this._numberButtons.push(number);

            number.addEventListener('click', () => {
                var numberButtonEvent = new CustomEvent('onNumberButtonClicked', {
                        bubbles: true,
                        detail: {
                            number: item
                        }
                    });
                number.dispatchEvent(numberButtonEvent);
            });
        });
    }

    /**
     *
     * @private
     */
    _initCommaButton() {
        this._commaButton = this._document.createElement('div');
        this._commaButton.className = 'b-panel__button';
        this._commaButton.innerHTML = ',';
        this._buttonsPanel.appendChild(this._commaButton);

        this._commaButton.addEventListener('click', () => {
            var commaButtonEvent = new Event('onCommaButtonClicked', {bubbles: true});
            this._commaButton.dispatchEvent(commaButtonEvent);
        });
    }

    /**
     *
     * @private
     */
    _initDivideButton() {
        this._divideButton = this._document.createElement('div');
        this._divideButton.className = 'b-panel__button b-panel__button_operand';
        this._divideButton.innerHTML = '&divide;';
        this._operandsPanel.appendChild(this._divideButton);

        this._divideButton.addEventListener('click', () => {
            var divideButtonEvent = new Event('onDivideButtonClicked', {bubbles: true});
            this._divideButton.dispatchEvent(divideButtonEvent);
        });
    }

    /**
     *
     * @private
     */
    _initMultiplyButton() {
        this._multiplyButton = this._document.createElement('div');
        this._multiplyButton.className = 'b-panel__button b-panel__button_operand';
        this._multiplyButton.innerHTML = '&times;';
        this._operandsPanel.appendChild(this._multiplyButton);

        this._multiplyButton.addEventListener('click', () => {
            var multiplyButtonEvent = new Event('onMultiplyButtonClicked', {bubbles: true});
            this._multiplyButton.dispatchEvent(multiplyButtonEvent);
        });
    }

    /**
     *
     * @private
     */
    _initMinusButton() {
        this._minusButton = this._document.createElement('div');
        this._minusButton.className = 'b-panel__button b-panel__button_operand';
        this._minusButton.innerHTML = '&ndash;';
        this._operandsPanel.appendChild(this._minusButton);

        this._minusButton.addEventListener('click', () => {
            var minusButtonEvent = new Event('onMinusButtonClicked', {bubbles: true});
            this._minusButton.dispatchEvent(minusButtonEvent);
        });
    }

    /**
     *
     * @private
     */
    _initPlusButton() {
        this._plusButton = this._document.createElement('div');
        this._plusButton.className = 'b-panel__button b-panel__button_operand';
        this._plusButton.innerHTML = '+';
        this._operandsPanel.appendChild(this._plusButton);

        this._plusButton.addEventListener('click', () => {
            var plusButtonEvent = new Event('onPlusButtonClicked', {bubbles: true});
            this._plusButton.dispatchEvent(plusButtonEvent);
        });
    }

    /**
     *
     * @private
     */
    _initEqualsButton() {
        this._equalsButton = this._document.createElement('div');
        this._equalsButton.className = 'b-panel__button b-panel__button_operand';
        this._equalsButton.innerHTML = '=';
        this._operandsPanel.appendChild(this._equalsButton);

        this._equalsButton.addEventListener('click', () => {
            var equalsButtonEvent = new Event('onEqualsButtonClicked', {bubbles: true});
            this._equalsButton.dispatchEvent(equalsButtonEvent);
        });
    }
}

class CalcModel {
    constructor() {
        this._result = 0;
        this._currentValue = 0;
        this._resultNumbersAfterComma = 0;
        this._currentNumbersAfterComma = 0;
        this._currentOperand = null;
        this._isComma = false;
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
     * @param item
     */
    onNumberButtonClicked(item) {
        if (this._newNumber == true) {
            this._newNumber = false;
            this._currentValue = 0;

            if (!this._currentOperand) {
                this._result = 0;
            }
        }

        if (!this._isComma) {
            this._currentValue = this._currentValue * 10 + parseInt(item, 10);
        } else {
            this._currentNumbersAfterComma++;
            this._currentValue = this._currentValue + (parseInt(item, 10) / Math.pow(10,this._currentNumbersAfterComma));
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
     * @param number
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

class CalcController {
    constructor(view, model) {
        this._document = document;
        this._view = view;
        this._model = model;

        this._initCalcNumbersBehavior();
        this._initCalcCommaBehavior();
        this._initCalcClearBehavior();
        this._initCalcPlusMinusBehavior();
        this._initCalcPercentBehavior();
        this._initCalcDivideBehavior();
        this._initCalcMultiplyBehavior();
        this._initCalcPlusBehavior();
        this._initCalcMinusBehavior();
        this._initCalcEqualsBehavior();
    }

    _initCalcNumbersBehavior() {
        this._document.addEventListener('onNumberButtonClicked', (event) => {
            this._model.onNumberButtonClicked(event.detail.number);
            this._view.ShowResult(this._model.getCurrentValue());
        });
    }

    _initCalcCommaBehavior() {
        this._document.addEventListener('onCommaButtonClicked', () => {
            this._model.onCommaButtonClicked();
            this._view.ShowResult(this._model.getCurrentValue());
        });
    }

    _initCalcClearBehavior() {
        this._document.addEventListener('onClearButtonClicked', () => {
            this._model.onClearButtonClicked();
            this._view.ShowResult(this._model.getCurrentValue());
        });
    }

    _initCalcPlusMinusBehavior() {
        this._document.addEventListener('onPlusMinusButtonClicked', () => {
            this._model.onPlusMinusButtonClicked();
            this._view.ShowResult(this._model.getCurrentValue());
        });
    }

    _initCalcPercentBehavior() {
        this._document.addEventListener('onPercentButtonClicked', () => {
            this._model.onPercentButtonClicked();
            this._view.ShowResult(this._model.getCurrentValue());
        });
    }

    _initCalcDivideBehavior() {
        this._document.addEventListener('onDivideButtonClicked', () => {
            this._model.onDivideButtonClicked();
            this._view.ShowResult(this._model.getResult());
        });
    }

    _initCalcMultiplyBehavior() {
        this._document.addEventListener('onMultiplyButtonClicked', () => {
            this._model.onMultiplyButtonClicked();
            this._view.ShowResult(this._model.getResult());
        });
    }

    _initCalcPlusBehavior() {
        this._document.addEventListener('onPlusButtonClicked', () => {
            this._model.onPlusButtonClicked();
            this._view.ShowResult(this._model.getResult());
        });
    }

    _initCalcMinusBehavior() {
        this._document.addEventListener('onMinusButtonClicked', () => {
            this._model.onMinusButtonClicked();
            this._view.ShowResult(this._model.getResult());
        });
    }

    _initCalcEqualsBehavior() {
        this._document.addEventListener('onEqualsButtonClicked', () => {
            this._model.onEqualsButtonClicked();
            this._view.ShowResult(this._model.getResult());
        });
    }
}

const view = new CalcView('calculator');
const model = new CalcModel();
const controller = new CalcController(view, model);