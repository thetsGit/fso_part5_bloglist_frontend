import React, { useState } from "react";
const Blog = ({ blog, updateBlog, currentUser, deleteBlog }) => {
  const [blogShow, setBlogShow] = useState(false);
  const blogToggle = () => setBlogShow(!blogShow);
  const blogStyle = {
    padding: 8,
    paddingTop: 7,
    backgroundColor: "#C4FCEF",
    marginBottom: 5,
    color: "#00C9A7",
  };
  const btnStyle = {
    marginLeft: 5,
    padding: 8,
    borderRadius: 5,
    cursor: "pointer",
  };
  const updateHandler = () => {
    const likes = blog.likes + 1;
    const { id, title, author, url, user } = blog;
    const userId = user.id;
    const blogObj = { title, author, likes, url, userId };
    updateBlog(id, blogObj);
  };
  const deleteHandler = () => {
    const confirm = window.confirm("Are you sure to delete?");
    confirm ? deleteBlog(blog.id) : null;
  };
  return (
    <div style={blogStyle}>
      <strong className="blogTitle">{blog.title}</strong>
      {blogShow ? (
        <div className="blogDetails">
          <button onClick={blogToggle} style={btnStyle}>
            hide
          </button>
          <p className="blogUrl">{blog.url}</p>
          <p className="blogLike">
            Likes:
            {blog.likes}
            <button style={btnStyle} onClick={updateHandler}>
              like
            </button>
          </p>
          <p className="blogAuthor">{blog.author}</p>
          {currentUser.username === blog.user.username ? (
            <button onClick={deleteHandler} style={btnStyle}>
              remove
            </button>
          ) : null}
        </div>
      ) : (
        <button className="viewBtn" onClick={blogToggle} style={btnStyle}>
          view
        </button>
      )}
    </div>
  );
};

export default Blog;
