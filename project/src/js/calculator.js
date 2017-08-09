goog.module('calculator');

const CalcView = goog.require('CalcView');
const CalcModel = goog.require('CalcModel');
const CalcController = goog.require('CalcController');

const view = new CalcView('calculator');
const model = new CalcModel();
const controller = new CalcController(view, model);

exports = {};