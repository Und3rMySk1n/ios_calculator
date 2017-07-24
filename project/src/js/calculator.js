'use strict';

class Calculator {
    constructor(container) {
        this.container = document.getElementById(container);
        this.result = 0;
        this.currentValue = 0;
        this.currentOperand = null;
        this.isComma = false;
        this.newNumber = false;

        this.InitResultScreen();
        this.InitButtonsPanel();
        this.InitOperandsPanel();
    }

    InitResultScreen() {
        this.resultScreen = document.createElement('div');
        this.resultScreen.className = 'b-calculator__result-screen';
        this.resultScreen.innerText = this.currentValue;
        this.container.appendChild(this.resultScreen);
    }

    InitButtonsPanel() {
        this.buttonsPanel = document.createElement('div');
        this.buttonsPanel.className = 'b-calculator__digits-panel b-panel b-panel_digits-panel';
        this.container.appendChild(this.buttonsPanel);

        this.InitClearButton();
        this.InitPlusMinisButton();
        this.InitPercentButton();
        this.InitNumbers([7, 8, 9, 4, 5, 6, 1, 2, 3, 0]);
        this.InitCommaButton();
    }

    InitClearButton() {
        this.clearButton = document.createElement('div');
        this.clearButton.className = 'b-panel__button';
        this.clearButton.innerText = 'C';
        this.buttonsPanel.appendChild(this.clearButton);

        this.clearButton.addEventListener('click', () => {
            this.result = 0;
            this.currentValue = 0;
            this.resultScreen.innerText = this.result;
        })
    }

    InitPlusMinisButton() {
        this.plusMinusButton = document.createElement('div');
        this.plusMinusButton.className = 'b-panel__button';
        this.plusMinusButton.innerHTML = '&plusmn;';
        this.buttonsPanel.appendChild(this.plusMinusButton);

        this.plusMinusButton.addEventListener('click', () => {
            if (this.currentValue != 0)
            {
                this.currentValue *= -1;
                this.resultScreen.innerText = this.currentValue;
            }
        })
    }

    InitPercentButton() {
        this.percentButton = document.createElement('div');
        this.percentButton.className = 'b-panel__button';
        this.percentButton.innerHTML = '%';
        this.buttonsPanel.appendChild(this.percentButton);
    }

    InitNumbers(numbers) {
        numbers.forEach((item, i, arr) => {
            let number = document.createElement('div');
            number.className = 'b-panel__button';
            if (item == 0) {
                number.className = 'b-panel__button b-panel__button_double';
            }
            number.innerHTML = item;
            this.buttonsPanel.appendChild(number);

            number.addEventListener('click', () => {
                if (this.newNumber == true)
                {
                    this.newNumber = false;
                    this.currentValue = 0;
                    this.resultScreen.innerText = this.currentValue;

                    if (this.currentOperand == null)
                    {
                        this.result = 0;
                    }
                }

                if (!this.isComma)
                {
                    this.currentValue = this.currentValue * 10 + parseInt(number.innerHTML);
                    this.resultScreen.innerText = this.currentValue;
                }
            })
        })
    }

    InitCommaButton() {
        this.commaButton = document.createElement('div');
        this.commaButton.className = 'b-panel__button';
        this.commaButton.innerHTML = ',';
        this.buttonsPanel.appendChild(this.commaButton);

        this.commaButton.addEventListener('click', () => {
            if (!this.isComma)
            {
                this.isComma = true;
                this.resultScreen.innerText = this.resultScreen.innerText + ',';
            }
        })
    }

    InitOperandsPanel() {
        this.operandsPanel = document.createElement('div');
        this.operandsPanel.className = 'b-calculator__operands-panel b-panel b-panel_operands-panel';
        this.container.appendChild(this.operandsPanel);

        this.InitDivideButton();
        this.InitMultiplyButton();
        this.InitMinusButton();
        this.InitPlusButton();
        this.InitEqualsButton();
    }

    InitDivideButton() {
        this.divideButton = document.createElement('div');
        this.divideButton.className = 'b-panel__button b-panel__button_operand';
        this.divideButton.innerHTML = '&divide;';
        this.operandsPanel.appendChild(this.divideButton);

        this.divideButton.addEventListener('click', () => {
            this.newNumber = true;
            this.PerformOperation();
            this.currentOperand = '/';
            this.currentValue = this.result;
            this.resultScreen.innerText = this.result;
        })
    }

    InitMultiplyButton() {
        this.multiplyButton = document.createElement('div');
        this.multiplyButton.className = 'b-panel__button b-panel__button_operand';
        this.multiplyButton.innerHTML = '&times;';
        this.operandsPanel.appendChild(this.multiplyButton);

        this.multiplyButton.addEventListener('click', () => {
            this.newNumber = true;
            this.PerformOperation();
            this.currentOperand = '*';
            this.currentValue = this.result;
            this.resultScreen.innerText = this.result;
        })
    }

    InitMinusButton() {
        this.minusButton = document.createElement('div');
        this.minusButton.className = 'b-panel__button b-panel__button_operand';
        this.minusButton.innerHTML = '&ndash;';
        this.operandsPanel.appendChild(this.minusButton);

        this.minusButton.addEventListener('click', () => {
            this.newNumber = true;
            this.PerformOperation();
            this.currentOperand = '-';
            this.currentValue = this.result;
            this.resultScreen.innerText = this.result;
        })
    }

    InitPlusButton() {
        this.plusButton = document.createElement('div');
        this.plusButton.className = 'b-panel__button b-panel__button_operand';
        this.plusButton.innerHTML = '+';
        this.operandsPanel.appendChild(this.plusButton);

        this.plusButton.addEventListener('click', () => {
            this.newNumber = true;
            this.PerformOperation();
            this.currentOperand = '+';
            this.currentValue = this.result;
            this.resultScreen.innerText = this.result;
        })
    }

    InitEqualsButton() {
        this.equalsButton = document.createElement('div');
        this.equalsButton.className = 'b-panel__button b-panel__button_operand';
        this.equalsButton.innerHTML = '=';
        this.operandsPanel.appendChild(this.equalsButton);

        this.equalsButton.addEventListener('click', () => {
            this.newNumber = true;
            this.PerformOperation();
            this.resultScreen.innerText = this.result;

            this.currentOperand = null;
            this.currentValue = this.result;
        })
    }

    PerformOperation() {
        switch (this.currentOperand)
        {
            case '/':
                this.result = this.result / this.currentValue;
                break;
            case '*':
                this.result = this.result * this.currentValue;
                break;
            case '-':
                this.result = this.result - this.currentValue;
                break;
            case '+':
                this.result = this.result + this.currentValue;
                break;
            default:
                this.result = this.currentValue;
                break;
        }
    }
}

let calculator = new Calculator('calculator');