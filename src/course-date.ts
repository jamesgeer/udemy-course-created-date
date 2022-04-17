class courseDate {

    courseName: string;

    constructor(courseName: string) {
        this.courseName = courseName;
    }
    
}

if(window.location.host === "www.udemy.com") {
    const pathArray = window.location.pathname.split('/').filter(Boolean);
    if(pathArray[0] === "course") {
        new courseDate(pathArray[1]);
    }
}