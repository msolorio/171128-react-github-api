import React, { Component } from 'react';

export default class UserListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requestFailed: false,
      userImage: ''
    }
  }

  getUrl(username) {
    return `https://api.github.com/users/${username}`;
  }

  componentDidMount() {
    fetch(this.getUrl(this.props.user))
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Response status ${res.status} for: ${this.getUrl(this.props.user)}`);
        }
        return res.json();
      })
      .then((res) => {
        this.setState({ userImage: res.avatar_url });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ requestFailed: true });
      });
  }

  renderContents() {
    switch(true) {
      case this.state.requestFailed:
        return 'Request failed';

      case this.state.userImage === '':
        return '...Loading';

      case this.state.userImage !== '':
        return (
          <img src={`${this.state.userImage}`}
            width="200"
            heigth="200"
            alt="" />
        );

      default:
        return 'There\'s a glitch in the matrix';
    }
  }

  render() {
    return <li>{this.renderContents()}</li>;
  }

}
