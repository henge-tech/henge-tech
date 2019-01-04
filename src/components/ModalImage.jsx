import React from 'react';

export default class ModalImage extends React.Component {

  render() {
    if (this.props.word === null) {
      return false;
    }
    const center = this.props.center;
    let imageWidth = 640;
    let imageHeight = 480;
    if (this.props.width < 710) {
        imageWidth = this.props.width * 0.9;
        imageHeight = imageWidth * 0.75;
    }

    const imageContainerStyle = {
        position: 'absolute',
        top: center.y - imageHeight / 2.0,
        left: center.x - imageWidth / 2.0,
        width: imageWidth,
        height: imageHeight,
        zIndex: 1000,
    }

    const imageURL = this.props.word.imageURL(0);

    return (
      <div>
      <div id="modal" onClick={this.props.hideModalImage}></div>
      <div style={imageContainerStyle} onClick={this.props.nextModalImage}>
      <img src={imageURL} className="modal-image"></img>
      <p style={{textAlign: 'center', fontSize: 80, color: 'white'}}>{this.props.word.text}</p>
      </div>
      </div>
    );
  }
}