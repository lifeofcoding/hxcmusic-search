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

    stop(song) {
        AppDispatcher.dispatch({
            actionType: 'STOP_PLAYING',
            song
        });
    }

};

export default PlayerActions;
