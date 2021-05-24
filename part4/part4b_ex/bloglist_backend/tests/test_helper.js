const Blog = require('../models/blog')

const initialBloglist = [
  {
    title: "test 01",
    author: "no1",
    url: "www.baidu.com/no1",
    likes: 6
  },
  {
    title: "test 02",
    author: "no2",
    url: "www.baidu.com/no2",
    likes: 4
  },
  {
    title: "test 03",
    author: "no3",
    url: "www.baidu.com/no3",
    likes: 5
  }
]

// const nonExistingId = async () => {
//   const blog = new Note({ content: 'will remove this soon',date: new Date() })
//   await blog.save()
//   await blog.remove()

//   return blog._id.toString()
// }

//所有博客
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBloglist, blogsInDb
}
