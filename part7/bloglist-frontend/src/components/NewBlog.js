import React, { useState } from "react"
import { useDispatch } from "react-redux"

import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"

import { addBlog } from "../reducers/blogsReducer"
import { showNotification } from "../reducers/notificationReducer"

const NewBlog = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setURL] = useState("")
  const [showModal, setShowModal] = useState(false)

  const dispatch = useDispatch()

  const handleCloseModal = () => setShowModal(false)
  const handleOpenModal = () => setShowModal(true)

  const handleCreateBlog = (event) => {
    event.preventDefault()

    dispatch(addBlog({ title, author, url })).then((savedBlog) =>
      dispatch(
        showNotification({
          style: "success",
          text: `a new blog '${savedBlog.title}' by ${savedBlog.author} added `,
        })
      )
    )

    handleCloseModal()
    setTitle("")
    setAuthor("")
    setURL("")
  }

  return (
    <div>
      <Button type="button" className="my-3" onClick={handleOpenModal}>
        Create New Blog
      </Button>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>Create New Blog</Modal.Header>
        <Form onSubmit={handleCreateBlog}>
          <Modal.Body>
            <Form.Group>
              <Form.Label htmlFor="title">Title:</Form.Label>
              <Form.Control
                id="title"
                type="text"
                value={title}
                name="Title"
                onChange={(event) => setTitle(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="author">Author:</Form.Label>
              <Form.Control
                id="author"
                type="text"
                value={author}
                name="Author"
                onChange={(event) => setAuthor(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="url">URL:</Form.Label>
              <Form.Control
                id="url"
                type="text"
                value={url}
                name="URL"
                onChange={(event) => setURL(event.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button id="createBtn" type="submit">
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default NewBlog
