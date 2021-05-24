//路由

const bloglistRouter = require("express").Router();
const Blog = require("../models/blog");

bloglistRouter.get("/", async (request, response) => {
  const bloglist = await Blog.find({});
  response.json(bloglist);
});

//只定义相对部分
bloglistRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  } catch (e) {
    next(e);
  }
});

bloglistRouter.post("/", async (request, response, next) => {
  const body = request.body;

  if (body.title === undefined || body.url === undefined) {
    response.status(400).end();
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  try {
    const savedBlog = await blog.save();
    response.json(savedBlog);
  } catch (ex) {
    next(ex);
  }
});

bloglistRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

bloglistRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.json(updatedBlog.toJSON());
  } catch (error) {
    next(error);
  }
});

module.exports = bloglistRouter;
