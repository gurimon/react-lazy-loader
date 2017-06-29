# react-lazy-loader

If a picture appears in the screen, a picture is read.

> React v15.4.2  
> react-dom v15.4.2

```sh
$ yarn add react-lazy-loader

or

$ npm i -S react-lazy-loader
```

## Usage

```javascript
import LazyLoader from 'react-lazy-loader';

<LazyLoader src={ path } />
```

#### Use with React

```javascript
import React from 'react';
import LazyLoader from 'react-lazy-loader';

const ImageList = props => {
  return (
    <div className="imageList">
      <LazyLoader src="./imageList_1.jpg" />

      <LazyLoader src="./imageList_2.jpg" />

      <LazyLoader src="./imageList_3.jpg" />

      <LazyLoader
        src="./imageList_4.jpg"
        defaultSrc="./imageList_4_1.jpg"
        onClick={ () => this.onClick() }
      />

      <LazyLoader
        src="./imageList_5.jpg"
      >
        <article>
          <h1>image</h1>
          <img src="./imageList_5.jpg" />
          <p>i.m.a.g.e</p>
        </article>
      </LazyLoader>
    </div>
  )
};

export default ImageList;
```

## Props

### src
Type: String Default: null Required: true

### defaultSrc
Type: String Default: null

The picture when failing in reading of a picture.

### style
Type: Object Default: {}

### className
Type: String Default:

### onClick
Type: Func Default: null

## License

MIT
