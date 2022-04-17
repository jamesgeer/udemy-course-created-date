type UdemyJSON = {
    id: number,
    created: string
};

class courseDate {

    constructor() {
        this.init()
    }

    private init() {
        const courseId = this.getCourseId();
    }

    public getCourseId(): string {
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

if(window.location.host === 'www.udemy.com') {
    const pathArray = window.location.pathname.split('/').filter(Boolean);
    if(pathArray[0] === 'course') {
        new courseDate();
    }
}

// data-clp-course-id="xxxxxx"
// https://www.udemy.com/api-2.0/courses/xxxxxx/?fields[course]=created


// https://www.udemy.com/api-2.0/courses/1309202/?fields[course]=created

// document.body.getAttribute('data-clp-course-id');

// "1309202"


// (async () => {
//     const url = 'https://www.udemy.com/api-2.0/courses/1309202/?fields[course]=created';
//     const response = await fetch(url);
//
//     if(response.ok) {
//         const json = await response.json();
//         console.log(json)
//     }
// })();
