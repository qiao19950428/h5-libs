import Env from './env';

const replaceStr = str => str.replace(/:/g, '%3A');

const loadURL = (url) => {
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
};

const send = (methodName, parameters) => {
    // android
    if (Env.platform.isAndroid) {
        // eslint-disable-next-line no-undef
        KDS_Native[methodName](...parameters);
    } else if (Env.platform.isiOS) {
        // 将参数中的:替换成%3A
        if (parameters) {
            for (let i = 0; i < parameters.length; i++) {
                parameters[i] = replaceStr(parameters[i]);
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
        loadURL(iosMethod + iosParams);
    } else {
        console.log('pc端');
    }
};

const JSBridge = {
    /**
    *函数功能： openService 调用原生方法跳转到其他第三方（与原生进行交互）
    * @param {String} openSource    业务源，记录跳转的来源，方便追踪业务调试及权限控制，要求字母全大写
    * @param {String} openType      业务跳转或交互类型
    * @param {String} functionCode  确认原生跳转类型的业务跳转页面
    * @param {String} param         给三方业务传参，不需要时可以传””。值的格式为json如：{“stockCode”:”000728”}
    * */
    openService(openSource, openType, functionCode, param) {
        send('openService', [ openSource, openType, functionCode, param ]);
    },
};

/**
 * openService参数说明
 * ” GYDJ_NATIVE”：国元点金
 * ” TRADE_H5”：交易H5
 * “ LEGAL_H5”:法务H5
 * ” BANNER”：营销活动
 * ” ONLINE_BUSINESS”：业务办理
 * ” ONLINE_SERVICE”：在线客服
 * ” INTELLIGENT_VOICE”：智能语音
 * ” FINANCE”：理财商城
 * ” PORTFOLIO”：投资组合
 * ” OPEN_ACCOUNT”：自助开户
 * ” INVESTMENT_LIVE”：投顾直播
 * ” POINTS”：积分商城
 * ” INFORMATION_JY”：资讯（聚源）
 * ” INFORMATION_HEJ”：资讯（华尔街）
 * ” MARKET_DATA_DT”：行情数据（灯塔）
 * ” INFORMATION_YC”:云参
 *
 * openType参数说明
 * “1”：点金原生跳转
 * “2”：三方原生跳转
 * “3”：三方H5跳转
 * “4”：点金H5跳转
 * “5”：三方H5与原生参数交互（非跳转）
 * “6”：点金H5与原生参数交互（非跳转）
 * “7”：三方原生与点金原生参数交互（非跳转）
 */

export default JSBridge;
