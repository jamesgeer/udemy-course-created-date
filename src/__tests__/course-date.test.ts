import 'isomorphic-fetch';
import { courseDate } from "../classes/course-date";

test('body should contain course id', () => {
    document.body = document.createElement('body');
    document.body.setAttribute('data-clp-course-id', '1309202')

    expect(new courseDate().getCourseId()).toEqual('1309202');
});

test('real api should return course created date', () => {
    expect.assertions(1);
    return expect(new courseDate().getCreatedDate("1309202"))
        .resolves.toEqual("2017-07-31T21:29:36Z");
});

test('mock api should return course created date', () => {
    expect.assertions(1);

    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ created: "2017-07-31T21:29:36Z" })
        })
    ) as jest.Mock;

    return expect(new courseDate().getCreatedDate("1309202"))
        .resolves.toEqual("2017-07-31T21:29:36Z");
});

test('mock api should return course not found', () => {
    expect.assertions(1);

    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ detail: "Not found." })
        })
    ) as jest.Mock;

    return expect(new courseDate().getCreatedDate("4000050505"))
        .resolves.toEqual("");
});

test('utc datetime should be human readable', () => {
    expect(new courseDate().convertUTCDateTime('2017-07-31T21:29:36Z'))
        .toEqual('31 Jul 2017');
});