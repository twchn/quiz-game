import Mock from 'mockjs';

/* 请求类型/type必须小写 */

const gameNumber = [1, 3];
let practiceNumber = 2;

// 用户信息
Mock.mock('/userinfo', 'get', {
  openid: '@id',
  nickname: '@name',
  headImgUrl: 'https://placeimg.com/64/64/people@word',
  invitationCode: '123654',
  score: '@natural(0, 999)',
  gameNumber,
  practiceNumber,
  prize: 1.5,
  rank: 22,
  trailer: {
    time: new Date(2018, 2, 5, 21, 30),
    prize: 200
  },
  messages: [
    '提示：邀请一名好友双方各获得一次游戏机会',
    '小技巧：所有答案都在资委手册微信小程序里哦~',
    '小提示：页面右上角有音效开关哦~',
    '规则：限时答题答对者平分所有奖金'
  ]
});

// 排行榜数据
Mock.mock(/\/rank/, 'get', {
  'rankingList|20-30': [
    {
      openid: '@id',
      nickname: '@name',
      headImgUrl: 'https://placeimg.com/64/64/people@word',
      score: '@natural(0, 999)'
    }
  ]
});

Mock.mock('/play', 'post', (options) => {
  const state = { state: false };
  switch (JSON.parse(options.body).type) {
    case 'normal':
      if (gameNumber[0] > 0) {
        gameNumber[0] -= 1;
        state.state = true;
      } else {
        state.msg = '机会已用完';
      }
      break;
    case 'practice':
      if (practiceNumber > 0) {
        practiceNumber -= 1;
        state.state = true;
      }
      break;
    case 'activity':
      state.state = true;
      break;
    default:
  }
  return state;
});

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

Mock.mock('/score', 'post', (options) => {
  const body = JSON.parse(options.body);
  let score = 0;
  let state = false;
  // 测试第四个为正确答案
  if (body.choice === 3) {
    state = true;
    score = 100 - Math.round((body.costTime[1] - body.costTime[0]) / 100);
  }
  return {
    state,
    score
  };
});
