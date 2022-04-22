const path = require("path");

module.exports = {
	mode: "development",
	entry: {
		index: "./src/index.ts",
		created_date: "./src/classes/CreatedDate.ts",
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
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		path: path.join(__dirname, "./dist"),
		filename: "[name].js",
	},
};
