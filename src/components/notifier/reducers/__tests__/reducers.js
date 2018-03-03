import reducers from '../index';

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
        expect(reducers(state, action)).toMatchSnapshot();
    });
    test('Logout action', () => {
        const state = {
            logged: true,
            username: 'foo'
        };
        const action = {
            type: "LOGOUT",
        };
        expect(reducers(state, action)).toMatchSnapshot();
    });
    test('New Message', () => {
        const action = {
            type: "MESSAGES",
            messages: "HELLO"
        };
        expect(reducers({}, action)).toMatchSnapshot();
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
        };
        expect(reducers(state, action)).toMatchSnapshot();
    });
    test('New Games', () => {
        const action = {
            type: "GAMES",
            games: [{
                label: "king"
            }]
        };
        expect(reducers({}, action)).toMatchSnapshot();
    });
});