interface UdemyJSON {
    id: number;
    created: string;
}

class courseDate {

    constructor() {
        //this.init()
    }

    private init() {
        const courseId = this.getCourseId();
    }

    public getCourseId(): string {
        return document.body.getAttribute('data-clp-course-id');
    }

    public async getCreatedDate(courseId: string): Promise<string> {
        const url = 'https://www.udemy.com/api-2.0/courses/' + courseId + '/?fields[course]=created';

        try {
            const response = await fetch(url);
            const json = await response.json() as UdemyJSON;

            if(json.created) {
                return json.created;
            }

        } catch (e) {
            return ""
        }

        return "";
    }

    public formatUTCDateTime(utcDateTime: string): string {
        if(!utcDateTime.includes('Z')) {
            return "";
        }

        let formattedDate = '';
        const date = new Date(utcDateTime);
        const month = date.getMonth() + 1;

        if(month < 10) {
            formattedDate += '0'
        }

        formattedDate += month + '/' + date.getFullYear();

        return formattedDate;
    }

}

export { courseDate };