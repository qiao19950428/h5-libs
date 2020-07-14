import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Env, JSBridge, Storage
} from '../../../utils';
import Keyboard from '../../keyboard';
import './style';

export default class InputBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            value: props.value,
        };
        this.prevScroll = 0;
        this.height = 0;
        this.preValue = props.value;
        this.handleClick = this.handleClick.bind(this);
        this.getStar = this.getStar.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onKeyboardHide = this.onKeyboardHide.bind(this);
        this.onKeyboardClick = this.onKeyboardClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.autoScroll = this.autoScroll.bind(this);
        this.resetScroll = this.resetScroll.bind(this);
        this.showKeyBoard = this.showKeyBoard.bind(this);
        this.hideKeyBoard = this.hideKeyBoard.bind(this);
    }

    componentDidMount() {
        document.body.addEventListener('touchstart', this.onTouchStart, false);
        this.hideKeyBoard();
    }

    componentWillReceiveProps(nextProps) {
        const { value } = this.props;
        if (value !== nextProps.value) {
            this.setState({ value: nextProps.value });
        }
    }

    componentWillUnmount() {
        document.body.removeEventListener('touchstart', this.onTouchStart);
    }

    /**
     * 全局事件监听，用于输入框焦点的设置
     * @param  {Event} e 事件
     */
    onTouchStart(e) {
        const { nativeKeyboard } = this.props;
        const { active } = this.state;
        if (e.target !== this.inputWrapper && e.target !== this.input && active) {
            this.setState({ active: false });
            if (nativeKeyboard) {
                this.hideKeyBoard();
            }
        }
    }

    onKeyboardHide() {
        this.setState({ active: false });
    }

    onKeyboardClick(data) {
        let { value } = this.state;
        const {
            maxLength,
            maxValue,
            decimas,
            onChange
        } = this.props;
        if (data === 'del') {
            value = value.substring(0, value.length - 1);
        } else if (data === 'clean') {
            value = '';
        } else {
            value += data;
        }
        if (decimas !== -1) { // 判断小数位数是否符合要求
            const index = value.indexOf('.');
            if (index > -1 && value.substring(index + 1, value.length).length > decimas) {
                return;
            }
        }
        if (maxValue !== -1) {
            if (parseFloat(value) > parseFloat(maxValue)) {
                return;
            }
        }
        if (maxLength !== -1) {
            if (value.length > Number.parseInt(maxLength)) {
                return;
            }
        }
        this.state.value = value;
        this.setState({ value });
        onChange(value);
    }

    /**
     * 输入框改变事件监听
     * @param  {Event} event
     */
    onChange(event) {
        const { value } = event.target;
        const { onChange } = this.props;
        let input;
        if (this.preValue.length < value.length) {
            input = this.preValue.substr(0, value.length) + value.substr(this.preValue.length);
        } else {
            input = this.preValue.substr(0, value.length);
        }
        this.preValue = input;
        this.state.value = input;
        this.setState({ value: input });
        if (onChange) {
            onChange(input);
        }
    }

    /**
     * 获取指定长度的•，用于密码显示
     * @param  {number} len 长度
     * @return {String}     结果
     */
    getStar(len) {
        let result = '';
        for (let i = 0; i < len; i++) {
            result += '•';
        }
        return result;
    }

    getTop(e) {
        let top = e.offsetTop;
        if (e.offsetParent != null) {
            top += this.getTop(e.offsetParent);
        }
        return top;
    }

    getValue() {
        let { value } = this.state;
        const { unit } = this.props;
        const newReplace = new RegExp(unit, 'g');
        if (unit && typeof value === 'string') {
            value = value.replace(newReplace, '');
        }
        return String(value);
    }

    /**
     * 获取输入框底部距窗口顶部可视距离
     */
    getY() {
        const { pageWrapper } = this.props;
        // 页面容器，不包含标题栏
        const wrapper = document.getElementById(pageWrapper);
        // 输入框距离顶部高度
        const offsetTop = this.getTop(this.inputWrapper);
        // 输入框高度
        const height = this.inputWrapper.clientHeight;
        // 容器滑动高度
        const { scrollTop } = wrapper;
        // 忽略滚动条滑动的距离，控件跟窗口顶部用户直接可见距离
        let y = offsetTop - scrollTop;
        // 输入框底部到页面顶部的高度
        y += height;
        // 显示出输入框下发内容
        // y += 80;
        return y;
    }

    clearValue() {
        this.state.value = '';
        this.setState({ value: '', active: false });
    }

    /**
     * 重置滑动位置
     */
    resetScroll() {
        const { pageWrapper } = this.props;
        const wrapper = document.getElementById(pageWrapper);
        if (this.height && this.prevScroll > 0) {
            wrapper.style.height = this.height;
            wrapper.scrollTop = this.prevScroll;
        }
    }

    /**
     * 调整滑动位置，使输入框不被遮挡
     */
    autoScroll() {
        const { pageWrapper } = this.props;
        // 键盘高度
        const keyboardH = Storage.get('YT_Keyboard_Height') || 200;
        // 页面容器，不包含标题栏
        const wrapper = document.getElementById(pageWrapper);
        // 输入框距离顶部高度
        const offsetTop = this.getTop(this.inputWrapper);
        // 输入框高度
        const height = this.inputWrapper.clientHeight;
        // 容器滑动高度
        const { scrollTop } = wrapper;
        // 输入框顶部与屏幕底部距离
        const distance = Env.getScreenHeight() - (offsetTop - scrollTop);
        // 输入框底部与键盘顶部的距离
        const scroll = keyboardH + height - distance;
        this.prevScroll = scrollTop;
        this.height = wrapper.style.height;
        if (scroll > 0) {
            wrapper.style.height = `${Env.getScreenHeight() - keyboardH}px`;
            wrapper.scrollTop = scrollTop + scroll;
        }
    }


    handleClick(e) {
        const {
            readOnly,
            nativeKeyboard,
            keyboardType,
            onClick
        } = this.props;
        const { active } = this.state;
        if (readOnly) {
            return;
        }
        if (!active) {
            this.setState({ active: true });
        }
        if (nativeKeyboard) {
            // this.autoScroll();
            let y = this.getY();
            if (Env.platform.type === 'Android') {
                y /= Env.getScreenHeight();
            }
            this.showKeyBoard(keyboardType, y, this.onKeyboardClick);
        } else {
            this.keyboard.show(e.target);
        }
        if (onClick) {
            onClick();
        }
    }

    showKeyBoard(type = 1, y = -1, handleKeyboardClick) {
        window.fillInputContent = handleKeyboardClick;
        JSBridge.send('showKeyBoard', [ parseInt(type, 10), y ]);
    }

    // 隐藏自定义键盘
    hideKeyBoard() {
        JSBridge.send('hideKeyBoard');
    }

    render() {
        const { active } = this.state;
        let { value } = this.state;
        const {
            placeholder,
            keyboardType,
            unit,
            type,
            readOnly,
            className,
            inputID,
        } = this.props;
        let input;
        let hint;
        if (value && String(value).length > 0) {
            if (type === 'password') {
                value = this.getStar(value.length);
            }
            if (typeof value === 'string' && value.indexOf(unit) > -1) {
                const newReplace = new RegExp(unit, 'g');
                input = value.replace(newReplace, '') + unit;
            } else {
                input = value + unit;
            }
            hint = false;
        } else {
            if (Env.platform.isMobile) {
                input = placeholder;
            }
            hint = true;
        }
        return (
            <div
                ref={(e) => { this.inputWrapper = e; }}
                id={inputID}
                className={`input-basic ${active ? 'active' : ''} ${className}`}
                onClick={(e) => { this.handleClick(e); }}
            >
                {
                    Env.platform.isMobile ?
                        (
                            <label
                                ref={(e) => { this.input = e; }}
                                className={hint ? 'hint' : 'value'}
                            >
                                {input}
                            </label>
                        ) :
                        (
                            <input
                                type='text'
                                placeholder={placeholder}
                                value={input || ''}
                                readOnly={readOnly}
                                onChange={(e) => { this.onChange(e); }}
                            />
                        )
                }
                <Keyboard
                    ref={(border) => { this.keyboard = border; }}
                    keyboardType={keyboardType}
                    handleInput={(data) => { this.onKeyboardClick(data); }}
                    onHide={() => { this.onKeyboardHide(); }}
                    className={`input-${className}`}
                />
            </div>
        );
    }
}
InputBasic.defaultProps = {
    className: '',
    type: 'text',
    value: '',
    unit: '',
    placeholder: '',
    nativeKeyboard: true, // 是否使用原生键盘
    keyboardType: '2', // 弹出键盘类型（1.纯数字键盘,2.带小数点的数字键盘,3.数字字母切换键盘,4.纯字母键盘,5.带清空按钮键盘10.键盘精灵 ;
    readOnly: false,
    decimas: -1, // 小数位数
    maxLength: -1, // 最大长度
    maxValue: -1, // 最大值
    onClick: () => {},
    onChange: () => {},
    pageWrapper: 'root',
    inputID: `input-${Math.random().toString(36).substr(2, 5)}`,
};

InputBasic.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    unit: PropTypes.string,
    placeholder: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    nativeKeyboard: PropTypes.bool,
    keyboardType: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    readOnly: PropTypes.bool,
    decimas: PropTypes.number, // 小数位数
    maxLength: PropTypes.number, // 最大长度
    maxValue: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]), // 最大值
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    pageWrapper: PropTypes.string, // 页面容器，不包括标题栏
    inputID: PropTypes.string, // 输入框id
};
