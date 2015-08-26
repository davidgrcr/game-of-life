/**
 * Created by david on 8/24/15.
 */
describe("Form", function () {


    beforeEach(function () {
        spyOn(Form, 'init').and.callThrough();
        spyOn(Form, 'addEventListeners').and.callThrough();

    });

    it("tracks that the form was init", function () {
        Form.addEventListeners.and.stub();
        Form.init();
        expect(Form.init).toHaveBeenCalled();

    });


    it("tracks that the form trigger addEventListeners", function () {
        Form.addEventListeners.and.stub();
        Form.init();
        expect(Form.addEventListeners).toHaveBeenCalled();


    });

    it("should throw an exception if the values of the Form ara null", function () {
        expect(Form.addEventListeners).toThrow(new TypeError("Cannot read property 'addEventListener' of null"));
    });

    it("should be able to say  Hello", function () {
        expect(Form.sayHello()).toBe('Hello');
        expect(Form.sayHello()).toEqual('Hello');
    });
    it("should be able to check if a number is not positive", function () {
        var n = '1';
        expect(n).toBeTruthy();
        expect(Form.checkIsNotPositiveNumber(n)).toEqual(false);

        n = -1;
        expect(n).not.toBeFalsy();
        expect(Form.checkIsNotPositiveNumber(n)).toEqual(true);

        n = true;
        expect(n).not.toBeFalsy();
        expect(n).toBeTruthy();
        expect(Form.checkIsNotPositiveNumber(n)).toEqual(false);

        n = 'a';
        expect(n).not.toBeFalsy();
        expect(Form.checkIsNotPositiveNumber(n)).toEqual(true);

        n = 0;
        expect(Form.checkIsNotPositiveNumber(n)).toEqual(true);
        expect(n).toBeFalsy();
    });
});