var path = require('path');
var webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CleanWebpackPlugin = require('clean-webpack-plugin'); 
var libraryName = 'local-t2-sw-redux';
var outputFile = libraryName + '.js';  
module.exports = {
    entry: [
        "./src/index.ts"
    ],

    output: {
      path: __dirname + '/lib',
      filename: outputFile,
      library: libraryName,
      libraryTarget: 'umd'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'inline-source-map',

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {test: /\.tsx?$/, use: ['babel-loader','awesome-typescript-loader'] },

            {
                test: /\.(png|gif|jpe?g|svg)$/i,
                use: ['url-loader?limit=2']
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          },
          '__DEVTOOLS__': false
        }),
        new UglifyJsPlugin({ minimize: true }),
        new CleanWebpackPlugin(['dist'], {
        //  root: '/full/project/path',
        //  verbose: true,
        //  dry: false,
        //  exclude: ['shared.js']
        })
    ]
};