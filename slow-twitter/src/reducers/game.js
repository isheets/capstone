const intialGame = {
    curTweetId: null,
    curGame: null
}

const game = (state = intialGame, action) => {
    switch(action.type) {
        case 'SET_CURRENT_TWEET':
            return {
                ...state,
                curTweetId: action.curTweetId
            }
        default:
            return state;
    }
}

export default game