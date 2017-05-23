var path = require('path');
var webpack = require('webpack');
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin'),
    PathRewriterPlugin = require('webpack-path-rewriter')

var CleanWebpackPlugin = require('clean-webpack-plugin');   
module.exports = {
    entry: [
        'babel-polyfill',
        "./src/index.tsx"
    ],

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/' //for gh-pages
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
            {test: /\.tsx?$/, use: ['awesome-typescript-loader'] },

            {
                test: /\.(png|gif|jpe?g|svg|mp3)$/i,
                use: ['url-loader?limit=2']
            },
            {
                test: /\.css$/,
                use: [ 'file-loader' ]
            },
            {
              test: /\.(html|json)$/,
              loader: PathRewriterPlugin.rewriteAndEmit({
                name: '[name].[ext]'
              })
            }

        ]
    },

    plugins: [
        new webpack.DefinePlugin({ //
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          },
          '__DEVTOOLS__': true,
          '__IS_CORDOVA_BUILD__': false,
          '__CORDOVA_TEST_ONLY__': false
        }),

        new CleanWebpackPlugin(['dist'], {
        //  root: '/full/project/path',
        //  verbose: true,
        //  dry: false,
        //  exclude: ['shared.js']
        }),

        new webpack.optimize.CommonsChunkPlugin({
          children: true, // Look for common dependencies in all children,
          minChunks: 2 // How many times a dependency must come up before being extracted
        }),

        // This plugins optimizes chunks and modules by
        // how much they are used in your app
        //new webpack.optimize.OccurenceOrderPlugin(),

        // This plugin prevents Webpack from creating chunks
        // that would be too small to be worth loading separately
        //
        
        /*
        new webpack.optimize.MinChunkSizePlugin({
          minChunkSize: 51200 // ~50kb
        }), */

        new webpack.NamedModulesPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new PathRewriterPlugin()
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    /*
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        //"babylonjs": "BABYLON"
    }, */
};