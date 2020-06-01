import React, { Component, Fragment } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { InputContext } from "./inputContext";

export default class Form extends Component {
  constructor() {
    super();
    this.state = {
      error: {
        addressError: "",
        bedroomError: "",
        bathroomError: "",
      },
    };
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleBedroomChange = this.handleBedroomChange.bind(this);
    this.handleBathroomChange = this.handleBathroomChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }
  handleAddressChange(address) {
    if (address === "") {
      this.setState({
        error: { ...this.state.error, addressError: "cannot be empty" },
      });
      this.context.handleAddressChange({ address: "" });
    } else {
      this.context.handleAddressChange({
        address,
      });
      this.setState({ error: { ...this.state.error, addressError: "" } });
    }
  }

  handleBedroomChange(e) {
    const target = e.target;

    if (!target.value) {
      this.setState({
        error: { ...this.state.error, bedroomError: "cannot be empty" },
      });
      this.context.handleChange({ bedroom: "" });
    } else if (target.value > 10) {
      this.setState({
        error: {
          ...this.state.error,
          bedroomError: "cannot be greater than 10",
        },
      });
      this.context.handleChange({ bedroom: target.value });
    } else if (target.value < 1) {
      this.setState({
        error: { ...this.state.error, bedroomError: "cannot be less than 1" },
      });
      this.context.handleChange({ bedroom: e.target.value });
    } else {
      this.context.handleChange({ bedroom: target.value });
      this.setState({ error: { ...this.state.error, bedroomError: "" } });
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
      this.context.handleChange({ bathroom: target.value });
      this.setState({ error: { ...this.state.error, bathroomError: "" } });
    }
    this.context.handleChange({ bathroom: target.value });
  }

  handleDescriptionChange(e) {
    this.context.handleChange({ description: e.target.value });
  }

  render() {
    const isEnabled =
      this.context.address !== "" &&
      this.context.bedroom !== "" &&
      this.context.bathroom !== "" &&
      this.state.error.addressError === "" &&
      this.state.error.bedroomError === "" &&
      this.state.error.bathroomError === "";

    return (
      <Fragment>
        <div className="form-container">
          <h5 className="input-label">Address</h5>
          <div>
            {/* Address Field */}
            <PlacesAutocomplete
              value={this.context.address}
              onChange={this.handleAddressChange}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Search Places ...",
                      className: "input-value",
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? "suggestion-active"
                        : "suggestion";

                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            <div className="error-message">{this.state.error.addressError}</div>
            <br />
            {/* Bedroom Field */}
            <h5 className="input-label">Bedroom</h5>
            <input
              type="number"
              value={this.context.bedroom}
              onChange={this.handleBedroomChange}
              className="input-value"
              min={0}
              max={10}
            />
            <div className="error-message">{this.state.error.bedroomError}</div>
            <br />
            {/* Bathroom Field */}
            <h5 className="input-label">Bathroom</h5>
            <input
              type="number"
              value={this.context.bathroom}
              onChange={this.handleBathroomChange}
              className="input-value"
              min={0}
              max={5}
            />
            <div className="error-message">
              {this.state.error.bathroomError}
            </div>
            <br />
            {/* Description Value */}
            <h5 className="input-label">Description</h5>
            <textarea
              placeholder="description of the property"
              value={this.context.description}
              onChange={this.handleDescriptionChange}
              className="description-value"
            />
          </div>
          <button
            className="submit-btn"
            // disabled={!isEnabled}
            onClick={this.props.submitBtn}
          >
            Submit
          </button>
        </div>
      </Fragment>
    );
  }
}

Form.contextType = InputContext;
