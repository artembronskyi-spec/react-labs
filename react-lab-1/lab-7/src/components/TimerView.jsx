import { formatTime } from '../formatTime.js'

export default function TimerView({
  method,
  secondsLeft,
  status,
  onStart,
  onPause,
  onReset,
}) {
  let primaryLabel = 'Старт'
  let primaryAction = onStart

  if (status === 'running') {
    primaryLabel = 'Пауза'
    primaryAction = onPause
  } else if (status === 'paused') {
    primaryLabel = 'Продовжити'
    primaryAction = onStart
  } else if (status === 'done') {
    primaryLabel = 'Спочатку'
    primaryAction = onReset
  }

  return (
    <article className="brew-timer" aria-labelledby={`${method.id}-title`}>
      <h3 id={`${method.id}-title`}>{method.name}</h3>
      <p>{method.recipe}</p>
      <p className="time" role="timer">
        {formatTime(secondsLeft)}
      </p>
      <p className="timer-done" role="status">
        {status === 'done' ? 'Готово! Час пити каву.' : null}
      </p>
      <div className="timer-controls">
        <button type="button" onClick={primaryAction}>
          {primaryLabel}
        </button>
        {(status === 'running' || status === 'paused') && (
          <button type="button" onClick={onReset}>
            Скинути
          </button>
        )}
      </div>
    </article>
  )
}
