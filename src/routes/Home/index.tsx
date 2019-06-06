import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { message, Table, Tag, Icon, Popover, Avatar } from 'antd'
import tabs from '@/utils/tabs'
import { timeago } from '@/utils/time'

class Home extends Component<any, any> {
  columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 400,
      render: (text, record) => {
        return (
          <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => this.gotoTopic(record.id)}>
            {text}
          </span>
        )
      }
    },
    {
      title: '是否置顶',
      dataIndex: 'top',
      key: 'top',
      width: 100,
      render: text => <span>{text ? <Tag color="#87d068">是</Tag> : '否'}</span>
    },
    {
      title: '栏目',
      dataIndex: 'tab',
      key: 'tab',
      width: 100,
      render: text => {
        return <span>{tabs[text] && tabs[text].name}</span>
      }
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
      width: 100,
      render: text => {
        const content = (
          <div>
            <Avatar src={text.avatar_url} />
            {text.loginname}
          </div>
        )
        return text ? (
          <Popover content={content}>
            <Tag>{text.loginname}</Tag>
          </Popover>
        ) : (
          ''
        )
      }
    },
    {
      title: '最后回复时间',
      dataIndex: 'last_reply_at',
      key: 'last_reply_at',
      render: text => {
        let last_reply_at = timeago(text)
        return (
          <span>
            <Icon type="clock-circle" style={{ marginRight: '5px' }} />
            {last_reply_at}
          </span>
        )
      }
    }
  ]
  componentDidMount() {
    this.getArticle()
  }
  getArticle(params = {}) {
    const { dispatch } = this.props
    dispatch({
      type: 'topics/fetch',
      payload: {
        current: 1,
        pageSize: 10,
        ...params
      },
      callback(err) {
        if (err) {
          message.error(err.msg)
        }
      }
    })
  }
  handleTableChange = (pagination, filters, sorter) => {
    const { topics: { pagination: pager = {} } } = this.props
    pager.current = pagination.current
    pager.pageSize = pagination.pageSize
    delete pager.showSizeChanger
    delete pager.showQuickJumper
    delete pager.total
    delete pager.showTotal
    this.getArticle({
      ...pager,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    })
  }
  gotoTopic = id => {
    const { dispatch } = this.props
    dispatch(routerRedux.push(`/topic/${id}`))
  }
  render() {
    const { columns } = this
    const { topics: { list = [], pagination = {} }, loading } = this.props
    return (
      <div className="home">
        <div className="table-box">
          <Table
            loading={loading}
            rowKey="id"
            dataSource={list}
            columns={columns}
            pagination={pagination}
            onChange={this.handleTableChange}
            scroll={{ y: 1000 }}
          />
        </div>
      </div>
    )
  }
}
export default connect(({ topics, loading }) => ({
  topics,
  loading: loading.global
}))(Home)
