import request from '@/utils/request'

export function getMemberList(params) {
  return request({
    url: '/member/getList.do',
    method: 'get',
    params
  })
}

export function createMember(params) {
  return request({
    url: '/member/register.do',
    method: 'post',
    params
  })
}

export function changeMemberPwd(params) {
  return request({
    url: '/member/changePwd.do',
    method: 'post',
    params
  })
}

export function resetMemberPwd(params) {
  return request({
    url: '/member/resetPwd.do',
    method: 'post',
    params
  })
}
