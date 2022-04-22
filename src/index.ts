import browser from "webextension-polyfill";

// const coursePage = (tabId, changeInfo, tab) => {
// 	console.log("Hello there");
// 	console.log(tab.url);
//
// 	if (window.location.host === "www.udemy.com") {
// 		console.log("Looks like we're on Udemy");
//
// 		const pathArray = window.location.pathname.split("/").filter(Boolean);
// 		if (pathArray[0] === "course") {
// 			console.log("Looking at a course, are we?");
// 			new CreatedDate().run().then();
// 		}
// 	}
// };
//
// browser.tabs.onUpdated.addListener(coursePage);

const executing = browser.tabs.executeScript({
	file: "index.js",
});

executing.then();
