import ScrollLazyLoader from './ScrollLazyLoader';

const sl = ScrollLazyLoader.initiative();

export default {
  createLoader: sl.createHandler,
  clearLoader: sl.clearLoader,
  chash: ScrollLazyLoader.chash,
};
