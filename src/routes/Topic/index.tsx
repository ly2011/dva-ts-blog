import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { message, Divider, Skeleton } from 'antd'
import { timeago } from '@/utils/time'
import tabs from '@/utils/tabs'
import Reply from './components/reply'

import styles from './topic.module.less'

class Topic extends Component<any, any> {
  componentDidMount() {
    const { id } = this.props.match.params
    this.getArticle(id)
  }
  componentDidUpdate(prevProps) {
    const { id: newId } = this.props.match.params
    const { id: oldId } = prevProps.match.params
    if (oldId !== newId) {
      this.getArticle(newId)
    }
  }
  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch({
      type: 'topic/clear'
    })
  }
  getArticle(id) {
    const { dispatch } = this.props
    dispatch({
      type: 'topic/fetch',
      payload: {
        id
      },
      callback(err) {
        if (err) {
          message.error(err.msg)
        }
      }
    })
  }

  render() {
    const { topic: { topic = {} }, loading } = this.props
    if (!Object.keys(topic).length && !loading) {
      return null
    }
    return (
      <div>
        <div className={styles.topic}>
          <div className={styles.left}>
            {loading ? (
              <Skeleton active paragraph={{ rows: 15 }} />
            ) : (
              <Fragment>
                <h3 className={styles.title}>{topic.title}</h3>
                <div className={styles.info}>
                  <span>
                    发布于&nbsp;
                    {timeago(topic.create_at)}
                    &nbsp;•&nbsp;
                  </span>
                  作者：
                  {topic.author && (
                    <Link to={{ pathname: `/user/${topic.author.loginname}` }}>{topic.author.loginname}</Link>
                  )}
                  &nbsp;•&nbsp;
                  <span>{topic.visit_count}次浏览</span>
                  <span>
                    来自：
                    {tabs[topic.tab] && tabs[topic.tab].name}
                  </span>
                </div>
                <Divider />
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: topic.content }} />
                <Reply replys={topic.replies} />
              </Fragment>
            )}
          </div>
          <div className="right" />
        </div>
      </div>
    )
  }
}
export default connect(({ topic, loading }) => ({
  topic,
  loading: loading.global
}))(Topic)
