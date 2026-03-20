import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 4000
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

app.use(cors({ origin: CLIENT_ORIGIN }))
app.use(express.json())

let todos = []
  

app.get('/api/todos', (_req, res) => {
  res.json(todos)
})

app.post('/api/todos', (req, res) => {
  const title = req.body?.title?.trim()
  if (!title) {
    return res.status(400).json({ message: 'Назва задачі є обов\'язковою' })
  }

  const newTodo = { id: Date.now(), title, completed: false }
  todos.push(newTodo)
  res.status(201).json(newTodo)
})

app.patch('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id)
  const todo = todos.find((t) => t.id === id)
  if (!todo) return res.status(404).json({ message: 'Задачу не знайдено' })

  if (typeof req.body?.title === 'string') {
    const trimmed = req.body.title.trim()
    if (!trimmed) return res.status(400).json({ message: 'Назва не може бути порожньою' })
    todo.title = trimmed
  }

  if (typeof req.body?.completed === 'boolean') {
    todo.completed = req.body.completed
  }

  res.json(todo)
})

app.delete('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id)
  const next = todos.filter((t) => t.id !== id)
  if (next.length === todos.length) {
    return res.status(404).json({ message: 'Задачу не знайдено' })
  }
  todos = next
  res.status(204).end()
})

app.use('*', (_req, res) => {
  res.status(404).json({ message: 'Маршрут не знайдено' })
})

app.listen(PORT, () => {
  console.log(`API запущено на http://localhost:${PORT}`)
  console.log(`Дозволений origin: ${CLIENT_ORIGIN}`)
})
