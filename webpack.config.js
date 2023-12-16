const currentTask = process.env.npm_lifecycle_event
const path = require("path") // build in part of node
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin") // use html file in app (not dist) as template and put in references to javascript and css files
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const {WebpackManifestPlugin} = require("webpack-manifest-plugin") 

const config = {
    entry: './app/app.js',
    output: {
        filename: 'main.[hash].js', //hash: for cashe-busting (random numbering)
        path: path.resolve(__dirname, 'dist')
    },
    // watch: true,
    plugins: [new HtmlWebpackPlugin({template: "./app/index.html"})], // use html file in app (not dist) as template and put in references to javascript and css files
    devServer: {
        port: 8080,
        static: path.resolve(__dirname, 'dist'),
        hot: true // enables hot module replacement
    },
    mode: "development",
    devtool: "eval-cheap-source-map",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        // npm install core-js regenerator-runtime
                        presets: [["@babel/preset-env", {"useBuiltIns": "usage", "corejs": 3, "targets": "defaults"}], "@babel/preset-react"]
                    }
                }
            }
        ]
    }

}

// for production mode (instead of development mode)
// npm install mini-css-extract-plugin // extract css into its own file instead of bundling it into the javascript file
// npm install clean-webpack-plugin //
// npm install webpack-manifest-plugin
if (currentTask == "build") {
    config.mode = "production"
    config.module.rules[0].use[0] = MiniCssExtractPlugin.loader // use that instead of "style-loader"
    config.plugins.push(new MiniCssExtractPlugin({filename: "main.[hash].css"}), new CleanWebpackPlugin(), new WebpackManifestPlugin()) // creates json-file that includes (random) names of files
}

module.exports = config