import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import CreateForm from "./CreateForm";

describe("Blog create form testing", function () {
  test("createHandler is invoked with intended arguments when create btn's clicked", function () {
    const createBlog = jest.fn();
    const component = render(<CreateForm createBlog={createBlog} />);
    const createBtn = component.getByText("Create");
    const titleInput = component.container.querySelector("#title");
    const authorInput = component.container.querySelector("#author");
    const urlInput = component.container.querySelector("#url");

    fireEvent.change(titleInput, {
      target: { value: "title" },
    });
    fireEvent.change(authorInput, {
      target: { value: "author" },
    });
    fireEvent.change(urlInput, {
      target: { value: "url" },
    });
    fireEvent.click(createBtn);
    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe("title");
    expect(createBlog.mock.calls[0][0].author).toBe("author");
    expect(createBlog.mock.calls[0][0].url).toBe("url");
  });
});
