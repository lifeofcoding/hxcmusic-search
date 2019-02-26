/*
 * PlayerStore
 */

'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter }  from 'events';
import _ from 'lodash';

let CHANGE_EVENT = 'change';

let _state = {
  visible: false,
  playing: {
      url: '',
      title: ''
  }
};


let PlayerStore = _.assign({}, EventEmitter.prototype, {

  getPlaying: function() {
    return _getPlaying();
  },

  getSound: function() {
      return this._sound;
  },

  setSound: function(s) {
      this._sound = s;

      return this._sound;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

// Register callback to handle all updates
AppDispatcher.register(function(action) {

  switch(action.actionType) {

    case 'PLAY_SONG':
        console.log('PLAY_SONG', action);
        _setPlaying(action);
        _setVisible(true);
    break;

    case 'STOP_PLAYING':
        _setPlaying({})
        _setVisible(false);
    break;

    default:
      // no op
  }

  PlayerStore.emit(action.actionType);

});

// Private Functions

let _getPlaying = () => _state.playing;
let _isVisible = () => _state.visible;

let _setPlaying = (song) => {
    console.log('_setPlaying', song)
    _state.playing.url = song.url;
    _state.playing.title = song.title;
};

let _setVisible = (value) => {
    _state.visible = value;
}

export default PlayerStore;
