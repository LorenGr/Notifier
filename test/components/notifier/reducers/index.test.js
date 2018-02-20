import reducers from '../../../../src/components/notifier/reducers/';

describe('Testing Reducers', () => {
    test("Login Action", () => {
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
        expect(reducers(state, action)).toEqual(expected);
    });
    test('Logout action', () => {
        const state = {
            logged: true,
            username: 'foo'
        };
        const action = {
            type: "LOGOUT",
        };
        const expected = {
            logged: false,
            username: ''
        };
        expect(reducers(state, action)).toEqual(expected);
    });
    test('New Message', () => {
        const action = {
            type: "MESSAGES",
            messages: "HELLO"
        };
        const expected = {
            messages: {
                date: new Date(),
                content: "HELLO"
            }
        };
        expect(reducers({}, action)).toEqual(expected);
    });
    test('New Event - Level Increase', () => {
        const state = {
            level: 4
        }
        const action = {
            type: "EVENTS",
            events: {
                event: "LEVEL_INCREASE"
            }
        }
        const expected = {
            level: 5
        }
        expect(reducers(state, action)).toEqual(expected);
    });
    test('New Games', () => {
        const action = {
            type: "GAMES",
            games: [{
                label: "king"
            }]
        };
        const expected = {
            games: [{
                label: "king"
            }]
        };
        expect(reducers({}, action)).toEqual(expected);
    });
});