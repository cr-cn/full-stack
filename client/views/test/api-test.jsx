import React, { Component } from 'react';
import axios from 'axios';

/* eslint-disable */
export default class TestApi extends Component {
  getTopics() {
    axios.get('/api/topics')
      .then(resp => {
        console.log('topics', resp);
      })
      .catch(err => console.log(err));
  }

  login() {
    axios.post('/api/user/login', { accessToken: '17a0cdcd-2639-469f-9d45-bd68bb1f7044' })
      .then(resp => {
        console.log('login', resp);
      })
      .catch(err => console.log(err,'err'));
  }

  markAll() {
    axios
      .post('/api/message/mark_all?needAccessToken=true')
      .then(resp => {
        console.log('markAll', resp);
      })
      .catch(err => console.log(err, 'err'));
  }

  render() {
    return (
      <div>
        <button onClick={this.getTopics}>topics</button>
        <button onClick={this.login}>login</button>
        <button onClick={this.markAll}>markAll</button>
      </div>
    );
  }
}
/* eslint-enable */
