import request from './request';

export function getUserInfo() {
  return request('get', '/userinfo');
}

export function getRankingList({ type }) {
  return request('get', '/rank', { type });
}

export function playGame({ openid, type }) {
  return request('post', '/play', { openid, type });
}

export function invite({ openid, code }) {
  return request('post', '/invite', { openid, code });
}

export function getQuestion({ openid, type, order }) {
  return request('post', '/question', { openid, type, order });
}

export function getScore({ openid, questionId, choice, costTime }) {
  return request('post', '/score', { openid, questionId, choice, costTime });
}
