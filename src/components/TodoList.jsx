import React from 'react'

function TodoList({ todos, onDelete, onToggle }) {
  if (!todos.length) return <p>Список порожній</p>

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          <div className="checkbox" onClick={() => onToggle(todo.id)} />
          <span className="title" onClick={() => onToggle(todo.id)}>
            {todo.title}
          </span>
          <button onClick={() => onDelete(todo.id)}>Видалити</button>
        </li>
      ))}
    </ul>
  )
}

export default TodoList
