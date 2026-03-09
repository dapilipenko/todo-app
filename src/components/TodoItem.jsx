export default function TodoItem({ title, completed }) {
  return (
    <li className={`todo-item${completed ? ' completed' : ''}`}>
      <span className="checkbox"></span>
      <span className="title">{title}</span>
    </li>
  )
}