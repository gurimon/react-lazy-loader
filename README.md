# react-lazy-loader

If a picture appears in the screen, a picture is read.

```sh
$ npm i -S react-lazy-loader
```

## Usage

```javascript
// ES2015 imports
import LazyLoader from 'react-lazy-loader';

// ES5 require
var LazyLoader = require('react-lazy-loader');

<LazyLoader src={path} />
```

#### Use with React

```javascript
import React from 'react';
import LazyLoader from 'react-lazy-loader';

const ImageList = React.createClass({
  render() {
    return (
      <div className="imageList">
        <LazyLoader src="./imageList_1.jpg" />

        <LazyLoader src="./imageList_2.jpg" />

        <LazyLoader src="./imageList_3.jpg" />

        <LazyLoader src="./imageList_4.jpg" />

        <LazyLoader src="./imageList_5.jpg" />
      </div>
    )
  }
});

export default ImageList;
```

## Props

### src
Type: String Default: null Required: true

## License

MIT
