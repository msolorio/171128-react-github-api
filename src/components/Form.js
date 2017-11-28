import React from 'react';

export default function Form(props) {

  function onInputChange(e) {
    props.handleInputChange(e.target.value);
  }

  function onFormSubmit(e) {
    e.preventDefault();

    props.handleFormSubmit(props.inputVal);
  }

  return (
    <form onSubmit={onFormSubmit}>
      <input value={props.inputVal}
        onChange={onInputChange} />
      <button className="Button" type="submit">
        Add User
      </button>
    </form>
  );
}
