

import Env from './env';

const JSBridge = {
    // 需要将参数中的冒号改成%3A的原生方法的名字
    handleFuncArr: [ 'openService' ],

    // 把字符串中的“：”替换成“%3A”
    replaceStr: str => str.replace(/:/g, '%3A'),

    loadURL: (url) => {
        let iFrame;
        iFrame = document.createElement('iframe');
        iFrame.setAttribute('src', url);
        iFrame.setAttribute('style', 'display:none;');
        iFrame.setAttribute('height', '0px');
        iFrame.setAttribute('width', '0px');
        iFrame.setAttribute('frameborder', '0');
        document.body.appendChild(iFrame);
        // 发起请求后这个iFrame就没用了，所以把它从dom上移除掉
        iFrame.parentNode.removeChild(iFrame);
        iFrame = null;
    },

    send: (methodName, parameters) => {
        // android
        if (Env.platform.isAndroid) {
            // eslint-disable-next-line no-undef
            KDS_Native[methodName](...parameters);
        } else if (Env.platform.isiOS) {
            // 将参数中的:替换成%3A
            if (parameters && this.handleFuncName.indexOf(methodName) > -1) {
                for (let i = 0; i < parameters.length; i++) {
                    parameters[i] = this.replaceStr(parameters[i]);
                }
            }
            const iosMethod = `KDS_Native://${methodName}`;

            // 组装参数
            let iosParams = '';
            if (parameters) {
                for (let i = 0; i < parameters.length; i++) {
                    iosParams += `:${parameters[i]}`;
                }
            }
            this.loadURL(iosMethod + iosParams);
        } else {
            console.log('pc端');
        }
    }
};


export default JSBridge;
