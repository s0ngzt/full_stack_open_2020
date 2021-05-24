const path = require("path");
const webpack = require("webpack");

const config = (env, argv) => {
  console.log("argv", argv.mode);

  const backend_url =
    argv.mode === "production"
      ? "https://placeholder_placeholder_placeholder/api/notes"
      : "http://localhost:3001/notes";

  return {
    entry: ["@babel/polyfill", "./src/index.js"],
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "main.js",
    },
    devtool: "inline-source-map",
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url),
      }),
    ],
  };
};

module.exports = config;
