import request from '../../../utils/request'

const BASE_URL = 'https://cnodejs.org/api/v1'

// 根据用户ID获取文章详情
export const getArticleById = id => {
  return request({
    baseURL: BASE_URL,
    url: `/topic/${id}`,
    method: 'get'
  })
}
