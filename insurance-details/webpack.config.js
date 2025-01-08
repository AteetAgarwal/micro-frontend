const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = 
          require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 8006,
    hot: true
  },
  module: {
    rules: [
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
      name: 'insuranceDetails',
      filename: 'remoteEntry.js',
      exposes: {
        './InsuranceDetailsIndex': './src/components/InsuranceDetails',
        './getInputValue': './src/components/InsuranceDetails'
      },
      shared: {
        react: { singleton: true, eager: true},
        'react-dom': { singleton: true, eager: true},
      }      
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};


