import * as types from './mutation-types';

const mutations = {
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
  },
  [types.PRACTICE](state) {
    state.practiceNumber -= 1;
  }
};

export default mutations;
