/** @type {import('next').NextConfig} */
const nextConfig = {
    // webpack: (config) => {
    //     config.module.rules.push({
    //       test: /\.mjs$/,
    //       include: /node_modules/,
    //       type: "javascript/auto",
    //     });
    //     return config;
    //   },
};

// const webpack = require("webpack");

// module.exports = {
//   webpack: (config, options) => {
//     config.plugins.push(
//       new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
//         resource.request = resource.request.replace(/^node:/, "");
//       })
//     );
//     return config;
//   },
// };


export default nextConfig;
