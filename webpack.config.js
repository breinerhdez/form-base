var path = require("path");

module.exports = {
  mode: "development",
  entry: ["./components/form-config/FormConfig.js", "./components/form-config/FieldsComponent.js"],
  output: {
    path: path.resolve(__dirname, "public/dist"),
    filename: "[name].js",
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
    ],
  },
};
