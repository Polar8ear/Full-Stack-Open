import React from "react"
import { render, fireEvent } from "@testing-library/react"
import NewBlog from "./NewBlog"

describe("<NewBlog/>", () => {
  test("renders propery", () => {
    render(<NewBlog />)
  })

  test("creating blog works", () => {
    const handleCreateBlog = jest.fn()
    handleCreateBlog.mockImplementation((event) => event.preventDefault())

    const component = render(<NewBlog handleCreateBlog={handleCreateBlog} />)

    const inputFieldResponses = [
      {
        id: "#title",
        response: "Database management",
      },
      {
        id: "#author",
        response: "John White",
      },
      {
        id: "#url",
        response: "www.johnwhite.com/databasemanagement",
      },
    ]

    inputFieldResponses.forEach(({ id, response }) => {
      const inputField = component.container.querySelector(id)
      fireEvent.change(inputField, { target: { value: response } })
    })

    const createButton = component.container.querySelector("#createBtn")
    fireEvent.submit(createButton)

    expect(handleCreateBlog.mock.calls.length).toBe(1)

    const callInfo = handleCreateBlog.mock.calls[0][1]
    expect(callInfo.title).toBe("Database management")
    expect(callInfo.author).toBe("John White")
    expect(callInfo.url).toBe("www.johnwhite.com/databasemanagement")
  })
})
