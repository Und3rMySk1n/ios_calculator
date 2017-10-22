goog.module('calculator');

let CalcView = goog.require('CalcView');
let CalcModel = goog.require('CalcModel');
let CalcController = goog.require('CalcController');

let view = new CalcView('calculator');
let model = new CalcModel();
let controller = new CalcController(view, model);

exports = {};