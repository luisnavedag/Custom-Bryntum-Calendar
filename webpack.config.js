const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.[contenthash].js',
        clean: true,
    },
    externals: {
        '@bryntum/calendar': 'bryntum.calendar',
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './public',
                    filter: (resourcePath) => !resourcePath.endsWith('/index.html'),
                },
                {
                    from: './node_modules/@bryntum/calendar/',
                    filter: (resourcePath) => {
                        if (/\/calendar\.umd(\.min)?\.js(\.map)?$/.test(resourcePath)) return true;
                        if (/\/calendar\.material(\.min)?\.css(\.map)?$/.test(resourcePath)) return true;
                        return false;
                    },
                },
                {
                    from: './node_modules/@bryntum/calendar/fonts',
                    to: 'fonts',
                    filter: (resourcePath) => {
                        if (/\/(Roboto|fa-solid)-.*(\.ttf|\.woff2)$/.test(resourcePath)) return true;
                        return false;
                    },
                },
            ],
        }),
    ]
};
