import moment from 'moment'

// 格式化
export const timeago = (date, format = 'YYYY-MM-DD') => {
  if (!date) return ''
  return moment(date, format)
    .startOf('day')
    .fromNow()
}
