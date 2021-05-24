import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NoteForm from './NoteForm'

test('<NoteForm /> updates parent state and calls onSubmit', () => {
  const createNote = jest.fn()

  const component = render(
    <NoteForm createNote={createNote} />
  )

  const input = component.container.querySelector('input')
  const form = component.container.querySelector('form')

  fireEvent.change(input, { target: { value: 'testing of forms could be easier' } })
  fireEvent.submit(form)

  expect(createNote.mock.calls.length).toBe(1)
  //console.log(JSON.stringify(createNote.mock.calls[0][0].content, null, 2))
  expect(createNote.mock.calls[0][0].content).toBe('testing of forms could be easier' )
})