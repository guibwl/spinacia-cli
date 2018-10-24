import './scrollingelement';

const preventBgScroll = () => {

  if(!window.OSTMASK_BODY_SCROLL_LOCKED_POSITION_FIXED){
    window.OSTMASK_BODY_SCROLL_LOCKED_POSITION_FIXED = [];
  }

  return {
    afterOpen: () => {
      if (!window.OSTMASK_BODY_SCROLL_LOCKED_POSITION_FIXED.length) {
        updataScrollState().lock();
      }

      window.OSTMASK_BODY_SCROLL_LOCKED_POSITION_FIXED.push('0');

    },
    beforeClose: () => {
      window.OSTMASK_BODY_SCROLL_LOCKED_POSITION_FIXED.pop();

      if (!window.OSTMASK_BODY_SCROLL_LOCKED_POSITION_FIXED.length) {
        updataScrollState().release();
      }

    }
  }
}

let _scrollTop = null;

const updataScrollState = () => {

  return {
    lock: () => {

      _scrollTop = document.scrollingElement.scrollTop;
      document.body.style.top = -_scrollTop + 'px';
      document.body.style.width = '100%';
      document.body.style.position = 'fixed';
    },
    release: () => {

      // scrollTop lost after set position:fixed, restore it back.
      document.body.style.position = null;
      document.body.style.top = null;
      document.scrollingElement.scrollTop = _scrollTop;
    }
  }
}

export default preventBgScroll;
