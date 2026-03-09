import TodoList from './components/TodoList'
import './App.css'

const TODOS = [
  { id: 1, title: 'Вивчити React основи', completed: true },
  { id: 2, title: 'Створити Todo застосунок', completed: true },
  { id: 3, title: 'Розібратися з Props', completed: false },
  { id: 4, title: 'Навчитися використовувати map', completed: true },
  { id: 5, title: 'Додати стилізування', completed: true },
]

function App() {
  return (
    <div className="app">
      <h1>Мої задачі</h1>
      <TodoList todos={TODOS} />
    </div>
  )
}

export default App
