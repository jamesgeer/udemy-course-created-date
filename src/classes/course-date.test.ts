import 'isomorphic-fetch';
import { courseDate } from "./course-date";

test('body should contain course id', () => {
    document.body = document.createElement('body');
    document.body.setAttribute('data-clp-course-id', '1309202')

    expect(new courseDate().getCourseId()).toEqual('1309202');
});

test('should return course created date', () => {
    expect.assertions(1);
    return expect(new courseDate().getCreatedDate("1309202"))
        .resolves.toEqual("2017-07-31T21:29:36Z");
});