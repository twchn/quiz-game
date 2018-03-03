import Mock from 'mockjs';

/* 请求类型/type必须小写 */

// 用户信息
Mock.mock('/userinfo', 'get', {
  nickname: '@name',
  headImgUrl: 'https://placeimg.com/64/64/people',
  invitationCode: '123654',
  score: 100,
  gameNumber: [2, 3],
  practiceNumber: 3,
  prize: 1.5,
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
Mock.mock('rank', 'get', {
  'rankingList|20': [
    {
      userId: '@natural(100000, 9999999)',
      nickname: '@name',
      headImgUrl: 'https://placeimg.com/64/64/people@word',
      score: '@natural(0, 999)'
    }
  ]
});
