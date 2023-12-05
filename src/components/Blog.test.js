/* eslint-disable no-undef */
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Blog from './Blog'

describe('Blog component', () => {
  test('renders title and author, but not URL or likes by default', () => {
    const blog = {
      id: 1,
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 10,
      user: {
        username: 'testuser',
        name: 'Test User',
      },
    }

    const user = {
      username: 'testuser',
    }

    const component = render(<Blog blog={blog} user={user} like={() => ''} remove={() => ''} />)
    const div = component.container.querySelector('.blog-details')

    // Check that title and author are rendered
    expect(screen.getByText('Test Blog Test Author')).toBeInTheDocument()

    expect(div).toHaveStyle('display: none')

    // Check that URL and likes are not rendered by default
    // expect(screen.queryByText('http://test.com')).toBeNull()
    // expect(screen.queryByText('likes 10')).toBeNull()
  })

  // Add more tests as needed
})