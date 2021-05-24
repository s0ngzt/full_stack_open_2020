import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);
  //username & password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  //ex5.2
  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: user.id,
      url: url,
    };

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setTitle("");
      setUrl("");
    });

    setErrorMessage("added new blog!");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000)
  };

  //登录表单
  const LoginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  //添加博客表单
  //ex5.3
  const BlogForm = () => (
    <form onSubmit={addBlog}>
      标题<input value={title} onChange={handleTitleChange}></input>
      地址<input value={url} onChange={handleUrlChange}></input>
      <button type="submit">save</button>
    </form>
  );

  //ex5.1
  return (
    <div>
      <h1>blog-app</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        <div>
          <h2>log in to application</h2>
          <LoginForm />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged-in <button onClick={handleLogout}>logout</button>
          </p>
          {BlogForm()}
          <br />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
