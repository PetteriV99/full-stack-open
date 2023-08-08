import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('rendering Blog', () => {

  let container
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  }

  const user = {
    username: 'wrawrawrfas',
    name: 'awewaeaw',
    token: 'awrwarfawrfawrwarfszfcvz'
  }

  const handleLike = async ({ blog }) => {
    console.log(blog)
  }

  const handleRemove = async ({ blog }) => {
    console.log(blog)
  }

  beforeEach(() => {
    container = render(<Blog blog={blog} handleLike={handleLike} handleRemove={handleRemove} user={user} />).container
  })

  test('title is rendered', () => {

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'React patterns'
    )
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const userScreen = userEvent.setup()
    const button = screen.getByText('show')
    await userScreen.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

})