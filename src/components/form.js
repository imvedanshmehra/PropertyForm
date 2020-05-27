import React, { Component, Fragment } from "react";
import "./form.css";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "gkp",
      bedroom: "",
      bathroom: "",
      description: "",
      error: { addressError: "", bedroomError: "", bathroomError: "" },
    };
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleBedroomChange = this.handleBedroomChange.bind(this);
    this.handleBathroomChange = this.handleBathroomChange.bind(this);
  }

  handleAddressChange(e) {
    const target = e.target;

    if (!target.value) {
      this.setState({
        error: { ...this.state.error, addressError: "cannot be empty" },
        address: "",
      });
    } else {
      this.setState({
        address: target.value,
        error: { ...this.state.error, addressError: "" },
      });
    }
  }

  handleBedroomChange(e) {
    const target = e.target;

    if (!target.value) {
      this.setState({
        error: { ...this.state.error, bedroomError: "cannot be empty" },
      });
    } else if (target.value > 10) {
      this.setState({
        error: {
          ...this.state.error,
          bedroomError: "cannot be greater than 10",
        },
      });
    } else if (target.value < 1) {
      this.setState({
        error: { ...this.state.error, bedroomError: "cannot be less than 1" },
      });
    } else {
      this.setState({
        bedroom: e.target.value,
        error: { ...this.state.error, bedroomError: "" },
      });
    }
  }

  handleBathroomChange(e) {
    const target = e.target;
    if (!target.value) {
      this.setState({
        error: { ...this.state.error, bathroomError: "cannot be Empty" },
      });
    } else if (target.value > 5) {
      this.setState({
        error: { ...this.state.error, bathroomError: "cannot be more than 5" },
      });
    } else if (target.value < 1) {
      this.setState({
        error: { ...this.state.error, bathroomError: "cannot be less than 1" },
      });
    } else {
      this.setState({
        bathroom: e.target.value,
        error: { ...this.state.error, bathroomError: "" },
      });
    }
  }

  render() {
    return (
      <Fragment>
        <div className="form-container">
          <h5 className="input-label">Address</h5>
          <input
            type="text"
            className="input-value"
            value={this.state.address}
            onChange={this.handleAddressChange}
          />
          <div className="error-message">{this.state.error.addressError}</div>
          <br />
          <h5 className="input-label">Bedroom</h5>
          <input
            type="number"
            className="input-value"
            min={0}
            max={10}
            onChange={this.handleBedroomChange}
          />
          <div className="error-message">{this.state.error.bedroomError}</div>
          <br />
          <h5 className="input-label">Bathroom</h5>
          <input
            type="number"
            className="input-value"
            min={0}
            max={5}
            onChange={this.handleBathroomChange}
          />
          <div className="error-message">{this.state.error.bathroomError}</div>
          <br />
          <h5 className="input-label">Description</h5>
          <textarea
            placeholder="description of the property"
            className="description-value"
          />
          <button className="submit-btn" onClick={this.props.submitBtn}>
            Submit
          </button>
        </div>
      </Fragment>
    );
  }
}
