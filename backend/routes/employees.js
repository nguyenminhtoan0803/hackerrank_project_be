const express = require('express');
const Employee = require('../models/Employee');
const auth = require('../middlewares/auth');

const router = express.Router();

// Create employee
router.post('/', auth, async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).send(employee);
  } catch (error) {
    res.status(400).send({ error: 'Error creating employee' });
  }
});

// Get all employees
router.get('/', auth, async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.send(employees);
  } catch (error) {
    res.status(400).send({ error: 'Error fetching employees' });
  }
});

// Update employee
router.put('/:id', auth, async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).send({ error: 'Employee not found' });
    await employee.update(req.body);
    res.send(employee);
  } catch (error) {
    res.status(400).send({ error: 'Error updating employee' });
  }
});

// Delete employee
router.delete('/:id', auth, async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).send({ error: 'Employee not found' });
    await employee.destroy();
    res.send({ message: 'Employee deleted' });
  } catch (error) {
    res.status(400).send({ error: 'Error deleting employee' });
  }
});

module.exports = router;
