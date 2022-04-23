interface Created {
	id: number;
	created: string;
}

export class CreatedDate {
	constructor() {}

	public async run(): Promise<boolean> {
		// guard if created date already exists
		if (this.createdDateExists()) {
			return false;
		}

		// get and format the data
		const courseId = this.getCourseId();
		if (courseId == null) {
			return false;
		}

		const createdDate = await this.getCreatedDate(courseId);
		const formattedDate = this.formatUTCDateTime(createdDate);
		const createdDateHTML = this.getCreatedDateHTML(formattedDate);

		// insert curated data
		this.insertCreatedDateHTML(createdDateHTML);

		return true;
	}

	public createdDateExists(): boolean {
		return document.getElementById("course-created-date") != null;
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
        <div id="course-created-date" class="clp-lead__element-item">
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

new CreatedDate().run().then();
