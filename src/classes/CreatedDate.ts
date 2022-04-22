interface Created {
	id: number;
	created: string;
}

export class CreatedDate {
	constructor() {
		console.log("class initialised");
	}

	public async run(): Promise<void> {
		// get and format the data
		const courseId = this.getCourseId();
		console.log("courseId: " + courseId);

		if (courseId !== null) {
			const createdDate = await this.getCreatedDate(courseId);
			console.log("createdDate: " + createdDate);

			const formattedDate = this.formatUTCDateTime(createdDate);
			console.log("formattedDate: " + formattedDate);

			const createdDateHTML = this.getCreatedDateHTML(formattedDate);
			console.log("createdDateHTML:" + createdDateHTML);

			// insert curated data
			this.insertCreatedDateHTML(createdDateHTML);
			console.log("data inserted boss");
		}
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
			const json = (await response.json()) as Created;

			if (json.created) {
				return json.created;
			}
		} catch (e) {
			throw new Error("Fetch failed to retrieve course created date.");
		}

		return "";
	}

	public formatUTCDateTime(utcDateTime: string): string {
		if (!utcDateTime.includes("Z")) {
			throw new Error("Unexpected UTC date received.");
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

	public insertCreatedDateHTML(createdDateHTML: string): void {
		const target = document.querySelector(".clp-lead__element-meta");
		target.insertAdjacentHTML("afterbegin", createdDateHTML);
	}
}
