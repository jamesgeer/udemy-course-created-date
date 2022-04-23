import browser, { Tabs } from "webextension-polyfill";
import Tab = Tabs.Tab;
import OnUpdatedChangeInfoType = Tabs.OnUpdatedChangeInfoType;

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

function handleUpdated(
	tabId: number,
	changeInfo: OnUpdatedChangeInfoType,
	tab: Tab
) {
	if (changeInfo.url) {
		console.log("Tab: " + tabId + " URL changed to " + changeInfo.url);

		const executing = browser.tabs.executeScript({
			file: "created_date.js",
		});
		executing.then();

		// document.onreadystatechange = function () {
		// 	console.log(document.readyState);
		// 	if (document.readyState === "complete") {
		// 		console.log(document.readyState);
		// new CreatedDate().run().then();
		// console.log("hello there");
		// }
		// };
	}
}

browser.tabs.onUpdated.addListener(handleUpdated);
