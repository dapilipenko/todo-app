import { useState, useMemo } from 'react'
import TodoList from './components/TodoList'
import './App.css'

const INITIAL_TODOS = [
  { id: 1, title: 'Вивчити React основи', completed: true },
  { id: 2, title: 'Створити Todo застосунок', completed: true },
  { id: 3, title: 'Розібратися з Props', completed: false },
  { id: 4, title: 'Навчитися використовувати map', completed: true },
  { id: 5, title: 'Додати стилізування', completed: true },
]

function App() {
  const [todos, setTodos] = useState(INITIAL_TODOS)
  const [input, setInput] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    const title = input.trim()
    if (!title) return
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), title, completed: false },
    ])
    setInput('')
  }

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    )
  }

  const stats = useMemo(() => ({
    total: todos.length,
    done: todos.filter((t) => t.completed).length,
  }), [todos])

  return (
    <div className="app">
      <h1>Мої задачі</h1>

      <form className="todo-form" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Нова задача..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Додати</button>
      </form>

      <p className="stats">
        Усього: {stats.total} | Виконано: {stats.done}
      </p>

      <TodoList todos={todos} onDelete={handleDelete} onToggle={handleToggle} />
    </div>
  )
}

export default App
