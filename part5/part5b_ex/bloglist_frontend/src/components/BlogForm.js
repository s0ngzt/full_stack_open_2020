import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const addBlog = event => {
    event.preventDefault();
    createBlog({
      title: title,
      //author: user.id,
      url: url,
      likes: 0
    });

    setTitle("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
      标题<input value={title} onChange={handleTitleChange}></input>
      地址<input value={url} onChange={handleUrlChange}></input>
      <button type="submit">save</button>
    </form>
    </div>
  );
};

export default BlogForm;
