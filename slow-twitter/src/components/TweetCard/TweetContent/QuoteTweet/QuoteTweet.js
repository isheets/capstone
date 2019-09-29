import React from 'react'
import { useSelector } from "react-redux";

const QuoteTweet = () => {
    const state = useSelector(state => state);

    return(
        <div class="quote-tweet">
            {/* need to render the profile pic, info, text, and media */}
        </div>
    )
}

export default QuoteTweet