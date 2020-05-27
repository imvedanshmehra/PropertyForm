//
import React from "react";
import "./imageUploader.css";

export default class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      preview: null,
    };
    this.addImage = this.addImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  addImage() {
    if (this.state.preview == null) {
      alert("Upload a image first");
    } else if (this.state.file.length >= 4) {
      alert("You can add only 4 images");
    } else {
      this.setState(
        {
          file: [...this.state.file, this.state.preview],
          preview: null,
        },
        () => alert("Image added successfully!")
      );
    }
  }

  handleChange(event) {
    this.setState({
      preview: URL.createObjectURL(event.target.files[0]),
    });
  }

  render() {
    return (
      <div className="container">
        <p className="counter">Added {this.state.file.length}/4 images</p>
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
              className={
                this.state.preview == null ? "empty-add-btn" : "add-btn"
              }
            >
              Add Image
            </button>
          </span>
        </div>
      </div>
    );
  }
}
