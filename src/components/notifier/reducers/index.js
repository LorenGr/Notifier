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
    messages: null,
    level: 1,
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
                username: '',
            });
        case NOTIFIER_NEW_MESSAGES :
            return Object.assign({}, state, {
                messages: {
                    date: new Date(),
                    content: action.messages
                }
            });
        case NOTIFIER_NEW_EVENTS :
            if (action.events.event === "LEVEL_INCREASE") {
                return Object.assign({}, state, {
                    level: state.level + 1
                });
            } else {
                return state;
            }
        case NOTIFIER_NEW_GAMES :
            return Object.assign({}, state, {
                games: action.games
            });
        default :
            return state;
    }
}