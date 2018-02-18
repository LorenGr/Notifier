import {
    NOTIFIER_LOGIN,
    NOTIFIER_LOGOUT,
    NOTIFIER_NEW_MESSAGES,
    NOTIFIER_NEW_EVENTS,
    NOTIFIER_NEW_GAMES,
} from '../actions/';

export default function reducer(state = {
    username: '',
    logged: false,
    messages: "You have no new messages.",
    events: [],
    games: []
}, action) {
    switch (action.type) {
        case NOTIFIER_LOGIN :
            return Object.assign({}, state, {
                logged: true,
                username: action.username
            });
        case NOTIFIER_LOGOUT :
            return Object.assign({}, state, {
                logged: false,
                username: ''
            });
        case NOTIFIER_NEW_MESSAGES :
            return Object.assign({}, state, {
                messages: action.messages
            });
        case NOTIFIER_NEW_EVENTS :
            return Object.assign({}, state, {
                events: state.events.concat({label: action.events})
            });
        case NOTIFIER_NEW_GAMES :
            return Object.assign({}, state, {
                games: action.games
            });
        default :
            return state;
    }
}