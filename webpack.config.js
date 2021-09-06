const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.json', '.tsx'],
  },
  devtool: 'source-map',// 打包出的js文件是否生成map文件（方便浏览器调试）
  mode: 'production',
  entry: {
    main: './src/index.ts',
  },
  externals: {
    'react': 'react'
  },
  output: {
    filename: 'index.js',// 生成的filename需要与package.json中的main一致
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // 指定特定的ts编译配置，为了区分脚本的ts配置
              configFile: path.resolve(__dirname, './tsconfig.json'),
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      },
    ],
  },
  plugins: [ 
    new CleanWebpackPlugin(),
  ],
};