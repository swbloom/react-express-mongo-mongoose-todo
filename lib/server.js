const express = require('express')
const mongoose = require('mongoose')
const PORT = 8080

const Todo = require('./models/todo')
const uri = 'mongodb://localhost/todoApp'

mongoose.connect(uri)
const app = express()

app.get('/todos', (req, res) => {
  Todo.find({})
    .then(docs => {
      res.status(200).send({ todos: docs })
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
})

app.post('/todos/:todo', (req, res) => {
  const todo = new Todo({
    description: req.params.todo
  })
  todo
    .save()
    .then(doc => {
      res.status(201).json({ todo: doc })
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    })
})

app.put('/todos/:index/:nextTodo', (req, res) => {
  const { index, nextTodo } = req.params
  let todo = todos[index]

  if (todo) {
    todos[index] = nextTodo
    res.status(200).json({ todo: todos[index] })
  } else {
    res.status(404).json({
      message: 'The todo does not exist.'
    })
  }
})

app.patch('/todos/complete/:id', (req, res) => {
  const { id } = req.params

  Todo.findByIdAndUpdate(id, { completed: true })
    .then(doc => {
      res.status(200).json({ todo: doc })
    })
    .catch(err => {
      res.status(500).json({ message: err })
    })
})

app.delete('/todos/:id', (req, res) => {
  const { id, nextTodo } = req.params

  Todo.findByIdAndRemove(id)
    .then(doc => {
      res.status(200).json({ todo: doc })
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`)
})
