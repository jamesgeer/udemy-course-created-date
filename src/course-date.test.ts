// @ts-ignore
const courseDate = require('./course-date');

test('should return course created date', () => {
    expect(new courseDate().getCreatedDate("1309202")).toBe("2017-07-31T21:29:36Z");
});