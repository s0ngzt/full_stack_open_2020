import React from 'react'
import blogs from '../services/blogs'
const Blog = ({ blog, addLikes }) => (
  <div>
    {blog.title} - {blog.url} - {blogs.likes}
  </div>
)

export default Blog
