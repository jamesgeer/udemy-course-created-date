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
        console.log(document.body);
        return document.body.getAttribute('data-clp-course-id');
    }

    public async getCreatedDate(courseId: string): Promise<string> {
        const url = 'https://www.udemy.com/api-2.0/courses/' + courseId + '/?fields[course]=created';
        const response = await fetch(url);

        if(response.ok) {
            const json = await response.json() as UdemyJSON;
            return json.created;
        }

        return "";
    }

}

export { courseDate };