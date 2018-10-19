import { TOGGLE_LANGUAGE } from './actions';

export default (state, action) => {
    switch (action.type) {
        case TOGGLE_LANGUAGE:
            return Object.assign({}, state, {
                language: state.language === "fr" ? "en" : "fr",
            });
        default:
            return state;
    };
};