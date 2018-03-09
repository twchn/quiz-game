const state = {
  openid: '',
  nickname: '',
  headImgUrl: '',
  invitationCode: '',
  gameNumber: [0, 0],
  practiceNumber: 0,
  prize: 0,
  score: 0,
  rank: 0,
  mute: false,
  gameMode: '' // 三种模式，normal:普通模式，practice:练习模式，activity:活动模式，为空：未开始游戏
};

export default state;
