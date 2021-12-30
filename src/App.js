import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import login from "./services/login";
import logger from "./utils/logger";
import "./app.css";
import Togglable from "./components/Togglable";
import CreateForm from "./components/CreateForm";
import LoginForm from "./components/LoginForm";

const AlertBox = ({ message, type }) => {
  const className = type === "error" ? "alertBox error" : "alertBox";
  return (
    <div className={`${className}`} id="alertBox">
      <p>{message}</p>
    </div>
  );
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(null);
  const togglable1 = useRef();
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const currentUserJson = window.localStorage.getItem("currentUser");
    if (currentUserJson) {
      const user = JSON.parse(currentUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const killAlertBox = () => {
    setTimeout(() => {
      setShowAlert(null);
      setAlertMsg(null);
      setAlertType(null);
    }, 5000);
  };

  const triggerAlert = (type, message) => {
    setShowAlert(true);
    setAlertMsg(message);
    setAlertType(type);
  };
  const usernameInputHandler = ({ value }) => {
    setUsername(value);
  };

  const passwordInputHandler = ({ value }) => {
    setPassword(value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const loginRes = await login({ username, password });
      logger.info(loginRes);
      setUser(loginRes);
      blogService.setToken(loginRes.token);
      window.localStorage.setItem("currentUser", JSON.stringify(loginRes));
      setUsername("");
      setPassword("");
      triggerAlert("success", `${loginRes.name} has successfully logged in`);
      killAlertBox();
    } catch (err) {
      triggerAlert("error", err.response.data.error);
      killAlertBox();
    }
  };

  const logoutHandler = () => {
    window.localStorage.clear();
    setUser(null);
  };
  const createBlog = async ({ title, author, url }) => {
    try {
      const newBlog = await blogService.postOne({ title, author, url });
      const creator = {
        username: user.username,
        name: user.name,
        id: newBlog.user,
      };
      setBlogs(blogs.concat({ ...newBlog, user: creator }));
      logger.info(newBlog);
      triggerAlert("success", "A blog is created");
      togglable1.current.toggleShow();
      killAlertBox();
    } catch (error) {
      logger.info("It works");
      triggerAlert("error", error.response.data.error);
      killAlertBox();
    }
  };

  const updateBlog = async (blogId, blogObj) => {
    try {
      const newBlog = await blogService.putOne(blogId, blogObj);
      setBlogs(
        blogs.map((blog) =>
          blog.id === newBlog.id ? { ...blog, likes: newBlog.likes } : blog
        )
      );
      triggerAlert("success", "A blog is updated");
      killAlertBox();
    } catch (error) {
      logger.error(error.message);
      triggerAlert("error", "Blog update fails!!!");
      killAlertBox();
    }
  };

  const deleteBlog = async (blogId) => {
    blogService
      .deleteOne(blogId)
      .then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== blogId));
        triggerAlert("error", "A blog is deleted");
        killAlertBox();
      })
      .catch((e) => logger.error(e.message));
  };

  const blogSort = (b1, b2) => b2.likes - b1.likes;

  if (user === null) {
    return (
      <>
        <LoginForm
          username={username}
          password={password}
          submitHandler={submitHandler}
          usernameInputHandler={usernameInputHandler}
          passwordInputHandler={passwordInputHandler}
        />
        {showAlert && <AlertBox message={alertMsg} type={alertType} />}
      </>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      {showAlert && <AlertBox message={alertMsg} type={alertType} />}
      <p>
        {`${user.name}'s logged in  `}
        <button onClick={() => logoutHandler()}>logout</button>
      </p>
      <br></br>
      <Togglable buttonLabel="create form" ref={togglable1}>
        <CreateForm createBlog={createBlog} />
      </Togglable>

      {blogs.sort(blogSort).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          currentUser={user}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  );
};

export default App;
