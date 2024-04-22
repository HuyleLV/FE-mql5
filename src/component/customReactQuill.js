import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
// #1 import quill-image-uploader
import ImageUploader from "quill-image-uploader";
import axios from "axios";

// #2 register module
Quill.register("modules/imageUploader", ImageUploader);

class CustomReactQuill extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
    this.textInput = React.createRef();
  }

  handleSubmit() {
    const editor = this.reactQuillRef.getEditor();
    this.setState({
      editorHtml: editor
    });
  }

  handleChange = (value) => {
    this.setState({ value });
    this.props.onChange(value); 
  };

  modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image"],  
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ["clean"]
    ],
    imageUploader: {
      upload: (file) => {
        return new Promise( async (resolve, reject) => {
          const formData = new FormData();
          formData.append("product_link", file);

          const result = await axios.post(
            `${process.env.REACT_APP_API_URL}/upload/file`,
            formData
          );
          resolve(process.env.REACT_APP_API_URL + result?.data);
        });
      }
    }
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "align",
    "image",
    "imageBlot",
    "color",
    "background"
  ];

  render() {
    return (
      <>
        <ReactQuill
          onChange={this.handleChange}
          theme="snow"
          className="h-[500px] mb-10"
          modules={this.modules}
          formats={this.formats}
          value={this.state.value}
        />
      </>
    );
  }
}

export default CustomReactQuill;
