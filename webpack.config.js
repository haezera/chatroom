let path = require("path");

module.exports = {
  mode: "production",
  entry: './src/client/index.js',
  module: {
    rules: [
      {
        test: /\.tsx$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
        use: [
          {loader: "ts-loader"},
          {loader: "babel-loader"},
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {loader: "babel-loader"},
        ]
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'index.js',
  },
};