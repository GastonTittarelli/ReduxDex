const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Detectar si estamos en producción o desarrollo
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './src/index.js',  // Archivo de entrada

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js', 

        publicPath: isProd ? '/Pokedex-Redux/' : '/', // Local
        // publicPath: isProd ? '/Pokedex-Redux/' : './', // Github Pages
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],  
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
                test: /\.(png|jpg|gif|svg)$/,  
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[name][ext]', 
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', // Archivo HTML como base
            inject: 'body',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: '.nojekyll', to: '' },
                { from: 'src/404.html', to: '404.html' },
                { from: 'public', to: 'assets/images' },
            ],
            
        }),
    ],
    devServer: {
        static: path.join(__dirname, 'public'), 
        historyApiFallback: true,  // Para soportar rutas con React Router
        port: 3000,  
        open: true,  
        hot: true,  
    },
    mode: isProd ? 'production' : 'development', 
};

// Message for Gastón from the future: Linea 15 y 16 para diferentes entornos y gh pages.