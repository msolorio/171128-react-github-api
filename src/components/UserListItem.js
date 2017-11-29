import React, { Component } from 'react';

export default class UserListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requestFailed: false,
      userData: {}
    }
  }

  getUrl(username) {
    return `https://api.github.com/users/${username}`;
  }

  componentDidMount() {
    fetch(this.getUrl(this.props.user))
      .then((res) => {
        if (!res.ok) {
          return new Error('Network request failed for:', this.getUrl(this.props.user));
        }
        return res;
      })
      .then((res) => res.json())
      .then((res) => {
        const newUserData = { imageUrl: res.avatar_url };
        this.setState({ userData: newUserData });
      }, () => {
        this.setState({ requestFailed: true });
      });
  }

  renderContents() {
    switch(true) {
      case this.state.requestFailed:
        return 'Request failed';

      case Object.keys(this.state.userData).length === 0:
        return '...Loading';

      case Object.keys(this.state.userData).length > 0:
        return (
          <img src={`${this.state.userData.imageUrl}`}
            width="200"
            heigth="200"
            alt="avatar" />
        );

      default:
        return 'There\'s a glitch in the matrix';
    }
  }

  render() {
    return <li>{this.renderContents()}</li>;
  }

}
