const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Detectar si estamos en producción o desarrollo
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './src/index.js',  // Tu archivo de entrada principal

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js', // Nombre del archivo de salida
        // Cambiar el publicPath dinámicamente
        publicPath: isProd ? 'https://gastontittarelli.github.io/Pokedex-Redux/' : '/', // Para GitHub Pages o local
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],  // Soporte para TypeScript y JSX
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader', // Transpilar JS y TS
            },
            {
                test: /\.css$/,  
                use: ['style-loader', 'css-loader'], // Soporte para CSS
            },
            {
                test: /\.(png|jpg|gif|svg)$/,  // Para imágenes
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './dist/index.html', // Usa tu archivo HTML como base
        }),
    ],
    devServer: {
        static: path.join(__dirname, 'public'), // Servir archivos estáticos desde 'public'
        historyApiFallback: true,  // Para soportar rutas con React Router
        port: 3000,  // El puerto de desarrollo
        open: true,  // Abrir automáticamente en el navegador
        hot: true,  // Habilitar recarga en caliente
    },
    mode: isProd ? 'production' : 'development', // Configurar el modo
};

