import axios from 'axios';
import { AlertDialog, AlertDialogImg, Toast } from '../components';

const service = axios.create({
    timeout: 60000 // 请求超时时间
});

// loading弹窗
let instance = null;

const isShowLoading = (isShow, loadMsg, loadMask) => {
    if (isShow) {
        // 保证只有一个 loading 显示
        if (instance === null) {
            instance = Toast.show(loadMsg || '请稍后...', null, null, loadMask || false);
        } else {
            Toast.hide(instance);
            instance = Toast.show(loadMsg || '请稍后...', null, null, loadMask || false);
        }
    }
};

const hideLoading = () => {
    if (instance) {
        Toast.hide(instance);
        instance = null;
    }
};

/*
* 根据错误码，返回相应提示
*/
const getErrorText = (request) => {
    let errorText = '';
    let errType = '';
    const { status, statusText } = request;
    switch (status) {
    case 0:
        if (statusText === 'timeout') {
            errorText = '网络离家出走啦~';
            errType = 'busy';
        } else {
            errorText = '网络离家出走啦~';
            errType = 'busy';
        }
        break;
    case 400 || 404:
        errorText = '网络离家出走啦~';
        errType = 'busy';
        break;
    case 404:
        errorText = '网络离家出走啦~';
        errType = 'busy';
        break;
    case 500 || 502:
        errorText = '服务器不给力呀～';
        errType = 'error';
        break;
    case 502:
        errorText = '服务器不给力呀～';
        errType = 'error';
        break;
    default:
        errorText = '网络离家出走啦~';
        errType = 'busy';
    }
    return {
        errorText,
        errType
    };
};


// 请求列表(防重复提交)
const requestList = [];
const { CancelToken } = axios;
service.interceptors.request.use(
    (config) => {
        // 防止重复提交（如果本次是重复操作，则取消，否则将该操作标记到requestList中）
        config.cancelToken = new CancelToken((cancel) => {
            const requestFlag = `${JSON.stringify(config.url) + JSON.stringify(config.data)}&${config.method}`;
            if (requestList.includes(requestFlag)) { // 请求标记已经存在，则取消本次请求，否则在请求列表中加入请求标记
                cancel();// 取消本次请求
            } else {
                requestList.push(requestFlag);
            }
        });

        return config;
    },
    error => Promise.reject(error)
);
service.interceptors.response.use(
    (response) => {
        // 请求返回后，将请求标记从requestList中移除
        const requestFlag = `${JSON.stringify(response.config.url) + JSON.stringify(response.config.data)}&${response.config.method}`;
        requestList.splice(requestList.findIndex(item => item === requestFlag), 1);

        return response;
    },
    (error) => {
        // 置空请求列表
        requestList.length = 0;

        return Promise.reject(error);
    }
);

/*
* 供国元交易使用的数据请求API
* @param module 模式
*/
const Request = (method = 'post', plugin) => function (url, data, options) {
    console.log(`[请求] ${url}`);
    console.log(`[入参] ${JSON.stringify(data)}`);
    // 是否显示加载弹窗、加载内容、加载蒙版、确定回调、失败重发
    const {
        showLoading,
        loadMsg,
        loadMask,
        netErrCallback,
        onConfirm,
        resend
    } = options;
    isShowLoading(showLoading, loadMsg, loadMask);
    return service({
        url,
        data,
        method,
        ...plugin,
    }).catch((err) => {
        // 只执行最后一次请求
        if (Object.prototype.toString.call(err) === '[object Object]') {
            return;
        }
        // 是否使用业务中重新封装的网络错误回调
        if (!netErrCallback) {
            // 网络或服务器出错
            console.log(`[报错] ${JSON.stringify(err.request)}`);
            const { request } = err;
            const { errorText, errType } = getErrorText(request);
            AlertDialogImg.show(errType, errorText);
        }
        return Promise.reject(err);
    }).finally(() => {
        hideLoading();
    });
};

const defaultOptions = {
    showLoading: true,
    loadMask: false,
    resend: false,
    netErrCallback: false, // 网络或服务请求出错自定义错误请求回调
    KDMIDErrCallback: false, // 柜台报错需要自定义错误请求回调
};

// 通用的网络请求
const getRequest = (url, params, options = defaultOptions) => new Promise((resolve, reject) => {
    Request('get')(url, params, options).then((res) => {
        const { data } = res;
        console.log(`[出参] ${JSON.stringify(data)}`);
        resolve(data);
    }).catch((err) => {
        console.log(err);
        reject(err);
    });
});

const postRequest = (url, params, options = defaultOptions) => new Promise((resolve, reject) => {
    Request('post', {
        responseType: 'json',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-cache'
        }
    })(url, params, options).then((res) => {
        const { data } = res;
        console.log(`[出参] ${JSON.stringify(data)}`);
        resolve(data);
    }).catch((err) => {
        console.log(err);
        reject(err);
    });
});

const putRequest = (url, params, options = defaultOptions) => new Promise((resolve, reject) => {
    Request('put', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })(url, params, options).then((res) => {
        const { data } = res;
        console.log(`[出参] ${JSON.stringify(data)}`);
        resolve(data);
    }).catch((err) => {
        console.log(err);
        reject(err);
    });
});

const deleteRequest = (url, params, options = defaultOptions) => new Promise((resolve, reject) => {
    Request('delete')(url, params, options).then((res) => {
        const { data } = res;
        console.log(`[出参] ${JSON.stringify(data)}`);
        resolve(data);
    }).catch((err) => {
        console.log(err);
        reject(err);
    });
});

export {
    Request,
    getRequest,
    postRequest,
    putRequest,
    deleteRequest
};
