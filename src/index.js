
/**
 * LazyLoad
 * 画像遅延読み込み
 * NOTE: findDOMNodeで現在の位置を取得しているので親要素でposition: xxx;を指定してしまうと位置が取得できないので注意してください。
 *
 * import LazyLoad from 'react-lazy-loader/index'
 * <Lazyload src={ 画像パス }>
 * 　　表示したいコンポーネント
 * </LazyLoad>
 */


import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Loader from './loader';

class LazyLoad extends Component {
  constructor(props) {
    super(props);

    this.state = {
      src:      null,
      isLoaded: false,
    }
  }

  componentDidMount() {
    if (this.state.isLoaded) return;
    const { src, defaultSrc } = this.props;
    // 要素の位置取得
    const sTop = findDOMNode(this).offsetTop;
    // 既に読み込まれていたら
    const isChash = Loader.chash.indexOf(src) >= 0;
    if(isChash) return this._onLoad({ src });

    Loader.createLoader({
      src,
      dSrc: defaultSrc,
      sTop,
      callback: (src) => this._onLoad(src)
    });
  }

  // コンポーネントが削除された場合、遅延読み込みをリセット
  componentWillUnmount() {
    Loader.clearLoader();
  }

  _onLoad({ src }) {
    this.setState({ src, isLoaded: true });
  }

  render() {
    return (
      <div
        style={ this.props.style }
        className={ this.props.className ? `lazyload ${this.props.className}` : `lazyload` }
        onTouchTap={ this.props.onClick }
      >
        <div
          className={ this.state.isLoaded
            ?
            `lazyload__inner lazyload__inner--show`
            :
            `lazyload__inner`
          }
        >
          { this.state.src && this.props.children
            ?
            this.props.children
            :
            this.state.src
            ?
            <img src={ this.state.src } />
            :
            null
          }
        </div>
      </div>
    )
  }
};

LazyLoad.propTypes = {
  className : PropTypes.string,
  onClick   : PropTypes.func,
  src       : PropTypes.string,
  defaultSrc: PropTypes.string,
  style     : PropTypes.object
}

LazyLoad.defaultProps = {
  className: '',
  onClick  : null,
  src      : '',
  style    : {},
}

export default LazyLoad;
