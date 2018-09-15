// es6 Promise polyfill
import Promise from 'es6-promise';
import { env } from '../config/env';

const currEnv = env.split(';')[0];
const currHost = env.split(';')[1];
const isNative = window.App; // naitve flag

/**
 * 为Promise扩充done 总是处于回调链最底端 保证抛出任何可能出现的异常
 * @param  {[type]} onFulfilled [description]
 * @param  {[type]} onRejected  [description]
 * @return {[type]}             [description]
 */
Promise.prototype.done = function (onFulfilled) {
  this.then(onFulfilled)
    .catch((reason) => {
      setTimeout(() => {
        throw reason;
      }, 0);
    });
};

const request = (type, url, params, postType) => {
  // http promise flag
  let hasCanceled_ = false;

  const promise = new Promise((resolve, reject) => {
    type = typeof type === 'string' && type.toUpperCase();
    params = params || {};
    // select request type
    if (type === 'GET' && currEnv !== 'native') {
      let p = '?'; // ‘?a=xxx&b=yyy’
      for (const o in params) {
        p += `${o}=${params[o]}&`;
      }
      p = p.slice(0, -1);
      // get & http
      if (currHost.match(/http/g)) {
        url = currHost + url + p;
      }
      // proxy && native 不做任何处理
    } else if (type === 'POST') {
      // post & http
      if (currHost.match(/http/g)) {
        url = currHost + url;
      }
      // proxy && native 不做任何处理
    }

    /**
     * 区分环境执行Request
     */
    const execute = () => {
      if (isNative) {
        const reqBody = {
          url,
          type,
          data: params,
          success: resolve,
          error: reject
        };

        window.$$ && typeof window.$$.Native.request === 'function' && window.$$.Native.request(reqBody);
      } else {
        const handler = function () {
          if (this.readyState !== 4) return;
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject({ hasCanceled_: true, msg: this.statusText });
          }
        };
        const client = new XMLHttpRequest();
        client.open(type, url);
        client.onreadystatechange = handler;
        client.responseType = 'json';

        if (type === 'POST' && !postType) {
          client.setRequestHeader('Content-Type', 'application/json');
          client.send(JSON.stringify(params));
        } else if (type === 'POST' && postType === 'form-data') {
          const form = new FormData();
          for (const o in params) {
            form.append(o, params[o]);
          }
          client.send(form);
        } else {
          client.send(null);
        }
      }
    };

    execute();
  });

  promise.then(data => (hasCanceled_ ? reject({ hasCanceled_: true }) : resolve(data)));

  promise.catch(error => (hasCanceled_ ? reject({ hasCanceled_: true, error }) : reject(error)));

  return {
    promise,
    cancel() {
      hasCanceled_ = true;
    }
  };
};

export default request;
