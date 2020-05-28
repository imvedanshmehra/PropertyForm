import React, { Component, Fragment } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import "./form.css";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      bedroom: "",
      bathroom: "",
      description: "",
      error: {
        addressError: "",
        bedroomError: "",
        bathroomError: "",
      },
    };
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleBedroomChange = this.handleBedroomChange.bind(this);
    this.handleBathroomChange = this.handleBathroomChange.bind(this);
  }

  handleAddressChange(address) {
    if (address == "") {
      this.setState({
        error: { ...this.state.error, addressError: "cannot be empty" },
        address: "",
      });
    } else {
      this.setState({
        address,
        error: { ...this.state.error, addressError: "" },
      });
    }
  }
  handleSelect(address) {
    this.setState({ address }, () => console.log(this.state.address));
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
    const isEnabled =
      this.state.address !== "" &&
      this.state.bedroom !== "" &&
      this.state.bathroom !== "" &&
      this.state.error.addressError === "" &&
      this.state.error.bathroomError === "" &&
      this.state.error.bedroomError === "";

    return (
      <Fragment>
        <div className="form-container">
          <h5 className="input-label">Address</h5>
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleAddressChange}
            onSelect={this.handleSelect}
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
                        {...getSuggestionItemProps(suggestion, { className })}
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
          <button
            className="submit-btn"
            disabled={!isEnabled}
            onClick={this.props.submitBtn}
          >
            Submit
          </button>
        </div>
      </Fragment>
    );
  }
}
