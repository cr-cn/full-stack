import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Button } from '@material-ui/core';
import { AppState } from '../../store/app-state';

@inject('appState')
@observer
export default class TopicList extends Component {
  componentDidMount() {
    // do something here
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

  render() {
    return (
      <div>
        <Helmet>
          <title>This is topic list</title>
          <meta name="description" content="This is description" />
        </Helmet>
        <Button raised color="primary">
          This is a button
        </Button>
        <input type="text" onChange={this.changeName} />
        <span>{this.props.appState.msg}</span>
      </div>
    );
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
};
