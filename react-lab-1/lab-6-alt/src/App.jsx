import BookingForm from './components/BookingForm.jsx'
import SubscribeForm from './components/SubscribeForm.jsx'

export default function App() {
  return (
    <main className="page">
      <header className="intro">
        <h1>Бронювання столика</h1>
        <p>
          Кав&apos;ярня працює щодня з 8:00 до 21:00. Столики бронюємо з 8:00 до
          20:00. Заброньований столик чекає на вас 15 хвилин.
        </p>
      </header>
      <BookingForm />
      <section>
        <h2>Новини кав&apos;ярні</h2>
        <SubscribeForm />
      </section>
    </main>
  )
}
