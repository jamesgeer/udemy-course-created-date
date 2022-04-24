import "isomorphic-fetch";
import { CreatedDate } from "../classes/CreatedDate";
import { format } from "prettier";

const formatStmt = (str: string) => format(str, { parser: "html" });

test("body should contain course id", () => {
	document.body = document.createElement("body");
	document.body.setAttribute("data-clp-course-id", "1309202");

	expect(new CreatedDate().getCourseId()).toEqual("1309202");
});

test("real api should return course created date", () => {
	expect.assertions(1);
	return expect(new CreatedDate().getCreatedDate("1309202")).resolves.toEqual(
		"2017-07-31T21:29:36Z"
	);
});

test("mock api should return course created date", () => {
	expect.assertions(1);

	global.fetch = jest.fn(() =>
		Promise.resolve({
			json: () => Promise.resolve({ created: "2017-07-31T21:29:36Z" }),
		})
	) as jest.Mock;

	return expect(new CreatedDate().getCreatedDate("1309202")).resolves.toEqual(
		"2017-07-31T21:29:36Z"
	);
});

test("mock api should return course not found", () => {
	expect.assertions(1);

	global.fetch = jest.fn(() =>
		Promise.resolve({
			json: () => Promise.resolve({ detail: "Not found." }),
		})
	) as jest.Mock;

	return expect(
		new CreatedDate().getCreatedDate("4000050505")
	).resolves.toEqual("");
});

test("utc datetime should convert to mm/yyyy", () => {
	expect(new CreatedDate().formatUTCDateTime("2017-07-31T21:29:36Z")).toEqual(
		"07/2017"
	);
});

test("created date HTML should match", () => {
	const expectedHTML = `
        <div id="course-created-date" class="clp-lead__element-item">
            <div class="last-update-date" data-purpose="last-update-date">
                <svg aria-hidden="true" focusable="false" class="udlite-icon udlite-icon-xsmall udlite-icon-color-neutral last-update-date__icon">
                    <use xlink:href="#icon-new"></use>
                </svg>
                <span>Created 07/2017</span>
            </div>
        </div>`;

	const result = new CreatedDate().getCreatedDateHTML("07/2017");

	expect(formatStmt(result)).toBe(formatStmt(expectedHTML));
});

test("created date HTML appears in the correct location", () => {
	document.body.innerHTML += `<div class="clp-lead__element-meta">
            <div class="clp-lead__element-item">Last updated 04/2022</div>
            <div class="clp-lead__element-item">English</div>
            <div class="clp-lead__element-item">English [Auto]</div>
        </div>`;

	const courseDate = new CreatedDate();
	const createdDateHTML = courseDate.getCreatedDateHTML("07/2017");
	courseDate.insertCreatedDateHTML(createdDateHTML);

	const expectedHTML = `<div class="clp-lead__element-meta">
            <div id="course-created-date" class="clp-lead__element-item">
                <div class="last-update-date" data-purpose="last-update-date">
                    <svg aria-hidden="true" focusable="false" class="udlite-icon udlite-icon-xsmall udlite-icon-color-neutral last-update-date__icon">
                        <use xlink:href="#icon-new"></use>
                    </svg>
                    <span>Created 07/2017</span>
                </div>
            </div>
            
            <div class="clp-lead__element-item">Last updated 04/2022</div>
            <div class="clp-lead__element-item">English</div>
            <div class="clp-lead__element-item">English [Auto]</div>
        </div>`;

	const selectorResult = document.querySelector(
		".clp-lead__element-meta"
	).outerHTML;

	expect(formatStmt(selectorResult)).toBe(formatStmt(expectedHTML));
});
