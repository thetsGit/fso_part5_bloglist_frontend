import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("blog component testing", function () {
  let currentUser, blog, component, retrieveElement, updateBlog, deleteBlog;
  beforeEach(() => {
    currentUser = {
      name: "thetlinhan",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRoZXRoYW4iLCJpZCI6IjYxYjU2YmQxMzIyOWI5ZjYwMWM3NGNiYSIsImlhdCI6MTY0MDI0OTczMn0.ggxUgzGkioegZ364SJ3DvwdyxrEFiOBkgYyFXPS3lmE",
      username: "thethan",
    };
    blog = {
      author: "Marcel Gormann",
      id: "61b5bc0c71a6eb1f4ec61e1e",
      likes: 19,
      title: "Astronauts talk about aliens",
      url: "https://www.merkur.de/welt/astronautin-weltall-universum-aliens-ausserirdische-unsichtbar-erde-zr-13428672.html",
      user: {
        username: "thirihan",
        name: "thetthirihan",
        id: "61b4d38e0a2994bd359d6d85",
      },
    };
    updateBlog = jest.fn();
    deleteBlog = jest.fn();
    component = render(
      <Blog
        blog={blog}
        currentUser={currentUser}
        updateBlog={updateBlog}
        deleteBlog={deleteBlog}
      />
    );
    retrieveElement = (selector) => component.container.querySelector(selector);
  });

  test("renders title but not author, url or likes", function () {
    const titleElement = retrieveElement(".blogTitle");
    const authorElement = retrieveElement(".blogAuthor");
    const likeElement = retrieveElement(".blogLike");
    const urlElement = retrieveElement(".blogUrl");
    expect(titleElement).toBeDefined();
    expect(authorElement).toBeNull();
    expect(likeElement).toBeNull();
    expect(urlElement).toBeNull();
  });
  test("author, url and likes are shown when show btn is clicked", function () {
    const showBtn = component.getByText("view");
    fireEvent.click(showBtn);
    const authorElement = retrieveElement(".blogAuthor");
    const likeElement = retrieveElement(".blogLike");
    const urlElement = retrieveElement(".blogUrl");
    expect(authorElement).toBeDefined();
    expect(likeElement).toBeDefined();
    expect(urlElement).toBeDefined();
  });
  test("if like btn's clicked twice, event handler's called twice as well", function () {
    const showBtn = component.getByText("view");
    fireEvent.click(showBtn);
    const likeBtn = component.getByText("like");
    fireEvent.click(likeBtn);
    fireEvent.click(likeBtn);
    expect(updateBlog.mock.calls).toHaveLength(2);
  });
});
