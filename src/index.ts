import browser from "webextension-polyfill";
import { CreatedDate } from "./classes/CreatedDate";

console.log("test");

// browser.tabs.onUpdated.addListener(() => {
// 	document.onreadystatechange = function () {
// 		console.log(document.readyState);
// 		if (document.readyState === "complete") {
// 			console.log(document.readyState);
// 			new CreatedDate().run().then();
// 			console.log("hello there");
// 		}
// 	};
// });

function handleUpdated(tabId, changeInfo, tabInfo) {
	if (changeInfo.url) {
		console.log("Tab: " + tabId + " URL changed to " + changeInfo.url);

		// document.onreadystatechange = function () {
		// 	console.log(document.readyState);
		// 	if (document.readyState === "complete") {
		// 		console.log(document.readyState);
		new CreatedDate().run().then();
		console.log("hello there");
		// }
		// };
	}
}

browser.tabs.onUpdated.addListener(handleUpdated);
