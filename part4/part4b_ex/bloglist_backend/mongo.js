const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/bloglist?retryWrites=true`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Bote", blogSchema);

const blog = new Blog({
  content: "Callback-functions suck",
  date: new Date(),
  important: true,
});

blog.save().then((response) => {
  console.log("blog saved!");
  mongoose.connection.close();
});

// Blog.find({}).then(result => {
//   result.forEach(blog => {
//     console.log(blog)
//   })
//   mongoose.connection.close()
// })
