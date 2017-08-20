goog.module('CalcCommand');

class CalcCommand {
    /**
     *
     * @param execute {function}
     * @param undo {function}
     * @param value {?number}
     */
    constructor(execute, undo, value) {
        this.execute = execute;
        this.undo = undo;
        this.value = value;
    }
}

exports = CalcCommand;