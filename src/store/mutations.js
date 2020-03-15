import { setLocal, getLocal } from '@/utils/cache';
import * as types from './mutation-types';

const mutations = {
  [types.GET_CACHE](state) {
    state.mute = getLocal('mute') || false;
  },
  [types.SET_USER_INFO](state, userInfo) {
    state.openid = userInfo.openid;
    state.nickname = userInfo.nickname;
    state.headImgUrl = userInfo.headImgUrl;
    state.gameNumber = userInfo.gameNumber;
    state.practiceNumber = userInfo.practiceNumber;
    state.prize = userInfo.prize.toFixed(2);
    state.score = userInfo.score;
    state.rank = userInfo.rank;
    state.invitationCode = userInfo.invitationCode;
  },
  [types.PLAY_GAME](state, type) {
    switch (type) {
      case 'normal':
        state.gameNumber[0] -= 1;
        state.gameMode = 'normal';
        break;
      case 'practice':
        state.practiceNumber -= 1;
        state.gameMode = 'practice';
        break;
      case 'activity':
        state.gameMode = 'activity';
        break;
      default:
    }
  },
  [types.END_GAME](state) {
    state.previousGameMode = state.gameMode;
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
