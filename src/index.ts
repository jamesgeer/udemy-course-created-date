import { courseDate } from './classes/course-date'

if(window.location.host === 'www.udemy.com') {
    const pathArray = window.location.pathname.split('/').filter(Boolean);
    if(pathArray[0] === 'course') {
        new courseDate();
    }
}