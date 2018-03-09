import request from './request';

export function getUserInfo() {
  return request('get', '/userinfo');
}

export function getRankingList({ type }) {
  return request('get', '/rank', { type });
}

export function beginPlay({ openid }) {
  return request('post', '/play', { openid });
}

export function beginPractice({ openid }) {
  return request('post', '/practice', { openid });
}

export function beginActivity({ openid }) {
  return request('post', '/activity', { openid });
}

export function invite({ openid, code }) {
  return request('post', '/invite', { openid, code });
}

export function getQuestion({ openid, mode }) {
  return request('post', '/question', { openid, mode });
}
