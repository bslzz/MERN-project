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
      return res.status(404).json({ msg: 'No todos with this ID found' });
    }
    const deletedTodos = await Todo.findByIdAndDelete(req.params.id);
    res.json(deletedTodos);
  } catch (error) {
    res.status(422).json(`Invalid ID: ${error.message}`);
  }
});

//EDIT TODOS

router.put('/todos/:id', requireLogin, async (req, res) => {
  try {
    const { title } = req.body;
    const edittodos = {};
    if (title) edittodos.title = title;

    const findtodos = await Todo.findOne({
      userId: req.user,
      _id: req.params.id,
    });
    if (!findtodos) {
      return res.status(404).json({ msg: 'No todos with this ID found' });
    }
    const editedtodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        $set: edittodos,
      },
      { new: true }
    );
    res.json(editedtodo);
  } catch (error) {
    res.status(422).json(`Invalid ID: ${error.message}`);
  }
});

module.exports = router;
