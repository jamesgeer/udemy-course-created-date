const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	mode: "development",
	entry: {
		index: "./src/background/index.ts",
		created_date: "./src/content/created_date.ts",
	},
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{ from: "./src/manifest.json" },
				{ from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js' },
			],
		}),
	],
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].js",
	},
};
