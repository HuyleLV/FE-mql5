import axios from 'axios';
import React, { Component, useRef, useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

class CustomSunEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
    this.textInput = React.createRef();
  }
  
  handleChange = (value) => {
    this.setState({ value });
    this.props.onChange(value); 
  };

  sortedFontOptions = [
    "Logical",
    "Salesforce Sans",
    "Garamond",
    "Sans-Serif",
    "Serif",
    "Times New Roman",
    "Helvetica"
  ].sort();

  getSunEditorInstance = (sunEditor) => {
    this.textInput.current = sunEditor;
  };

  onImageUploadBefore =  (file, info, uploadHandler) => {
    
    console.log("file: ", file[0]);
    const fd = new FormData();
    fd.append('product_link', file[0]);
    console.log(fd)

    axios.post(
      `${process.env.REACT_APP_API_URL}/upload/file`,
      fd
    ).then((res) => {
      const response = {
        "result" : [
            {
                "url" : process.env.REACT_APP_API_URL + res?.data,
                "name" : res?.data,
            }
        ]
      }
      
      return uploadHandler(response);
    });

  }

  render() {
    return (
      <>
        <SunEditor
          height='600px'
          width='850px'
          defaultValue={this.state.value}
          onChange={this.handleChange}
          getSunEditorInstance={this.getSunEditorInstance}
          onImageUploadBefore={this.onImageUploadBefore}
          setOptions={{
            buttonList: [
              ["undo", "redo"],
              ["font", "fontSize"],
              ['paragraphStyle', 'blockquote'],
              [
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript"
              ],
              ["fontColor", "hiliteColor"],
              ["align", "list", "lineHeight"],
              ["outdent", "indent"],
              ["table", "horizontalRule", "link", "image", "video"],
              ["fullScreen", "showBlocks", "codeView"],
              ["preview", "print"],
              ["removeFormat"]
              // ['save', 'template'],
              // '/', Line break
            ], // Or Array of button list, eg. [['font', 'align'], ['image']]
            defaultTag: "div",
            minHeight: "300px",
            showPathLabel: false,
            font: this.sortedFontOptions
          }}
        />
      </>
    );
  }
};
export default CustomSunEditor;