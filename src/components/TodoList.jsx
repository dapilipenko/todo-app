import TodoItem from './TodoItem'

export default function TodoList({ todos }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          title={todo.title}
          completed={todo.completed}
        />
      ))}
    </ul>
  )
}
