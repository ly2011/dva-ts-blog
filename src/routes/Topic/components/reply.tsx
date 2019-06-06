import React, { Fragment } from 'react'
import { Link } from 'dva/router'
import { Icon } from 'antd'
import { timeago } from '@/utils/time'
import styles from './reply.module.less'

type ReplyProps = {
  id: string
  author: {
    loginname: string
    avatar_url: string
  }
  create_at: string
  ups: string[]
  content: string
}
type IProps = {
  children?: any
  replys: ReplyProps[]
}
const Reply = ({ replys }: IProps) => {
  return (
    <div className={styles.reply}>
      <div>
        <span>{replys.length}</span>&nbsp;回复
      </div>
      {replys.map((reply, index) => (
        <div key={reply.id} className={styles.reply_item}>
          <Link to={{ pathname: `/user/${reply.author.loginname}` }}>
            <img src={reply.author.avatar_url} alt={'头像'} />
          </Link>
          <div className={styles.content_wrapper}>
            <div className={styles.info}>
              <p>
                <span>{index + 1}楼&nbsp;</span>
                <Link to={{ pathname: `/user/${reply.author.loginname}` }}>{reply.author.loginname}</Link>
                <span>
                  &nbsp;
                  {timeago(reply.create_at)}
                </span>
              </p>
              <span className={styles.thumbs}>
                {reply.ups.length > 0 ? (
                  <Fragment>
                    <Icon type="star" /> &nbsp; ${reply.ups.length}
                  </Fragment>
                ) : null}
              </span>
            </div>
            <p className={styles.reply_content} dangerouslySetInnerHTML={{ __html: reply.content }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Reply
