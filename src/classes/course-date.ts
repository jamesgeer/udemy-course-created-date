interface UdemyJSON {
	id: number;
	created: string;
}

class CourseDate {
	constructor() {
		//this.init()
	}

	private init() {
		const courseId = this.getCourseId();
	}

	public getCourseId(): string {
		return document.body.getAttribute("data-clp-course-id");
	}

	public async getCreatedDate(courseId: string): Promise<string> {
		const url =
			"https://www.udemy.com/api-2.0/courses/" +
			courseId +
			"/?fields[course]=created";

		try {
			const response = await fetch(url);
			const json = (await response.json()) as UdemyJSON;

			if (json.created) {
				return json.created;
			}
		} catch (e) {
			return "";
		}

		return "";
	}

	public formatUTCDateTime(utcDateTime: string): string {
		if (!utcDateTime.includes("Z")) {
			return "";
		}

		let formattedDate = "";
		const date = new Date(utcDateTime);
		const month = date.getMonth() + 1;

		if (month < 10) {
			formattedDate += "0";
		}

		formattedDate += month + "/" + date.getFullYear();

		return formattedDate;
	}

	public getCreatedDateHTML(createdDate: string): string {
		return `
        <div class="clp-lead__element-item">
            <div class="last-update-date" data-purpose="last-update-date">
                <svg aria-hidden="true" focusable="false" class="udlite-icon udlite-icon-xsmall udlite-icon-color-neutral last-update-date__icon">
                    <use xlink:href="#icon-new"></use>
                </svg>
                <span>Created ${createdDate}</span>
            </div>
        </div>
        `;
	}

	public appendCreatedDateHTML(createdDateHTML: string): void {
		const target = document.querySelector(".clp-lead__element-meta");
		target.insertAdjacentHTML("afterbegin", createdDateHTML);
		//const node = new DOMParser().parseFromString(createdDateHTML, 'text/html');

		//console.log(node)

		//target.prepend(node);
	}
}

export { CourseDate };
