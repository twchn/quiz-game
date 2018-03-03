import request from './request';

export function getUserInfo() {
  return request('get', '/userinfo');
}

export function getRankingList() {
  return request('get', '/rank');
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
