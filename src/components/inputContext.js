import React, { Component } from "react";

export const InputContext = React.createContext();
export default class InputContextProvider extends Component {
  constructor() {
    super();
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      address: "",
      bedroom: "",
      bathroom: "",
      description: "",
      handleAddressChange: this.handleAddressChange,
      handleChange: this.handleChange,
      imageFiles: [],
    };
  }
  handleAddressChange(value) {
    this.setState(value);
  }
  handleChange(value) {
    this.setState(value);
  }

  render() {
    return (
      <InputContext.Provider value={this.state}>
        {this.props.children}
      </InputContext.Provider>
    );
  }
}
