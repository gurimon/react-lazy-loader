import React from 'react';
import LazyLoader from './loader';
import LoadingElement from './loading-element';

const LazyLoad = React.createClass({
  getDefaultProps() {
    return {
      isLoad:     true,
      src:        "",
      defaultSrc: "",
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
    if(!this.isMounted()) return;
    const src = this.props.src;
    const defaultSrc = this.props.defaultSrc;
    // 要素の位置取得
    const sTop = this.getDOMNode().getBoundingClientRect().top || 0;
    // 既に読み込まれていたら
    const isChash = LazyLoader.chash.indexOf(src) >= 0;
    if(isChash) return this._onLoad({ src });

    LazyLoader.createLoader({ src, dSrc: defaultSrc, sTop, callback: this._onLoad });
  },

  // コンポーネントが削除された場合、遅延読み込みをリセット
  componentWillUnmount() {
    LazyLoader.clearLoader();
  },

  _onLoad({ src }) {
    if(!this.isMounted()) return;
    this.setState({ src });
  },

  loadHandler() {
    if(!this.isMounted()) return;
    this.setState({ isLoaded: true });
  },

  errorHander() {
    if(!this.isMounted()) return;
    this.setState({ isError: true, isLoaded: true });
  },

  render() {
    if(!this.state.src && this.props.isLoad) return <LoadingElement />;

    return (
      <div className="lazyLoader">
        {!this.state.isError && this.state.src ?
          <img onLoad={this.loadHandler} onError={this.errorHander} src={this.state.src} />
        : null}
      </div>
    )
  }
});

export default LazyLoad;
