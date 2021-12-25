import React, { useState } from "react";
import propTypes from "prop-types";

const CreateForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const titleHandler = ({ value }) => {
    setTitle(value);
  };
  const authorHandler = ({ value }) => {
    setAuthor(value);
  };
  const urlHandler = ({ value }) => {
    setUrl(value);
  };

  const createBlogHandler = (e) => {
    e.preventDefault();
    createBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <div>
      <h2>Create Form</h2>
      <form>
        <p>
          <label htmlFor="title">title: </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => titleHandler(target)}
          ></input>
        </p>
        <p>
          <label htmlFor="author">author: </label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => authorHandler(target)}
          ></input>
        </p>
        <p>
          <label htmlFor="url">url: </label>
          <input
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => urlHandler(target)}
          ></input>
        </p>
        <p>
          <button onClick={(e) => createBlogHandler(e)}>Create</button>
        </p>
      </form>
    </div>
  );
};

CreateForm.propTypes = {
  createBlog: propTypes.func.isRequired,
};

export default CreateForm;
