goog.module('CalcCommand');

class CalcCommand {
    /**
     *
     * @param execute {function}
     * @param undo {function}
     */
    constructor(execute, undo) {
        this.execute = execute;
        this.undo = undo;
    }
}

exports = CalcCommand;