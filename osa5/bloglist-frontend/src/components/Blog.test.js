import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import NewBlogForm from './NewBlogForm'

describe('rendering Blog', () => {

  let container
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: null
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

  test('title is rendered', () => {
    container = render(<Blog blog={blog} handleLike={handleLike} handleRemove={handleRemove} ownedByUser={user?.name === blog?.user?.name ? true : false} />).container

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'React patterns'
    )
  })

  test('at start the children are not displayed', () => {
    container = render(<Blog blog={blog} handleLike={handleLike} handleRemove={handleRemove} ownedByUser={user?.name === blog?.user?.name ? true : false} />).container

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    container = render(<Blog blog={blog} handleLike={handleLike} handleRemove={handleRemove} ownedByUser={user?.name === blog?.user?.name ? true : false} />).container

    const userScreen = userEvent.setup()
    const button = screen.getByText('show')
    await userScreen.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking the button calls event handler once', async () => {

    const mockHandler = jest.fn()
    render(<Blog blog={blog} handleLike={mockHandler} handleRemove={handleRemove} ownedByUser={user?.name === blog?.user?.name ? true : false} />)

    const userForEvent = userEvent.setup()
    const button = screen.getByText('show')
    await userForEvent.click(button)
    const likeButton = screen.getByText('like')
    await userForEvent.click(likeButton)
    await userForEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('BlogForm calls onSubmit', async () => {
    const userForEvent = userEvent.setup()
    const createBlog = jest.fn()

    render(<NewBlogForm createBlog={createBlog} />)

    const input = screen.getByRole('textbox')
    const sendButton = screen.getByText('save')

    await userForEvent.type(input, 'testing a form...')
    await userForEvent.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].content).toBe('testing a form...')
  })

})