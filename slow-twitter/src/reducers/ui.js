const initialUI = {
    tweetIn: false,
    optionsIn: false,
    completeIn: false
}

const ui = (state = initialUI, action) => {
    switch(action.type) {
        case 'TOGGLE_TWEET_IN':
            return {
                ...state,
                tweetIn: !state.tweetIn
            }
        case 'TOGGLE_OPTIONS_IN':
            return {
                ...state,
                optionsIn: !state.optionsIn

            }
        case 'TOGGLE_COMPLETE_IN':
            return {
                ...state,
                userToken: !state.completeIn
            }
        default:
            return state
    }
}

export default ui