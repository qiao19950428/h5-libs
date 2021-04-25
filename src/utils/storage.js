
const Config = {
    APP_NAME: 'libs_trade', // 工程名
};
const prefix = Config.APP_NAME;

const Storage = {
    /**
    * 判断是否支持 localStorage
    * 在 safari 隐身模式下不支持 sessionStorage 和 localStorage
    */
    isLocalStorageEnabled() {
        try {
            localStorage.setItem('__testItem__', '_test');
            localStorage.removeItem('__testItem__');
            return true;
        } catch (e) {
            return false;
        }
    },

    /**
    * 判断是否支持 sessionStorage
    * 在 safari 隐身模式下不支持 sessionStorage 和 localStorage
    */
    isSessionStorageEnabled() {
        try {
            sessionStorage.setItem('__testItem__', '_test');
            sessionStorage.removeItem('__testItem__');
            return true;
        } catch (e) {
            return false;
        }
    },

    /**
     * 设置存储数据
     * @param {string} key 键
     * @param {any} value 值
     * @param {bool} isSession 是否使用session
     */
    set(key, value, isSession) {
        if (value || value === 0) {
            value = typeof value === 'string' || typeof value === 'number' ? value : JSON.stringify(value);
        }
        key = `${prefix}_${key}`;
        if (isSession && this.isSessionStorageEnabled()) {
            sessionStorage.setItem(key, value);
        } else if (this.isLocalStorageEnabled()) {
            localStorage.setItem(key, value);
        }
    },

    /**
     * 获取存储数据
     * @param {string} key 键
     * @param {bool} isSession 是否使用session
     */
    get(key, isSession) {
        let value;
        key = `${prefix}_${key}`;
        if (isSession && this.isSessionStorageEnabled()) {
            if (!sessionStorage.getItem(key)) {
                return null;
            }
            value = sessionStorage.getItem(key).indexOf('[') > -1 || sessionStorage.getItem(key).indexOf('{') > -1 ? JSON.parse(sessionStorage.getItem(key)) : sessionStorage.getItem(key).trim();
        } else if (this.isLocalStorageEnabled()) {
            if (!localStorage.getItem(key)) {
                return null;
            }
            value = localStorage.getItem(key).indexOf('[') > -1 || localStorage.getItem(key).indexOf('{') > -1 ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key).trim();
        }
        if (!value && value !== 0) {
            return null;
        }
        try {
            if (typeof value !== 'object') {
                value = JSON.parse(value);
            }
        } catch (e) {
        //
        }
        return value;
    },

    /**
     * 删除存储数据
     * @param {string} key 键
     * @param {bool} isSession 是否使用session
     */
    remove(key, isSession) {
        key = `${prefix}_${key}`;
        if (isSession && this.isSessionStorageEnabled()) {
            sessionStorage.removeItem(key);
        } else {
            localStorage.removeItem(key);
        }
    },
};
export default Storage;
