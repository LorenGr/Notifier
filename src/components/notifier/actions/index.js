export const NOTIFIER_LOGIN = "LOGIN";
export const NOTIFIER_LOGOUT = "LOGOUT ";
export const NOTIFIER_NEW_MESSAGES = "MESSAGES ";
export const NOTIFIER_NEW_EVENTS = "EVENTS";
export const NOTIFIER_NEW_GAMES = "GAMES";

export function loginNotifier(username) {
    return {
        type: NOTIFIER_LOGIN,
        username
    }
};

export function logoutNotifier() {
    return {
        type: NOTIFIER_LOGOUT,
    }
};

export function setNewMessages(messages) {
    return {
        type: NOTIFIER_NEW_MESSAGES,
        messages
    }
};

export function setNewEvents(events) {
    return {
        type: NOTIFIER_NEW_EVENTS,
        events
    }
};

export function setNewGames(games) {
    return {
        type: NOTIFIER_NEW_GAMES,
        games
    }
};