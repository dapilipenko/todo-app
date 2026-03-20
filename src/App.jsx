import { useEffect, useMemo, useState } from 'react'
import TodoList from './components/TodoList'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/todos'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error('Failed to load')
        const data = await res.json()
        setTodos(data)
      } catch (error) {
        console.error(error)
        setError('Не вдалося завантажити задачі. Переконайтеся, що запущено бекенд.')
      } finally {
        setIsLoading(false)
      }
    }

    loadTodos()
  }, [])

  const createTodo = async (title) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })

    if (!res.ok) throw new Error('Failed to create')
    return res.json()
  }

  const updateTodo = async (id, payload) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) throw new Error('Failed to update')
    return res.json()
  }

  const deleteTodo = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to delete')
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    const title = input.trim()
    if (!title) return

    try {
      setError('')
      const created = await createTodo(title)
      setTodos((prev) => [...prev, created])
      setInput('')
    } catch (error) {
      console.error(error)
      setError('Не вдалося додати задачу')
    }
  }

  const handleDelete = async (id) => {
    try {
      setError('')
      await deleteTodo(id)
      setTodos((prev) => prev.filter((t) => t.id !== id))
    } catch (error) {
      console.error(error)
      setError('Не вдалося видалити задачу')
    }
  }

  const handleToggle = async (id) => {
    const current = todos.find((t) => t.id === id)
    if (!current) return

    try {
      setError('')
      const updated = await updateTodo(id, { completed: !current.completed })
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)))
    } catch (error) {
      console.error(error)
      setError('Не вдалося оновити задачу')
    }
  }

  const handleEdit = async (id, title) => {
    try {
      setError('')
      const updated = await updateTodo(id, { title })
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)))
    } catch (error) {
      console.error(error)
      setError('Не вдалося відредагувати задачу')
    }
  }

  const stats = useMemo(
    () => ({
      total: todos.length,
      done: todos.filter((t) => t.completed).length,
    }),
    [todos]
  )

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

      {error && <p className="error">{error}</p>}
      {isLoading ? (
        <p className="info">Завантаження...</p>
      ) : (
        <TodoList
          todos={todos}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onEdit={handleEdit}
        />
      )}
    </div>
  )
}

export default App
