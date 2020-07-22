const express = require('express');
const router = express.Router();
const requireLogin = require('../authentication/requireLogin');
const Todo = require('../models/todoModel');

//POST NEW TODOS

router.post('/todo', requireLogin, async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(422).json({ msg: 'Fields cannot be empty' });
    }
    const newTodo = new Todo({
      title,
      userId: req.user,
    });

    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (error) {
    res.status(422).json(error.message);
  }
});

// GET SAVED TODOS FROM DB

router.get('/alltodos', requireLogin, async (req, res) => {
  try {
    const getAllTodos = await Todo.find({ userId: req.user });
    res.json(getAllTodos);
  } catch (error) {
    res.status(422).json(error.message);
  }
});

//DELETE TODOS FROM DB

router.delete('/todos/:id', requireLogin, async (req, res) => {
  try {
    const todos = await Todo.findOne({
      userId: req.user,
      _id: req.params.id,
    });
    if (!todos) {
      return res.status(404).json({ msg: 'No todos found' });
    }
    const deletedTodos = await Todo.findByIdAndDelete(req.params.id);
    res.json(deletedTodos);
  } catch (error) {
    res.status(422).json(error.message);
  }
});

module.exports = router;
