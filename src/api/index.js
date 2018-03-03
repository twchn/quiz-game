import request from './request';

export function getUserInfo() {
  return request('get', '/userinfo');
}

export function getRankingList() {
  return request('get', 'rank');
}
