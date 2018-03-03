import React from 'react'
import Todo from './Todo'

const ShowTodos = props => {
  const { todos, removeTodo, completeTodo } = props
  return (
    <ul className="ShowTodos">
      {todos.map((todo, i) => (
        <Todo
          removeTodo={removeTodo}
          description={todo.description}
          id={todo._id}
          key={todo._id}
          completed={todo.completed}
          completeTodo={completeTodo}
        />
      ))}
    </ul>
  )
}

export default ShowTodos
