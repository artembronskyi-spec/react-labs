import ProfileCard from './components/ProfileCard'

export default function App() {
  const userTechnologies = ['React 19', 'Vite', 'Tailwind CSS']

  return (
    <main>
      <h1>Картка «Про мене»</h1>
      <ProfileCard
        name="Бронський Артем"
        group="КН-31"
        technologies={userTechnologies}
      />
    </main>
  )
}
