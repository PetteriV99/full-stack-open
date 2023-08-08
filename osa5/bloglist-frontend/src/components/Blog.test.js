import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
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

  const { container } = render(<Blog blog={blog} handleLike={handleLike} handleRemove={handleRemove} user={user} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'React patterns'
  )
})