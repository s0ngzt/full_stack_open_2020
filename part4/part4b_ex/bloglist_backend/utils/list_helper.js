var _ = require("lodash");

const dummy = (_blogs) => {
  return 1;
};

//done
const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.reduce(reducer, 0);
};

//done
// const favoriteBlog = (blogs) => {
//   if(blogs.length === 1) {
//     return blogs[0]
//   }
//   let t = blogs[0];
//   for(i = 1; i < blogs.length; i++) {
//     if(blogs[i].likes > t.likes) {
//       t = blogs[i];
//     }
//   }

//   return t;
// }
const favoriteBlog = (blogs) => {
  return _.maxBy(blogs, "likes");
};

//done
//返回 作者 和 博客数
const mostBlogs = (blogs) => {
  const authors = _.map(blogs, "author");
  const count = _.countBy(authors);
  const counts = _.reduce(
    count,
    function (result, value, key) {
      result.push({ author: key, blogs: value });
      return result;
    },
    []
  );
  const maxBlogs = _.maxBy(counts, (item) => item.blogs);

  return maxBlogs;
};

//done
//返回 作者 和 赞数
const mostLike = (blogs) => {
  const authors = _.groupBy(blogs, "author");
  const likes = _.map(authors, (v, k) => {
    return {
      author: k,
      likes: v.reduce((sum, item) => sum + item.likes, 0),
    };
  });

  const maxLike = _.maxBy(likes, (item) => item.likes);
  return maxLike;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLike,
};
