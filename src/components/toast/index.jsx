import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './style';

class Toast extends React.Component {
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.startCloseTimer = this.startCloseTimer.bind(this);
        this.clearCloseTimer = this.clearCloseTimer.bind(this);
        this.restartCloseTimer = this.restartCloseTimer.bind(this);
    }

    componentDidMount() {
        this.startCloseTimer();
    }

    componentDidUpdate(prevProps) {
        const { duration } = this.props;
        if (duration !== prevProps.duration) {
            this.restartCloseTimer();
        }
    }

    componentWillUnmount() {
        this.clearCloseTimer();
    }

    close() {
        this.clearCloseTimer();
        const { onClose } = this.props;
        if (onClose) {
            onClose();
        }
    }

    startCloseTimer() {
        const { duration } = this.props;
        if (duration) {
            this.closeTimer = setTimeout(() => {
                this.close();
            }, duration * 1000);
        }
    }

    clearCloseTimer() {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
    }

    restartCloseTimer() {
        this.clearCloseTimer();
        this.startCloseTimer();
    }

    render() {
        const { content, mask, size } = this.props;
        const cls = `toast ${mask ? 'mask' : 'nomask'}`;
        return (
            <div className={cls}>
                <div className='toast-notice'>
                    <div className={`toast-notice-content ${size}`}>
                        <div className='toast-text'>{content}</div>
                    </div>
                </div>
            </div>
        );
    }
}

Toast.defaultProps = {
    content: '请稍后...',
    duration: 3,
    onClose: () => {},
    mask: false,
    size: 'big',
};

Toast.propTypes = {
    // 提示内容
    content: PropTypes.string,
    // 自动关闭的延时，单位秒
    duration: PropTypes.number,
    // 关闭后回调
    onClose: PropTypes.func,
    // 是否显示透明蒙层，防止触摸穿透
    mask: PropTypes.bool,
    // 控件尺寸，小还是大。网络请求用大的，平常提示用小的
    size: PropTypes.oneOf([ 'small', 'big' ]),
};

/**
 *
 */
Toast.show = (content, duration, onClose, mask = false) => {
    const div = document.createElement('div');
    div.setAttribute('id', `toast-${new Date().getTime()}`);
    document.body.appendChild(div);
    function remove() {
        ReactDOM.unmountComponentAtNode(div);
        div.parentNode.removeChild(div);
        if (onClose) {
            onClose();
        }
    }
    ReactDOM.render(<Toast
        content={content}
        duration={duration}
        mask={mask}
        onClose={remove}
    />, div);
    return div;
};

/**
 * 显示2秒后自动消失，多用于未输入时提示
 */
Toast.alert = (content, duration = 2) => {
    const div = document.createElement('div');
    div.setAttribute('id', `toast-${new Date().getTime()}`);
    document.body.appendChild(div);
    function remove() {
        ReactDOM.unmountComponentAtNode(div);
        div.parentNode.removeChild(div);
    }
    ReactDOM.render(<Toast
        content={content}
        duration={duration}
        mask={false}
        size='small'
        onClose={remove}
    />, div);
    return div;
};

Toast.hide = (instance) => {
    if (instance) {
        ReactDOM.unmountComponentAtNode(instance);
        instance.parentNode.removeChild(instance);
    }
};

export default Toast;
