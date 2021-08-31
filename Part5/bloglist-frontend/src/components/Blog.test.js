import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

  const handleClickView = jest.fn()
  const handleLike = jest.fn()
  const handleDelete = jest.fn()

  const props = {
    handleClickView,
    handleDelete,
    handleLike,
  }

  test('renders title and author but not url and likes', () => {
    const blog = {
      title :'test',
      author :'testAuthor',
      URL : 'testURL',
      likes : '27',
      user: {
        username:'testUsername'
      }
    }

    const user = {
      username:'testUsername',
    }

    const component = render (
      <Blog blog={blog} user={user} {...props}/>
    )

    expect(component.container).toHaveTextContent('test testAuthor')

    const div = component.container.querySelector('.blogDetails')
    expect(div).toHaveStyle('display: none')
  })
})

