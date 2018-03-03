import React, { Component } from 'react'
import ShowTodos from './components/ShowTodos'
import AddTodo from './components/AddTodo'
import axios from 'axios'

class TodoApp extends Component {
  constructor() {
    super()
    this.state = {
      todo: '',
      todos: []
    }
  }

  refresh = () => {
    axios.get('/todos').then(res => {
      if (res.data.todos) {
        this.setState({ todos: res.data.todos })
      }
    })
  }
  clearInput = () => {
    this.setState({ todo: '' })
  }

  addTodo = () => {
    axios.post(`/todos/${this.state.todo}`).then(this.refresh)
    this.clearInput()
  }

  completeTodo = id => {
    axios.patch(`/todos/complete/${id}`).then(this.refresh)
  }

  removeTodo = index => {
    axios.delete(`/todos/${index}`).then(this.refresh)
  }

  handleChange = e => {
    this.setState({
      todo: e.target.value
    })
  }

  componentDidMount() {
    this.refresh()
  }

  render() {
    return (
      <div>
        <AddTodo
          handleChange={this.handleChange}
          addTodo={this.addTodo}
          todo={this.state.todo}
        />
        <ShowTodos
          completeTodo={this.completeTodo}
          todos={this.state.todos}
          removeTodo={this.removeTodo}
        />
      </div>
    )
  }
}

export default TodoApp
