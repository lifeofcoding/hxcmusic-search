/*
 * PlayerActions
 */

'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';

let PlayerActions = {

    playSong({url, title}) {
        console.log('playSong', url, title)
        AppDispatcher.dispatch({
            actionType: 'PLAY_SONG',
            url,
            title
        });
    },

    stop() {
        AppDispatcher.dispatch({
            actionType: 'STOP_PLAYING'
        });
    }

};

export default PlayerActions;
