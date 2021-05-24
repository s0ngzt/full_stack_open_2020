//路由

const bloglistRouter = require("express").Router();
const Blog = require("../models/blog");

bloglistRouter.get("/", (request, response) => {
  Blog
  .find({})
  .then((bloglist) => {
    response.json(bloglist.map((blog) => blog.toJSON()));
  });
});

//只定义相对部分
bloglistRouter.get("/:id", (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (bog) {
        response.json(blog.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

bloglistRouter.post("/", (request, response, next) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog
    .save()
    .then((savedBlog) => {
      response.json(savedBlog.toJSON());
    })
    .catch((error) => next(error));
});

bloglistRouter.delete("/:id", (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

bloglistRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then((updatedBlog) => {
      response.json(updatedBlog.toJSON());
    })
    .catch((error) => next(error));
});

module.exports = bloglistRouter;
