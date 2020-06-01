import { InputContext } from "./inputContext";
import React from "react";
import "./imageUploader.css";

export default class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: null,
    };
    this.addImage = this.addImage.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  addImage(e) {
    e.preventDefault();
    if (this.context.imageFiles.length >= 4) {
      alert("You can add upto only 4 images");
    } else {
      this.context.handleChange({
        imageFiles: [...this.context.imageFiles, this.state.preview],
      });
      this.setState({
        preview: null,
      });
      alert("Inmage has been uploaded succesfully!");
    }
  }

  deleteImage(e) {
    e.preventDefault();
    this.setState({ preview: null });
  }

  handleChange(event) {
    this.setState({
      preview: URL.createObjectURL(event.target.files[0]),
    });
  }

  render() {
    return (
      <div className="container">
        <p className="counter">
          Added {this.context.imageFiles.length}/4 images
        </p>
        <div className="input-label">
          <input type="file" onChange={this.handleChange} />
        </div>
        <div className="prievew-container">
          <img
            src={this.state.preview}
            className={
              this.state.preview == null ? "empty-image" : "preview-img"
            }
            alt="preview"
          />
          <span>
            <button
              onClick={this.addImage}
              className={this.state.preview == null ? "hidden-btn" : "add-btn"}
            >
              Add Image
            </button>
            <button
              onClick={this.deleteImage}
              className={
                this.state.preview == null ? "hidden-btn" : "delete-btn"
              }
            >
              Delete
            </button>
          </span>
        </div>
      </div>
    );
  }
}
ImageUpload.contextType = InputContext;
