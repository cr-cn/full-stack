import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';
// import Button from '@material-ui/core/Button';
import { AppState } from '../../store/app-state';
import Container from '../layout/container';
import TopicListItem from './list-item';

@inject((stores) => {
  return {
    appState: stores.appState,
    topicStore: stores.topicStore,
  };
})
@observer
export default class TopicList extends Component {
  constructor() {
    super();
    this.state = {
      tabIndex: 0,
    };
  }
  componentDidMount() {
    // do something here
    this.props.topicStore.fetchTopics();
  }

  changeName = (event) => {
    this.props.appState.changeName(event.target.value);
  };

  asyncBootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 3;
        resolve(true);
      });
    });
  }

  changeTab = (e, value) => {
    this.setState({
      tabIndex: value,
    });
  };

  /* eslint-disable */
  listItemClick = () => {};
  /* eslint-enable */

  render() {
    const { tabIndex } = this.state;
    const { topicStore } = this.props;
    const topicList = topicStore.topics;

    const syncingTopic = topicStore.syncing;

    // const topic = {
    //   title: 'this is title',
    //   username: 'Ray',
    //   reply_count: 20,
    //   visit_count: 30,
    //   create_at: 'anytime',
    //   tab: 'share',
    // };
    return (
      <Container>
        <Helmet>
          <title>This is topic list</title>
          <meta name="description" content="This is description" />
        </Helmet>
        <Tabs value={tabIndex} onChange={this.changeTab}>
          <Tab label="全部" />
          <Tab label="分享" />
          <Tab label="工作" />
          <Tab label="问答" />
          <Tab label="精品" />
          <Tab label="测试" />
        </Tabs>
        <List>
          {topicList.map(topic => (
            <TopicListItem key={topic.id} onClick={this.listItemClick} topic={topic} />
          ))}
        </List>
        {syncingTopic ? (
          <div>
            <CircularProgress color="primary" size={100} />
          </div>
        ) : null}
      </Container>
    );
  }
}

TopicList.wrappedComponent.propTypes = {
  appState: PropTypes.instanceOf(AppState),
  topicStore: PropTypes.Object,
};
