import React from "react";
import Form from "./components/form";
import ImageUpload from "./components/imageUploader";
import CsvReader from "./components/csvReader";
import { MDBStepper, MDBStep } from "mdbreact";
import { InputContext } from "./components/inputContext";
import "./App.css";

class App extends React.Component {
  state = {
    formActivePanel1: 1,
    formActivePanel1Changed: false,
  };

  swapFormActive = (a) => (param) => (e) => {
    this.setState({
      ["formActivePanel" + a]: param,
      ["formActivePanel" + a + "Changed"]: true,
    });
  };

  handleNextPrevClick = (a) => (param) => (e) => {
    this.setState({
      ["formActivePanel" + a]: param,
      ["formActivePanel" + a + "Changed"]: true,
    });
  };

  handleSubmission = (e) => {
    e.preventDefault();
    alert("Open you console to see the result");
    console.log(this.context);
  };

  calculateAutofocus = (a) => {
    if (this.state["formActivePanel" + a + "Changed"]) {
      return true;
    }
  };
  render() {
    return (
      <>
        <h2 className="header">Property form</h2>
        <MDBStepper form>
          <MDBStep form>
            <button
              className={
                this.state.formActivePanel1 === 1 ? "stepper-active" : "stepper"
              }
            >
              1
            </button>

            <p>Step1</p>
          </MDBStep>
          <MDBStep form>
            <button
              className={
                this.state.formActivePanel1 === 2 ? "stepper-active" : "stepper"
              }
            >
              2
            </button>

            <p>Step 2</p>
          </MDBStep>
          <MDBStep form>
            <button
              className={
                this.state.formActivePanel1 === 3 ? "stepper-active" : "stepper"
              }
            >
              3
            </button>

            <p>Step 3</p>
          </MDBStep>
        </MDBStepper>
        <form className="form">
          <>
            {this.state.formActivePanel1 === 1 && (
              <div>
                <div className="btn-container">
                  <button
                    onClick={this.handleNextPrevClick(1)(2)}
                    className="upload-btn"
                  >
                    Add from Scratch
                  </button>
                  <p className="header">OR</p>
                  <CsvReader handleClick={this.handleNextPrevClick(1)(2)} />
                </div>
              </div>
            )}
            {this.state.formActivePanel1 === 2 && (
              <div>
                <div className="field-container">
                  <Form submitBtn={this.handleNextPrevClick(1)(3)} />
                </div>

                <button
                  className="prev-btn"
                  onClick={this.handleNextPrevClick(1)(1)}
                >
                  Previous
                </button>
              </div>
            )}
            {this.state.formActivePanel1 === 3 && (
              <div>
                <ImageUpload />
                <button
                  className="prev-btn"
                  onClick={this.handleNextPrevClick(1)(2)}
                >
                  Previous
                </button>
                <button className="next-btn" onClick={this.handleSubmission}>
                  Submit
                </button>
              </div>
            )}
          </>
        </form>
      </>
    );
  }
}
App.contextType = InputContext;

export default App;
