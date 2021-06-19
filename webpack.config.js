const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // Project main entry point
    // entry: "./app/index.js",
    entry: path.resolve(__dirname, 'app', 'index.js'),
    module: {
        rules: [
            // Svg loader
            // It means, whenever svg is found in js file, 
            // since the js cannot load svg directly we are using some ones code/module
            {
                test: /\.svg$/,
                loader: "svg-inline-loader"
            },
            // Styles/css Loader
            // Here we mentioned multiple loaders and also the loaders are loaded from right to left
            // Css loader allows us to import all the css properties into out js file.
            // Style loader allows us to take the css properties further to inject them to into the stylesheet of index file
            
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                // Find the group of js
                test: /\.(js)$/,
                // ignore transpiling JavaScript from node_modules as it should be that state
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-react',
                            "@babel/preset-env"
                        ]
                    }
                }
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    plugins: [new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'app', 'index.html') })],
    mode: process.env.NODE_ENV === "production" ? "production" : "development"
}

