goog.module('calculator_model_test');
let CalcModel = goog.require('CalcModel');


/* Calc model tests */
describe('Model ', function() {
    describe('when created', function() {
        let cleanModel = new CalcModel();

        it('has zero current number', function() {
            assert.equal(cleanModel.getCurrentValue(), '0');
        });

        it('has zero result number (memory)', function() {
            assert.equal(cleanModel.getResult(), '0');
        });
    });

    describe('after entering a number', function() {
        let model5 = new CalcModel();
        model5.onNumberButtonClicked(5);

        it('has right current number', function() {
            assert.equal(model5.getCurrentValue(), '5');
        });

        it('has zero result number (memory)', function() {
            assert.equal(model5.getResult(), '0');
        });

        it('has right current number with "-" after pressing plus/minus', function() {
            model5.onPlusMinusButtonClicked();
            assert.equal(model5.getCurrentValue(), '-5');
        });
    });

    describe('after clear button entered', function() {
        let clearButtonModel = new CalcModel();
        clearButtonModel.onNumberButtonClicked(5);
        clearButtonModel.onClearButtonClicked();

        it('has zero current number', function() {
            assert.equal(clearButtonModel.getCurrentValue(), '0');
        });

        it('has zero result number (memory)', function() {
            assert.equal(clearButtonModel.getResult(), '0');
        });
    });

    describe('after entering number with more than one digit', function() {
        let model172 = new CalcModel();
        model172.onNumberButtonClicked(1);
        model172.onNumberButtonClicked(7);
        model172.onNumberButtonClicked(2);

        it('has right current number', function() {
            assert.equal(model172.getCurrentValue(), '172');
        });

        it('has zero result number (memory)', function() {
            assert.equal(model172.getResult(), '0');
        });
    });

    describe('after entering number with comms', function() {
        let modelWithComma = new CalcModel();
        modelWithComma.onNumberButtonClicked(1);
        modelWithComma.onNumberButtonClicked(0);
        modelWithComma.onNumberButtonClicked(0);
        modelWithComma.onCommaButtonClicked();
        modelWithComma.onNumberButtonClicked(5);
        modelWithComma.onNumberButtonClicked(5);

        it('has right current number', function() {
            assert.equal(modelWithComma.getCurrentValue(), '100.55');
        });

        it('has zero result number (memory)', function() {
            assert.equal(modelWithComma.getResult(), '0');
        });
    });

    describe('after summation of two numbers', function() {
        let modelWithSum = new CalcModel();
        modelWithSum.onNumberButtonClicked(2);
        modelWithSum.onNumberButtonClicked(3);
        modelWithSum.onPlusButtonClicked();
        modelWithSum.onNumberButtonClicked(1);
        modelWithSum.onNumberButtonClicked(6);
        modelWithSum.onNumberButtonClicked(7);
        modelWithSum.onEqualsButtonClicked();

        it('has sum of numbers as current number', function() {
            assert.equal(modelWithSum.getCurrentValue(), '190');
        });

        it('has sum of numbers as result number', function() {
            assert.equal(modelWithSum.getResult(), '190');
        });
    });

    describe('after subtraction of two numbers', function() {
        let modelWithMinus = new CalcModel();
        modelWithMinus.onNumberButtonClicked(2);
        modelWithMinus.onNumberButtonClicked(3);
        modelWithMinus.onMinusButtonClicked();
        modelWithMinus.onNumberButtonClicked(1);
        modelWithMinus.onNumberButtonClicked(6);
        modelWithMinus.onNumberButtonClicked(7);
        modelWithMinus.onEqualsButtonClicked();

        it('has subtraction of numbers as current number', function() {
            assert.equal(modelWithMinus.getCurrentValue(), '-144');
        });

        it('has subtraction of numbers as result number', function() {
            assert.equal(modelWithMinus.getResult(), '-144');
        });
    });

    describe('after multiplication of two numbers', function() {
        let modelWithMultiplication = new CalcModel();
        modelWithMultiplication.onNumberButtonClicked(3);
        modelWithMultiplication.onNumberButtonClicked(2);
        modelWithMultiplication.onMultiplyButtonClicked();
        modelWithMultiplication.onNumberButtonClicked(7);
        modelWithMultiplication.onEqualsButtonClicked();

        it('has multiplication of numbers as current number', function() {
            assert.equal(modelWithMultiplication.getCurrentValue(), '224');
        });

        it('has multiplication of numbers as result number', function() {
            assert.equal(modelWithMultiplication.getResult(), '224');
        });
    });

    describe('after division of two numbers', function() {
        let modelWithDivision = new CalcModel();
        modelWithDivision.onNumberButtonClicked(3);
        modelWithDivision.onNumberButtonClicked(2);
        modelWithDivision.onDivideButtonClicked();
        modelWithDivision.onNumberButtonClicked(8);
        modelWithDivision.onEqualsButtonClicked();

        it('has division of two numbers as current number', function() {
            assert.equal(modelWithDivision.getCurrentValue(), '4');
        });

        it('has division of two numbers result number', function() {
            assert.equal(modelWithDivision.getResult(), '4');
        });
    });

    describe('after several operations with numbers', function() {
        let modelWithOperations = new CalcModel();
        modelWithOperations.onNumberButtonClicked(3);
        modelWithOperations.onNumberButtonClicked(2);
        modelWithOperations.onMinusButtonClicked();
        modelWithOperations.onNumberButtonClicked(22);
        modelWithOperations.onDivideButtonClicked();
        modelWithOperations.onNumberButtonClicked(5);
        modelWithOperations.onMultiplyButtonClicked();
        modelWithOperations.onNumberButtonClicked(1);
        modelWithOperations.onNumberButtonClicked(5);
        modelWithOperations.onPlusButtonClicked();
        modelWithOperations.onNumberButtonClicked(7);
        modelWithOperations.onEqualsButtonClicked();


        it('has result number as current number', function() {
            assert.equal(modelWithOperations.getCurrentValue(), '37');
        });

        it('has result number as result number', function() {
            assert.equal(modelWithOperations.getResult(), '37');
        });
    });
});

exports = {};