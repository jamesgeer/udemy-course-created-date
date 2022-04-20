import { CourseCreatedDate } from "./classes/CourseCreatedDate";

if (window.location.host === "www.udemy.com") {
	const pathArray = window.location.pathname.split("/").filter(Boolean);
	if (pathArray[0] === "course") {
		new CourseCreatedDate().run();
	}
}
