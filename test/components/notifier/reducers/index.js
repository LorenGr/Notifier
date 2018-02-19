import {expect} from 'chai';
import reducers from '../../../../src/components/notifier/reducers/';

describe("Test Reducers", () => {
    describe("LOGIN", () => {

        const state = {
            logged: false,
            username: ''
        }
        const action = {
            type: "LOGIN",
            username: "foo"
        };
        const expected = {
            logged: true,
            username: 'foo'
        }
        expect(reducers(state, action)).to.equal(expected);

    });
});