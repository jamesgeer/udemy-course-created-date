import { CreatedDate } from "./classes/CreatedDate";

document.onreadystatechange = function () {
	console.log(document.readyState);
	if (document.readyState === "complete") {
		console.log(document.readyState);
		new CreatedDate().run().then();
		console.log("hello there");
	}
};
