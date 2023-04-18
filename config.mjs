import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error("Unknown bundler");
}

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  mode: "development",
  devtool: false,
  entry: {
    main: "./src/index.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        resourceQuery: /raw/,
        type: "asset/source",
      },
    ],
  },
  output: {
    path: isRunningWebpack
      ? path.resolve(__dirname, "webpack-dist")
      : path.resolve(__dirname, "rspack-dist"),
    filename: "main.js",
  },
  resolve: {
    alias: {
      "!!raw-loader!moment": path.resolve(__dirname, "./node_modules/moment/moment.js?raw"),
      // Webpack fail
      // Rspack fail
      // "!!raw-loader!moment": path.resolve(__dirname, "./node_modules/moment/moment.js"),
      // Rspack success
      // Webpack fail
    },
  },
};

export default config;
