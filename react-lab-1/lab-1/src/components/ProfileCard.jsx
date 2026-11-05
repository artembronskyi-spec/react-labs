import { useState } from 'react'

export default function ProfileCard({
  name = 'Бронський Артем',
  group = 'КН-31',
  technologies = ['React 19', 'Vite', 'Tailwind CSS'],
}) {
  const [likes, setLikes] = useState(0)

  return (
    <div className="card">
      <h2>{name}</h2>
      <p>
        <strong>Група:</strong> {group}
      </p>
      <h3>Технології, які хочу опанувати:</h3>
      <ul>
        {technologies.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <button type="button" onClick={() => setLikes((prev) => prev + 1)}>
        Подобається {likes}
      </button>
    </div>
  )
}
