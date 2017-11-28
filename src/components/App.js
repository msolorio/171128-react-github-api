import React, { Component } from 'react';
import Form from './Form';
import List from './List';
import UserListItem from './UserListItem';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputVal: '',
      userList: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChange(inputVal) {
    this.setState({inputVal});
  }

  renderUserList() {
    return this.state.userList.map((user) => {
      return <UserListItem user={user} />;
    });
  }

  handleFormSubmit(inputVal) {
    this.setState((prevState) => ({
      userList: this.state.userList.concat(inputVal)
    }));
  }

  render() {
    return (
      <div className="App">
        <Form handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit}
          inputVal={this.state.inputVal} />

        <List>{this.renderUserList()}</List>
      </div>
    );
  }
}

export default App;
