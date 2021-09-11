import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let handleClickView
  let handleLike
  let handleDelete

  beforeEach(() => {
    const blog = {
      title: 'test',
      author: 'testAuthor',
      URL: 'testURL',
      likes: '27',
      user: {
        username: 'testUsername',
      },
    }

    const user = {
      username: 'testUsername',
    }

    handleClickView = jest.fn()
    handleLike = jest.fn()
    handleDelete = jest.fn()

    const props = {
      handleClickView,
      handleDelete,
      handleLike,
    }

    component = render(
      <Blog blog={blog} user={user} {...props} />,
    )
  })

  test('renders title and author but not url and likes', () => {
    expect(component.container).toHaveTextContent('test testAuthor')

    const div = component.container.querySelector('.blogDetails')
    expect(div).toHaveStyle('display: none')
  })

  test('shows url and likes when clicked view', () => {
    const viewButton = component.container.querySelector('.viewBtn')
    fireEvent.click(viewButton)

    const div = component.container.querySelector('.blogDetails')
    expect(div).toHaveStyle('display: block')
  })

  test('like button works', () => {
    const likeButton = component.container.querySelector('.likeBtn')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(handleLike.mock.calls.length).toBe(2)
  })
})
