const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlListPlugin = [];

fs.readdirSync(path.resolve(__dirname, 'src/')).forEach(file => {
  if (file.startsWith('_') || !file.endsWith('pug')) return;
  console.log(file);
  htmlListPlugin.push(new HtmlWebpackPlugin({
    filename: `${path.parse(file).name}.html`,
    template: `src/${path.parse(file).name}.pug`,
    inject: false
  }))
})

const pug = {
  test: /\.pug$/,
  use: ['html-loader?attrs=false', 'pug-html-loader']
};
const js = {
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
      loader: 'babel-loader',
    }
}

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  mode: 'development',
  module: {
    rules: [js, pug]
  },
  plugins: htmlListPlugin,
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8765,
  }
};
