import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Keyboard from './keyboard';

export default class KeyboardWrap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
        this.container = null;
        this.target = null;
        this.parentId = null;
        this.prevScroll = 0;
        this.scroll = 0;
        this.show = this.show.bind(this);
        this.autoScroll = this.autoScroll.bind(this);
        this.getComponent = this.getComponent.bind(this);
        this.removeContainer = this.removeContainer.bind(this);
        this.getContainer = this.getContainer.bind(this);
        this.renderDialog = this.renderDialog.bind(this);
    }

    componentDidMount() {
        const { visible } = this.state;
        if (visible) {
            this.componentDidUpdate();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { visible } = this.state;
        return visible !== nextState.visible;
    }

    componentDidUpdate() {
        const { visible } = this.state;
        this.renderDialog(visible);
        if (!visible) {
            this.removeContainer();
        }
    }

    componentWillUnmount() {
        this.renderDialog(false);
        this.removeContainer();
    }

    getTop(e) {
        let top = e.offsetTop;
        if (e.offsetParent != null) {
            top += this.getTop(e.offsetParent);
        }
        return top;
    }

    getComponent(visible) {
        const props = { ...this.props };
        [ 'visible', 'onHide' ].forEach((key) => {
            if (Object.keys(props).indexOf(key) >= 0) {
                delete props[key];
            }
        });
        return (
            <Keyboard {...props} visible={visible} onHide={this.removeContainer} />
        );
    }

    getContainer() {
        const { prefixCls } = this.props;
        if (!this.container) {
            const container = document.createElement('div');
            const containerId = `${prefixCls}-container-${(new Date().getTime())}`;
            container.setAttribute('id', containerId);
            document.body.appendChild(container);
            this.container = container;
        }
        return this.container;
    }

    /**
    * 显示自定义键盘
    * @parmas traget 输入框
    * @params parentId 页面容器ID
    */
    show(target, parentId) {
        this.target = target;
        this.parentId = parentId || 'root';
        this.autoScroll(this.target, this.parentId);
        this.setState({ visible: true });
    }

    /**
    * 自动调整输入框位置
    * @parmas traget 输入框
    * @params parentId 页面容器ID
    */
    autoScroll(target, parentId) {
        if (this.target && this.parentId) {
            const keyboardHeight = 200; // 键盘高度
            const parent = document.getElementById(parentId); // 容器
            const offsetTop = this.getTop(target); // 输入框距离顶部高度
            const height = target.clientHeight; // 输入框高度
            const { scrollTop } = parent; // 容器滑动高度
            const screenHeight = Math.max(window.innerHeight, document.documentElement.clientHeight, document.body.clientHeight); // 屏幕高度
            const distance = screenHeight - (offsetTop - scrollTop); // 输入框顶部与屏幕底部距离
            const scroll = keyboardHeight + height - distance; // 输入框底部与键盘顶部的距离
            this.prevScroll = scrollTop;
            this.scroll = scroll;
            this.height = parent.style.height;
            if (scroll > 0) { // 若距离小于键盘高度，则需将容器上滑
                console.log(`容器需上滑高度：${(scrollTop + scroll)}`);
                parent.style.height = `${(screenHeight - keyboardHeight)}px`;
                parent.scrollTop = scrollTop + scroll;
            }
        }
    }

    removeContainer() {
        const { onHide } = this.props;
        this.setState({ visible: false });
        onHide();
        if (this.container) {
            ReactDOM.unmountComponentAtNode(this.container);
            this.container.parentNode.removeChild(this.container);
        }
        this.container = null;
        // 还原容器上滑距离
        if (this.parentId) {
            document.getElementById(this.parentId).style.height = this.height;
            document.getElementById(this.parentId).scrollTop = this.prevScroll;
        }
    }

    renderDialog(visible) {
        ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            this.getComponent(visible),
            this.getContainer(),
        );
    }

    render() {
        return null;
    }
}

KeyboardWrap.defaultProps = {
    prefixCls: 'keyboard',
    onHide: () => {},
    keyboardType: 1,
    animationType: 'slide-up',
    animateAppear: true,
    animationDuration: 0,
    visible: false,
    handleInput: null,
    className: ''
};

KeyboardWrap.propTypes = {
    // 样式前缀名
    prefixCls: PropTypes.string,
    // 隐藏回调函数
    onHide: PropTypes.func,
    // 键盘类型
    keyboardType: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    // 动画类型
    animationType: PropTypes.string,
    // 是否加载动画
    animateAppear: PropTypes.bool,
    // 动画持续时间
    animationDuration: PropTypes.number,
    // 是否可见
    visible: PropTypes.bool,
    handleInput: PropTypes.func,
    // 样式名，用来覆盖
    className: PropTypes.string
};
