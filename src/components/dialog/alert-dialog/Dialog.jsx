import React from 'react';
import PropTypes from 'prop-types';
import './style';

class Dialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleCancel() {
        const { onCancel, onClose } = this.props;
        if (onClose) {
            onClose();
        }
        if (onCancel) {
            onCancel();
        }
    }

    renderContent() {
        const {
            content, centerShow, contentStyle, contentItemClick
        } = this.props;
        if (content && content.length > 0) {
            return (
                <div className='dialog-content'>
                    <ul>
                        {
                            content.map((row, i) => {
                                const keyStr = `dialog-row-${i}`;
                                return (
                                    <li key={keyStr} className={centerShow ? 'center' : ''} onClick={contentItemClick(row)}>
                                        {
                                            typeof row === 'string' ?
                                                <label className='single' style={contentStyle}>{row}</label> :
                                                row.map(item => <label key={`item-${item}`}>{item}</label>)
                                        }
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            );
        }
        return null;
    }

    render() {
        const {
            className, children, title, confirm, cancel,
            notice, onConfirm, showBtns, mask, isFirstAlert
        } = this.props;
        let maskStyle = 'nomask';
        if (mask) {
            maskStyle = isFirstAlert ? 'mask' : 'notFirstMask';
        }
        return (
            <div className={`dialog ${className}`}>
                <div className={`dialog-bg ${maskStyle}`}>
                    <div className='dialog-wrap'>
                        {
                            title ?
                                (
                                    <div className='dialog-title'>
                                        <label>{title}</label>
                                    </div>
                                ) :
                                null
                        }
                        {this.renderContent()}
                        {children}
                        <div className='dialog-notice' style={{ display: notice ? null : 'none' }}>
                            <label>{notice}</label>
                        </div>
                        {
                            showBtns ?
                                (
                                    <div className='dialog-btns'>
                                        <div className='dialog-cancel' style={{ display: cancel ? null : 'none' }}>
                                            <button type='button' onClick={this.handleCancel}>{cancel}</button>
                                        </div>
                                        <div className='dialog-confirm'>
                                            <button type='button' onClick={() => { onConfirm(); }}>{confirm}</button>
                                        </div>
                                    </div>
                                ) : null
                        }

                    </div>
                </div>
            </div>
        );
    }
}

Dialog.defaultProps = {
    className: '',
    children: null,
    content: [],
    contentItemClick: () => {},
    title: '提示',
    confirm: '确定',
    onConfirm: () => {},
    cancel: '取消',
    onCancel: () => {},
    mask: true,
    showBtns: true,
    onClose: () => {},
    notice: '',
    centerShow: false,
    contentStyle: null,
    isFirstAlert: true,
};

Dialog.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    // 弹窗内容
    content: PropTypes.array,
    // 点击弹窗内容中具体某一条
    contentItemClick: PropTypes.func,
    // 标题
    title: PropTypes.string,
    // 确认按钮文字
    confirm: PropTypes.string,
    // 确认按钮点击回调
    onConfirm: PropTypes.func,
    // 取消按钮文字
    cancel: PropTypes.string,
    // 取消按钮点击回调
    onCancel: PropTypes.func,
    // 是否显示半透明背景
    mask: PropTypes.bool,
    // 是否显示底部按钮
    showBtns: PropTypes.bool,
    // 关闭弹窗是调用
    onClose: PropTypes.func,
    // 底部提示语
    notice: PropTypes.string,
    // 内容是否居中显示
    centerShow: PropTypes.bool,
    // 内容样式
    contentStyle: PropTypes.object,
    // 是否是页面第一个弹窗
    isFirstAlert: PropTypes.bool,
};

export default Dialog;
