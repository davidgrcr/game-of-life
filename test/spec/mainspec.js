/**
 * Created by david on 8/24/15.
 */
describe("Form", function () {
    it("should be able to say  Hello", function () {
        expect(Form.sayHello()).toBe('Hello')
    });
    it("should be able to check if a number is not positive", function () {
        var n = 1;
        expect(Form.checkIsNotPositiveNumber(n)).toEqual(false);
        n = -1;
        expect(Form.checkIsNotPositiveNumber(n)).toEqual(true);
        n = 'a';
        expect(n).not.toBeFalsy();
        expect(Form.checkIsNotPositiveNumber(n)).toEqual(true);

        n = 0;
        expect(Form.checkIsNotPositiveNumber(n)).toEqual(true);
        expect(n).toBeFalsy();
    });
});