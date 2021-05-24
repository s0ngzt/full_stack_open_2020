const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBloglist) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

//返回json格式
test("bloglist are returned as json", async () => {
  await api
    .get("/api/bloglist")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

//返回个数正确  ex4.8
test("all blogs are returned", async () => {
  const response = await api.get("/api/bloglist");

  expect(response.body).toHaveLength(helper.initialBloglist.length);
});

//ex4.9 验证博客文章的唯一标识符属性是否命名为id ?
test("guid for blog is defined as id", async () => {
  const response = await api.get("/api/bloglist");
  expect(response.body[0].id).toBeDefined();
});

//返回了应该返回的
test("a specific blog is within the returned bloglist", async () => {
  const response = await api.get("/api/bloglist");
  const authors = response.body.map((a) => a.author);

  expect(authors).toContain("no2");
});

//ex4.10 验证对/api/blogs url 发出 HTTP POST 请求是否成功地创建了一个新的 blog POST
//有效的博客可以添加
test("a valid blog can be added", async () => {
  const newBlog = {
    title: "test temp",
    author: "no-temp",
    url: "www.baidu.com/no-temp",
    likes: 6,
  };

  await api
    .post("/api/bloglist")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const lastBlog = await helper.blogsInDb();
  expect(lastBlog).toHaveLength(helper.initialBloglist.length + 1);

  const response = await api.get("/api/bloglist");

  const urls = response.body.map((r) => r.url);
  expect(urls).toContain("www.baidu.com/no-temp");
});

//ex4.11 验证如果请求中缺少like 属性，它将默认为值0
test("blog without like attr will be set to 0", async () => {
  const newBlog = {
    title: "test no like",
    author: "no-like",
    url: "www.baidu.com/no-like",
  };

  const response = await api.post("/api/bloglist").send(newBlog);
  expect(response.body.likes).toBe(0);
});

//ex4.12 验证如果请求数据中缺少 title 和 url 属性，则后端用状态代码400 Bad Request 响应该请求
test("blog without title and url attr will be 400", async () => {
  const newBlog = {
    author: "no-like",
  };

  await api.post("/api/bloglist").send(newBlog).expect(400);
});

//测试删除
test("succeeds with status code 204 if id is valid", async () => {
  const bloglistAtStart = await helper.blogsInDb();
  //const initialLength = bloglistAtStart.length;
  const blogToDelete = bloglistAtStart[0];

  await api.delete(`/api/bloglist/${blogToDelete.id}`).expect(204);

  const bloglistAtEnd = await helper.blogsInDb();

  //expect(bloglistAtEnd).toHaveLength(initialLength - 1);

  const contents = bloglistAtEnd.map((r) => r.title);

  expect(contents).not.toContain(blogToDelete.title);
});

//测试更新
test("successful update test", async () => {
  const bloglistAtStart = await helper.blogsInDb();
  //const initialLength = bloglistAtStart.length;
  const idToUpdate = bloglistAtStart[0].id
  //const inilialLikes  = bloglistAtStart[0].likes
  //const blogToUpdate = {...bloglistAtStart[0], likes: 100};

  await api.put(`/api/bloglist/${idToUpdate}`).send({...bloglistAtStart[0], likes: 100}).expect(200)

  //const bloglistAtEnd = await helper.blogsInDb();

  //expect(bloglistAtEnd).toHaveLength(initialLength - 1);

  const updatedBlog = await Blog.findById(idToUpdate)

  expect(updatedBlog.likes).toBe(100)
});

afterAll(() => {
  mongoose.connection.close();
});
