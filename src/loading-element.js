import React from 'react';

const LoadingElement = React.createClass({
  render() {
    const style = {
      position: 'absolute',
      width:    '25%',
      maxWidth: '200',
      margin:   '-13% auto',
      top:      '50%',
      left:     '0',
      right:    '0'
    };

    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <img style={style} src="./images/loading.gif" />
      </div>
    )
  }
});

export default LoadingElement;
