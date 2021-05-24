const jwt = require('jsonwebtoken')
const bloglistRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");



bloglistRouter.get("/", async (request, response) => {
  const bloglist = await Blog.find({}).populate('author', {username: 1, name: 1});
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

  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

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
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.json(savedBlog);
  } catch (ex) {
    next(ex);
  }
});

bloglistRouter.delete("/:id", async (request, response, next) => {
  try {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blogTodelete = await Blog.findById(request.params.id)
    const userid = await User.findById(decodedToken.id)
    //const userid = await User.findById(blogTodelete.author)
    if ( blogTodelete.author.toString() === userid.toString() ) {
      return response.status(401).json({ error: 'not authorized' })
    }
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
