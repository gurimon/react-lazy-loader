import React from 'react';
import LazyLoader from './loader';

const LazyLoad = React.createClass({
  getDefaultProps() {
    return {
      src:  "",
    }
  },

  getInitialState() {
    return {
      src:      null,
      isLoaded: false,
      isError:  false,
    }
  },

  componentDidMount() {
    const src = this.props.src;
    // 要素の位置取得
    const sTop = this.getDOMNode().getBoundingClientRect().top || 0;

    // 既に読み込まれていたら
    const isChash = LazyLoader.chash.indexOf(src) >= 0;
    if(isChash) return this._onLoad({ src });
    LazyLoader.createLoader({ src, sTop, callback: this._onLoad });
  },

  // コンポーネントが削除された場合、遅延読み込みをリセット
  componentWillUnmount() {
    LazyLoader.clearLoader();
  },

  _onLoad({ src }) {
    this.setState({ src });
  },

  loadHandler() {
    this.setState({ isLoaded: true });
  },

  errorHander() {
    this.setState({ isError: true, isLoaded: true });
  },

  render() {
    const style = {
      width: '25%',
      maxWidth: '200',
      margin: '-25% auto',
      top: '75%',
      left: '0',
      right: '0'
    };

    if(!this.state.src) return <img style={style} src="./images/loading.gif" />;

    return (
      <div className="lazyLoader">
        {!this.state.isError ?
          <img onLoad={this.loadHandler} onError={this.errorHander} src={this.state.src} />
        : null}
      </div>
    )
  }
});

export default LazyLoad;
