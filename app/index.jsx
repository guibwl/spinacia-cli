import React from 'react';
import './style.less';
export default class MyComponent extends React.Component {

  previewFile = () => {
      const preview = this.img;
      const file = this.input.files[0];
      const reader = new FileReader();
      
      if (file) {
          reader.readAsDataURL(file);
      } else {
          preview.src = "";
      }

      reader.onload = function () {
          preview.src = reader.result;
      }
  }

  render() {
    return (
      <div className="App">
        <input type="file" ref={ref => this.input = ref} onChange={this.previewFile} accept="image/*" />
        <br />
        <img src="" ref={ref => this.img = ref} height="100%" alt="Image preview..." /> 
      </div>
    );
  }
}