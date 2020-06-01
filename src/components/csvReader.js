import React, { Component, Fragment } from "react";
import { CSVReader } from "react-papaparse";
import { InputContext } from "./inputContext";

export default class CsvReader extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }
  handleOnFileLoad = (data) => {
    const value = data.map((val) => val.data);

    this.context.handleAddressChange({ address: value[0][0] });
    this.context.handleChange({
      bedroom: value[0][1],
      bathroom: value[0][2],
      description: value[0][3],
    });
    this.setState({
      loaded: true,
    });
  };
  handleOnError = (err, file, inputElem, reason) => {
    alert(err);
  };
  render() {
    return (
      <Fragment>
        <CSVReader
          onFileLoad={this.handleOnFileLoad}
          onError={this.handleOnError}
        >
          <span>Uplaod CSV file</span>
        </CSVReader>
        <div>
          {console.log(this.state.loaded)}
          <button
            className={this.state.loaded ? "next-btn" : "hidden-btn"}
            onClick={this.props.handleClick}
          >
            Next
          </button>
        </div>
      </Fragment>
    );
  }
}

CsvReader.contextType = InputContext;
