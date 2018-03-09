import * as types from './mutation-types';
import { setLocal, getLocal } from '../utils/cache';

const mutations = {
  [types.GET_CACHE](state) {
    state.mute = getLocal('mute') || false;
  },
  [types.SET_USER_INFO](state, userinfo) {
    state.openid = userinfo.openid;
    state.nickname = userinfo.nickname;
    state.headImgUrl = userinfo.headImgUrl;
    state.gameNumber = userinfo.gameNumber;
    state.practiceNumber = userinfo.practiceNumber;
    state.prize = userinfo.prize.toFixed(2);
    state.score = userinfo.score;
    state.rank = userinfo.rank;
    state.invitationCode = userinfo.invitationCode;
  },
  [types.PLAY_GAME](state) {
    state.gameNumber[0] -= 1;
    state.gameMode = 'normal';
  },
  [types.PRACTICE](state) {
    state.practiceNumber -= 1;
    state.gameMode = 'practice';
  },
  [types.PLAY_ACTIVITY](state) {
    state.gameMode = 'activity';
  },
  [types.END_GAME](state) {
    state.gameMode = '';
  },
  [types.INVITE](state) {
    state.gameNumber[0] += 1;
    state.gameNumber[1] += 1;
  },
  [types.SWITCH_MUSIC](state) {
    state.mute = !state.mute;
    setLocal('mute', state.mute);
  }
};

export default mutations;
