import Mock from 'mockjs';

/* 请求类型/type必须小写 */

const gameNumber = [2, 3];
let practiceNumber = 1;

// 用户信息
Mock.mock('/userinfo', 'get', {
  openid: '@id',
  nickname: '@name',
  headImgUrl: 'https://placeimg.com/64/64/people',
  invitationCode: '123654',
  score: '@natural(0, 999)',
  gameNumber,
  practiceNumber,
  prize: 1.5,
  rank: 99,
  trailer: {
    time: new Date(2018, 2, 5, 21, 30),
    prize: 200
  },
  messages: [
    '提示：邀请一名好友双方各获得一次游戏机会',
    '小技巧：所有答案都在资委手册微信小程序里哦~',
    '限时答题答对者平分所有奖金'
  ]
});

// 排行榜数据
Mock.mock('/rank', 'get', {
  'rankingList|20': [
    {
      openid: '@id',
      nickname: '@name',
      headImgUrl: 'https://placeimg.com/64/64/people@word',
      score: '@natural(0, 999)'
    }
  ]
});

Mock.mock('/play', 'post', () => {
  const state = { state: false };
  if (gameNumber[0] > 0) {
    gameNumber[0] -= 1;
    state.state = true;
  }
  return state;
});

Mock.mock('/practice', 'post', () => {
  const state = { state: false };
  if (practiceNumber > 0) {
    practiceNumber -= 1;
    state.state = true;
  }
  return state;
});

Mock.mock('/activity', 'post', () => ({
  state: true
}));

Mock.mock('/invite', 'post', () => {
  gameNumber[0] += 1;
  gameNumber[1] += 1;
  return {
    state: true
  };
});

Mock.mock('/question', 'post', {
  questionId: '@id',
  questionTitle: '@title',
  'questionOptions|4': [
    {
      content: '@word',
      rate: '@natural(0, 100)%'
    }
  ]
});
