import { startTransition, useActionState, useRef } from 'react'
import { useFormik } from 'formik'
import GuestsStepper from './GuestsStepper.jsx'
import { bookingSchema } from '../bookingSchema.js'
import { sendBooking } from '../api.js'

const initialValues = {
  name: '',
  phone: '',
  date: '',
  time: '',
  guests: 2,
  comment: '',
}

const fieldOrder = ['name', 'phone', 'date', 'time', 'guests', 'comment']

export default function BookingForm() {
  const formRef = useRef(null)

  const [result, dispatch, isPending] = useActionState(bookTable, null)

  const formik = useFormik({
    initialValues,
    validationSchema: bookingSchema,
    onSubmit: (values) => {
      if (isPending) return
      const validData = bookingSchema.cast(values)
      startTransition(() => dispatch(validData))
    },
  })

  async function bookTable(previousResult, booking) {
    if (booking === null) return null
    const response = await sendBooking(booking)
    if (response.ok) startTransition(() => formik.resetForm())
    return response
  }

  async function handleFormSubmit(e) {
    e.preventDefault()
    const validationErrors = await formik.validateForm()
    if (Object.keys(validationErrors).length > 0) {
      formik.setTouched({
        name: true,
        phone: true,
        date: true,
        time: true,
        guests: true,
        comment: true,
      })
      const firstInvalid = fieldOrder.find((field) => validationErrors[field])
      if (firstInvalid) {
        formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus()
      }
      return
    }
    formik.handleSubmit(e)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      e.currentTarget.requestSubmit()
    }
  }

  function handleReset() {
    formRef.current?.querySelector('[name="name"]')?.focus()
    formik.resetForm()
    startTransition(() => dispatch(null))
  }

  const nameError = formik.touched.name ? formik.errors.name : undefined
  const phoneError = formik.touched.phone ? formik.errors.phone : undefined
  const dateError = formik.touched.date ? formik.errors.date : undefined
  const timeError = formik.touched.time ? formik.errors.time : undefined

  return (
    <form
      ref={formRef}
      className="booking-form"
      noValidate
      onSubmit={handleFormSubmit}
      onKeyDown={handleKeyDown}
    >
      <div className="field">
        <label>
          Ім&apos;я
          <input
            {...formik.getFieldProps('name')}
            autoComplete="name"
            required
            aria-invalid={nameError ? 'true' : 'false'}
            aria-describedby="name-error"
          />
        </label>
        <p id="name-error" className="field-error">
          {nameError}
        </p>
      </div>
      <div className="field">
        <label>
          Телефон
          <input
            type="tel"
            {...formik.getFieldProps('phone')}
            autoComplete="tel"
            required
            aria-invalid={phoneError ? 'true' : 'false'}
            aria-describedby="phone-error"
          />
        </label>
        <p id="phone-error" className="field-error">
          {phoneError}
        </p>
      </div>
      <div className="row">
        <div className="field">
          <label>
            Дата
            <input
              type="date"
              {...formik.getFieldProps('date')}
              required
              aria-invalid={dateError ? 'true' : 'false'}
              aria-describedby="date-error"
            />
          </label>
          <p id="date-error" className="field-error">
            {dateError}
          </p>
        </div>
        <div className="field">
          <label>
            Час
            <input
              type="time"
              {...formik.getFieldProps('time')}
              required
              aria-invalid={timeError ? 'true' : 'false'}
              aria-describedby="time-error"
            />
          </label>
          <p id="time-error" className="field-error">
            {timeError}
          </p>
        </div>
      </div>
      <GuestsStepper
        value={formik.values.guests}
        onChange={(value) => formik.setFieldValue('guests', value)}
      />
      <label>
        Коментар
        <textarea
          {...formik.getFieldProps('comment')}
          maxLength={200}
          aria-describedby="comment-counter"
        />
      </label>
      <p id="comment-counter" className="counter">
        {formik.values.comment.length} / 200
      </p>
      <div className="actions">
        <button type="submit" aria-disabled={isPending}>
          {isPending ? 'Надсилаємо…' : 'Забронювати'}
        </button>
        <button type="button" onClick={handleReset}>
          Очистити
        </button>
      </div>
      <p
        role="status"
        className={result?.ok === false ? 'status error' : 'status'}
      >
        {result?.message}
      </p>
    </form>
  )
}
