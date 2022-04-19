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

    public convertUTCDateTime(utcDateTime: string): string {
        if(!utcDateTime.includes('Z')) {
            return "";
        }

        const date = new Date(utcDateTime);
        const month = date.toLocaleString('default', { month: 'short' });

        return date.getDate() + " " + month + " " + date.getFullYear();
    }

}

export { courseDate };