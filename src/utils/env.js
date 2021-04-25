const Env = {
    platform: {
        type: 'PC', // 平台类型
        isiOS: false, // 是否是iOS
        isAndroid: false, // 是否是Android
        isBrower: true, // 是否是pc端
        isMobile: false, // 是否是移动端
    },

    // 判断浏览器
    getBrowserType() {
        console.log('执行getBrowerType');
        const ua = navigator.userAgent.toLowerCase();
        console.log(`ua:${ua}`);

        if (ua.indexOf('android') > -1) {
            this.platform.type = 'Android';
            this.platform.isAndroid = true;
            this.platform.isMobile = true;
        } else if (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1) {
            this.platform.type = 'iOS';
            this.platform.isiOS = true;
            this.platform.isMobile = true;
        }
        return this.platform.type;
    },

    /**
    * 获取屏幕高度
    */
    getScreenHeight() {
        return Math.max(window.innerHeight, document.documentElement.clientHeight, document.body.clientHeight);
    },

    /**
    * 获取屏幕宽度
    */
    getScreenWidth() {
        return Math.max(window.innerWidth, document.documentElement.clientWidth, document.body.clientWidth);
    }
};
Env.getBrowserType();
export default Env;
