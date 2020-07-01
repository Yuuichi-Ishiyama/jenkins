const models = require('../models').management;

/**
 * show all employee list
 */
exports.index = function(req, res, next) {
  models.employee.all().then(employees => {
    res.json({ employees: employees });
  });
};

/**
 * show employee details
 */
exports.show = function(req, res, next) {
  models.employee.findById(req.params.id).then(employee => {
    res.json({ employee: employee });
  });
};

/**
 * create employee
 */
exports.create = function(req, res, next) {
  var properties = ["name", "department", "gender", "birth", "joined_date", "payment", "note"];
  var new_values = {};
  properties.forEach(function(prop) {
    new_values[prop] = req.body[prop];
  });
  models.employee.create(
    new_values
  ).then(new_employee => {
    res.redirect(302, '/employees');
  });
};

/**
 * update employee
 */
exports.update = function(req, res, next) {
  console.log('exports.update is executed');
  models.employee.findById(req.params.id).then(employee => {
    var properties = ["name", "department", "gender", "birth", "joined_date", "payment", "note"];
    var update_values = {};
    properties.forEach(function(prop){
      update_values[prop] = req.body[prop];
    });
    employee.update(update_values);
    res.redirect(302, "/employees/" + employee.id);
  });
};

/**
 * destroy employee
 */
exports.destroy = function(req, res, next) {
  models.employee.destroy
  ({
    where: { id: req.params.id }
  }).then(employee => {
    res.redirect(302, "/employees");
  });
};