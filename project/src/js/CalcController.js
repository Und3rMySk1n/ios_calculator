goog.module('CalcController');

class CalcController {
    /**
     *
     * @param view {CalcView}
     * @param model {CalcModel}
     */
    constructor(view, model) {
        /** @private {HTMLDocument} */
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

        this._initUndoRedoHotkeys();
    }

    /** @private */
    _initCalcNumbersBehavior() {
        this._document.addEventListener('onNumberButtonClicked', (event) => {
            this._model.onNumberButtonClicked(event.detail.number);
            this._view.ShowResult(this._model.getCurrentValue());
        });
    }

    /** @private */
    _initCalcCommaBehavior() {
        this._document.addEventListener('onCommaButtonClicked', () => {
            this._model.onCommaButtonClicked();
            this._view.ShowResult(this._model.getCurrentValue());
        });
    }

    /** @private */
    _initCalcClearBehavior() {
        this._document.addEventListener('onClearButtonClicked', () => {
            this._model.onClearButtonClicked();
            this._view.ShowResult(this._model.getCurrentValue());
        });
    }

    /** @private */
    _initCalcPlusMinusBehavior() {
        this._document.addEventListener('onPlusMinusButtonClicked', () => {
            this._model.onPlusMinusButtonClicked();
            this._view.ShowResult(this._model.getCurrentValue());
        });
    }

    /** @private */
    _initCalcPercentBehavior() {
        this._document.addEventListener('onPercentButtonClicked', () => {
            this._model.onPercentButtonClicked();
            this._view.ShowResult(this._model.getCurrentValue());
        });
    }

    /** @private */
    _initCalcDivideBehavior() {
        this._document.addEventListener('onDivideButtonClicked', () => {
            this._model.onDivideButtonClicked();
            this._view.ShowResult(this._model.getResult());
        });
    }

    /** @private */
    _initCalcMultiplyBehavior() {
        this._document.addEventListener('onMultiplyButtonClicked', () => {
            this._model.onMultiplyButtonClicked();
            this._view.ShowResult(this._model.getResult());
        });
    }

    /** @private */
    _initCalcPlusBehavior() {
        this._document.addEventListener('onPlusButtonClicked', () => {
            this._model.onPlusButtonClicked();
            this._view.ShowResult(this._model.getResult());
        });
    }

    /** @private */
    _initCalcMinusBehavior() {
        this._document.addEventListener('onMinusButtonClicked', () => {
            this._model.onMinusButtonClicked();
            this._view.ShowResult(this._model.getResult());
        });
    }

    /** @private */
    _initCalcEqualsBehavior() {
        this._document.addEventListener('onEqualsButtonClicked', () => {
            this._model.onEqualsButtonClicked();
            this._view.ShowResult(this._model.getResult());
        });
    }

    /** @private */
    _initUndoRedoHotkeys() {
        this._document.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.keyCode == 90) {
                if (event.shiftKey) {
                    this._model.redoLastCommand();
                    this._view.ShowResult(this._model.getCurrentValue());
                } else {
                    this._model.undoLastCommand();
                    this._view.ShowResult(this._model.getCurrentValue());
                }
            }
        })
    }
}

exports = CalcController;