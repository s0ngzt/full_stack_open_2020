import React from 'react'
const Blog = ({ blog }) => (
  <div>
    {blog.title} - {blog.url}
  </div>
)

export default Blog
