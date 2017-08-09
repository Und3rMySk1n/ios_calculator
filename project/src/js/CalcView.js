goog.module('CalcView');

class CalcView {
    constructor(container) {
        /** @private {number} */
        this._maxDigits = 6;

        /** @private {HTMLDocument} */
        this._document = document;

        /** @private {Element} */
        this._container = this._document.getElementById(container);

        /** @private {Element} */
        this._resultScreen = null;

        /** @private {Element} */
        this._buttonsPanel = null;

        /** @private {Element} */
        this._operandsPanel = null;

        /** @private {Element} */
        this._clearButton = null;

        /** @private {Element} */
        this._plusMinusButton = null;

        /** @private {Element} */
        this._percentButton = null;

        /** @private {Element} */
        this._commaButton = null;

        /** @private {Element} */
        this._divideButton = null;

        /** @private {Element} */
        this._multiplyButton = null;

        /** @private {Element} */
        this._minusButton = null;

        /** @private {Element} */
        this._plusButton = null;

        /** @private {Element} */
        this._equalsButton = null;

        /** @private {Array.<Element>} */
        this._numberButtons = [];

        this._initResultScreen();
        this._initButtonsPanel();
        this._initOperandsPanel();
    }

    /**
     *
     * @param resultValue {string}
     */
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

    /** @private */
    _initResultScreen() {
        this._resultScreen = this._document.createElement('div');
        this._resultScreen.className = 'b-calculator__result-screen';
        this._resultScreen.innerText = 0;
        this._container.appendChild(this._resultScreen);
    }

    /** @private */
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

    /** @private */
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

    /** @private */
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

    /** @private */
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

    /** @private */
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
     * @param numbers {Array.<Element>}
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

    /** @private */
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

    /** @private */
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

    /** @private */
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

    /** @private */
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

    /** @private */
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

    /** @private */
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

exports = CalcView;