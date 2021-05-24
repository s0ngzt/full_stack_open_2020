//正常日志信息
const info = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(...params);
  }
};

//错误信息
const error = (...params) => {
  console.error(...params);
};

module.exports = {
  info,
  error,
};
