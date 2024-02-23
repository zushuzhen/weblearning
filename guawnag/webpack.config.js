const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CopyPlugin = require("copy-webpack-plugin");
const glob = require("glob");
const devMode = process.env.NODE_ENV === "development";
// 从命令行获取终端类型
const terminal = process.env.npm_lifecycle_event.split(":")[1];
const htmlPluginArray = [];
function getEntry() {
  const entry = {};
  //读取src目录所有page入口
  glob.sync(`./src/pages/${terminal}/*/*.js`).forEach(function (filePath) {
    let name = filePath.match(/\/pages\/(.+)\/*.js/i);
    name = name[1].split("/")[1];
    entry[name] = filePath;
    // 实例化插件
    htmlPluginArray.push(
      new HtmlWebpackPlugin({
        filename: `./${name}.html`,
        template: `./src/pages/${terminal}/${name}/index.html`,
        title: `${name}`,
        chunks: [name],
        inject: true,
      })
    );
  });
  return entry;
}
const entry = getEntry();
module.exports = (env) => {
  console.log("===============>", env);
  console.log("===============>", process.env.NODE_ENV);
  return {
    mode: devMode ? "development" : "production",
    resolve: {
      alias: {
        vue: "vue/dist/vue.esm-bundler.js", //指定vue的运行版本，用支持template模板的 编译+运行时
        "@": path.resolve("src"),
      },
    },
    entry,
    output: {
      filename: "js/[name].[contenthash].bundle.js",
      path: path.resolve(__dirname, `dist/${terminal}`),
      publicPath: "/",
      clean: true, // 每次build，清空dist文件
    },
    devtool: devMode ? "eval-cheap-module-source-map" : "nosources-source-map",
    module: {
      rules: [
        {
          test: /\.vue$/i,
          loader: "vue-loader",
        },
        {
          test: /\.(css|scss)$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    require("postcss-preset-env")(), // 浏览器前缀补齐
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
          generator: {
            filename: "static/images/[name][ext][query]",
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "static/fonts/[name][ext][query]",
          },
        },
      ],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, `dist/${terminal}`),
      },
      hot: true,
      port: "auto", // 端口
      open: ["index.html"], // 自动打开浏览器
      proxy: {
        "/api": {
          target: "http://127.0.0.1:8090",
          pathRewrite: { "^/api": "" },
        },
      },
    },
    plugins: [
      ...htmlPluginArray,
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
      }),
      // 独立打包
      new MiniCssExtractPlugin({
        filename: `css/[name]${devMode ? "" : ".[contenthash]"}.css`,
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "./src/assets"),
            to: path.resolve(__dirname, `dist/${terminal}/static`),
          },
          {
            from: path.resolve(__dirname, "./public"),
            to: path.resolve(__dirname, `dist/${terminal}`),
          },
        ],
      }),
    ],
    // .concat(!devMode ? new BundleAnalyzerPlugin() : []),
    // .concat(devMode? [] : new OptimizeCssAssetsWebpackPlugin()),// css压缩
    optimization: {
      moduleIds: "deterministic",
      runtimeChunk: "single",
      minimize: true,
      minimizer: [].concat(
        devMode ? [] : [new TerserPlugin(), new CssMinimizerPlugin()]
      ), // js和css压缩
      splitChunks: {
        cacheGroups: {
          // styles: {
          //   test: /\.(css|scss)$/i,
          //   name: 'base',
          //   chunks: 'all',
          //   minChunks: 2,
          //   enforce: true,
          // },
          // default: {
          //   test: /\.js$/i,
          //   name: "common",
          //   chunks: "initial",
          //   minSize: 0, // 只要超出0字节就生成一个新包
          //   minChunks: 2, //模块被引用2及次以上的才抽离
          //   priority: -20,
          // },
          // vendor: {
          //   test: /[\\/]node_modules[\\/]/,
          //   name: "vendors",
          //   chunks: "initial",
          //   priority: -10, //优先进行抽离
          // },
        },
      },
    },
  };
};
