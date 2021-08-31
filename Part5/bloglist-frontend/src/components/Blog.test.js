import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  beforeEach(() => {
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

    const handleClickView = jest.fn()
    const handleLike = jest.fn()
    const handleDelete = jest.fn()

    const props = {
      handleClickView,
      handleDelete,
      handleLike,
    }

    component = render (
      <Blog blog={blog} user={user} {...props}/>
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
})

