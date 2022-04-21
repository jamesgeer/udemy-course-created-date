import { CreatedDate } from "./classes/CreatedDate";

declare const browser: any;

const coursePage = () => {
	console.log("Hello there");

	// compile please
	console.log("tab: " + browser.tabs.query({ currentWindow: true }));

	if (window.location.host === "www.udemy.com") {
		console.log("Looks like we're on Udemy");
		const pathArray = window.location.pathname.split("/").filter(Boolean);
		if (pathArray[0] === "course") {
			console.log("Looking at a course, are we?");
			new CreatedDate().run().then();
		}
	}
};

browser.tabs.onUpdated.addListener(coursePage);
