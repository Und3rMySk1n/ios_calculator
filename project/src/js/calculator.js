'use strict';

class CalcView {
    constructor(container) {
        this._document = document;
        this._container = this._document.getElementById(container);
        this._resultScreen = null;
        this._buttonsPanel = null;
        this._operandsPanel = null;

        this.clearButton = null;
        this.plusMinusButton = null;
        this.percentButton = null;
        this.commaButton = null;
        this.divideButton = null;
        this.multiplyButton = null;
        this.minusButton = null;
        this.plusButton = null;
        this.equalsButton = null;
        this.numberButtons = [];

        this._initResultScreen();
        this._initButtonsPanel();
        this._initOperandsPanel();
    }

    ShowResult(resultValue) {
        this._resultScreen.innerHTML = resultValue;
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
        this._initPlusMinisButton();
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
        this.clearButton = this._document.createElement('div');
        this.clearButton.className = 'b-panel__button';
        this.clearButton.innerText = 'C';
        this._buttonsPanel.appendChild(this.clearButton);

        this.clearButton.addEventListener('click', () => {
            var clearButtonEvent = new Event('onClearButtonClicked', {bubbles: true});
            this.divideButton.dispatchEvent(clearButtonEvent);
        });
    }

    /**
     *
     * @private
     */
    _initPlusMinisButton() {
        this.plusMinusButton = this._document.createElement('div');
        this.plusMinusButton.className = 'b-panel__button';
        this.plusMinusButton.innerHTML = '&plusmn;';
        this._buttonsPanel.appendChild(this.plusMinusButton);
    }

    /**
     *
     * @private
     */
    _initPercentButton() {
        this.percentButton = this._document.createElement('div');
        this.percentButton.className = 'b-panel__button';
        this.percentButton.innerHTML = '%';
        this._buttonsPanel.appendChild(this.percentButton);
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
            this.numberButtons.push(number);

            number.addEventListener('click', () => {
                var numberButtonEvent = new CustomEvent('onNumberButtonClicked', {
                        bubbles: true,
                        detail: {
                            number: item
                        }
                    });
                this.divideButton.dispatchEvent(numberButtonEvent);
            });
        });
    }

    /**
     *
     * @private
     */
    _initCommaButton() {
        this.commaButton = this._document.createElement('div');
        this.commaButton.className = 'b-panel__button';
        this.commaButton.innerHTML = ',';
        this._buttonsPanel.appendChild(this.commaButton);

        this.commaButton.addEventListener('click', () => {
            var commaButtonEvent = new Event('onCommaButtonClicked', {bubbles: true});
            this.divideButton.dispatchEvent(commaButtonEvent);
        });
    }

    /**
     *
     * @private
     */
    _initDivideButton() {
        this.divideButton = this._document.createElement('div');
        this.divideButton.className = 'b-panel__button b-panel__button_operand';
        this.divideButton.innerHTML = '&divide;';
        this._operandsPanel.appendChild(this.divideButton);

        this.divideButton.addEventListener('click', () => {
            var divideButtonEvent = new Event('onDivideButtonClicked', {bubbles: true});
            this.divideButton.dispatchEvent(divideButtonEvent);
        });
    }

    /**
     *
     * @private
     */
    _initMultiplyButton() {
        this.multiplyButton = this._document.createElement('div');
        this.multiplyButton.className = 'b-panel__button b-panel__button_operand';
        this.multiplyButton.innerHTML = '&times;';
        this._operandsPanel.appendChild(this.multiplyButton);
    }

    /**
     *
     * @private
     */
    _initMinusButton() {
        this.minusButton = this._document.createElement('div');
        this.minusButton.className = 'b-panel__button b-panel__button_operand';
        this.minusButton.innerHTML = '&ndash;';
        this._operandsPanel.appendChild(this.minusButton);
    }

    /**
     *
     * @private
     */
    _initPlusButton() {
        this.plusButton = this._document.createElement('div');
        this.plusButton.className = 'b-panel__button b-panel__button_operand';
        this.plusButton.innerHTML = '+';
        this._operandsPanel.appendChild(this.plusButton);
    }

    /**
     *
     * @private
     */
    _initEqualsButton() {
        this.equalsButton = this._document.createElement('div');
        this.equalsButton.className = 'b-panel__button b-panel__button_operand';
        this.equalsButton.innerHTML = '=';
        this._operandsPanel.appendChild(this.equalsButton);
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
     * @returns {number|string}
     */
    getResult() {
        return this._formatNumber(this._result);
    }

    /**
     *
     * @returns {number|string}
     */
    getCurrentValue() {
        return this._formatNumber(this._currentValue);
    }

    /**
     *
     * @param item
     */
    onNumberButtonClicked(item) {
        if (this._newNumber == true)
        {
            this._newNumber = false;
            this._currentValue = 0;

            if (!this._currentOperand)
            {
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

    /**
     *
     * @param number
     * @returns {number|string}
     * @private
     */
    _formatNumber(number){
        let numbersAfterComma = Math.max(this._currentNumbersAfterComma, this._resultNumbersAfterComma);
        let result = (parseInt(number * Math.pow(10, numbersAfterComma), 10)) / Math.pow(10, numbersAfterComma);
        if (numbersAfterComma == 0 && this._isComma) {
            result += '.';
        }

        return result;
    }
}

class CalcController {
    constructor(view, model) {
        this._document = document;
        this._view = view;
        this._model = model;

        this._initCalcButtons();
    }

    _initCalcButtons() {
        this._document.addEventListener('onNumberButtonClicked', (event) => {
            this._model.onNumberButtonClicked(event.detail.number);
            this._view.ShowResult(this._model.getCurrentValue());
        });

        this._document.addEventListener('onCommaButtonClicked', () => {
            this._model.onCommaButtonClicked();
            this._view.ShowResult(this._model.getCurrentValue());
        });

        this._document.addEventListener('onClearButtonClicked', () => {
            this._model.onClearButtonClicked();
            this._view.ShowResult(this._model.getCurrentValue());
        });

        this._document.addEventListener('onDivideButtonClicked', () => {
        });
    }
}

const view = new CalcView('calculator');
const model = new CalcModel();
const controller = new CalcController(view, model);