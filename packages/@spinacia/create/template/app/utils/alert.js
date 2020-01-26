import { Toast } from 'antd-mobile';

export default {
  info: (text, duration = 5) => {
    Toast.info(text, duration);
  },
  success: (text) => {
    Toast.success(text, 2);
  },
  fail: (text) => {
    Toast.fail(text, 2);
  },
  offline: () => {
    Toast.offline('网络开小差啦！', 2);
  },
  loading: (text) => {
    Toast.loading(text, 0);
  },
  hideToast: () => {
    Toast.hide();
  },
};
