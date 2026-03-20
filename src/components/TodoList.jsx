import { useState } from 'react'

function TodoList({ todos, onDelete, onToggle, onEdit }) {
  const [editingId, setEditingId] = useState(null)
  const [draft, setDraft] = useState('')

  if (!todos.length) return <p className="muted">Список порожній</p>

  const handleStartEdit = (todo) => {
    setEditingId(todo.id)
    setDraft(todo.title)
  }

  const handleCancel = () => {
    setEditingId(null)
    setDraft('')
  }

  const handleSubmitEdit = (e, id) => {
    e.preventDefault()
    const title = draft.trim()
    if (!title) return
    onEdit(id, title)
    handleCancel()
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => {
        const isEditing = editingId === todo.id

        return (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
          >
            <div className="checkbox" onClick={() => onToggle(todo.id)} />

            {isEditing ? (
              <form className="edit-form" onSubmit={(e) => handleSubmitEdit(e, todo.id)}>
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  autoFocus
                  placeholder="Нова назва..."
                />
                <div className="actions">
                  <button type="submit" className="primary">Зберегти</button>
                  <button type="button" className="ghost" onClick={handleCancel}>
                    Скасувати
                  </button>
                </div>
              </form>
            ) : (
              <>
                <span className="title" onClick={() => onToggle(todo.id)}>
                  {todo.title}
                </span>
                <div className="actions">
                  <button className="ghost" onClick={() => handleStartEdit(todo)}>
                    Редагувати
                  </button>
                  <button className="danger" onClick={() => onDelete(todo.id)}>
                    Видалити
                  </button>
                </div>
              </>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default TodoList
