const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',  

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],  // Soporte para TypeScript y JSX
    },
    module: {
        rules: [
        {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: 'babel-loader',
        },
        {
            test: /\.css$/,  
            use: ['style-loader', 'css-loader'], 
        },
        {
            test: /\.(png|jpg|gif|svg)$/,  // Para imágenes
            type: 'asset/resource',
        },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: './public/index.html', // Usa tu archivo HTML como base
        }),
    ],
    devServer: {
        static: path.join(__dirname, 'public'),
        historyApiFallback: true,
        port: 3000,
        open: true,
        hot: true,
    },
    mode: 'development',
};
