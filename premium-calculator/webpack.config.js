const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*', // Allow Container 8003
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    port: 8005,
    hot: true
  },
  module: {
    rules: [
        {
          test: /\.worker\.js$/, // Match files with .worker.js extension
          use: { 
            loader: 'worker-loader', 
            options: {
              filename: '[name].worker.js', // Generate only `premiumcalc.worker.js`
            }, 
          }
        },
        {
            /* The following line to ask babel 
             to compile any file with extension
             .js */
            test: /\.js?$/,

            /* exclude node_modules directory from babel. 
            Babel will not compile any files in this directory*/
            exclude: /node_modules/,

            // To Use babel Loader
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env' /* to transfer any advansed ES to ES5 */, 
                          '@babel/preset-react'], // to compile react to ES5
            },
        },
        {
          test: /\.scss$/, // Handle .scss files
          use: [
            'style-loader', // Inject CSS into the DOM
            'css-loader',   // Resolve CSS imports
            'sass-loader',  // Compile Sass to CSS
          ],
        },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'insurancePremium',
      filename: 'remoteEntry.js',
      remotes: {
        insuranceDetails: 'insuranceDetails@http://localhost:8006/remoteEntry.js'
      },
      exposes: {
        './InsurancePremiumIndex': './src/components/premiumDetails',
      },
      shared: {
        react: { singleton: true, eager: true},
        'react-dom': { singleton: true, eager: true},
        
      }  
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/workers/premiumcalc.worker.js', to: 'workers' },
      ],
    }),
  ],
};


