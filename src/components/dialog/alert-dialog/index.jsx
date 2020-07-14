import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Dialog from './Dialog';
import Portal from '../../portal/Portal';
import ContainerRender from '../../portal/ContainerRender';

const IS_REACT_16 = 'createPortal' in ReactDOM;

class AlertDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
            content: props.content,
            notice: props.notice,
        };
        this.getComponent = this.getComponent.bind(this);
        this.getContainer = this.getContainer.bind(this);
    }

    componentDidUpdate() {
        const { visible } = this.state;
        if (!visible && !IS_REACT_16) {
            this.removeContainer();
        }
    }

    componentWillUnmount() {
        if (IS_REACT_16) {
            return;
        }
        const { visible } = this.state;
        if (visible) {
            this.renderComponent({
                visible: false,
            });
        } else {
            this.removeContainer();
        }
    }

    getComponent(extra = {}) {
        const { content, notice } = this.state;
        const { select } = this.props;
        return (
            <Dialog
                ref={(ele) => { this.dialog = ele; }}
                {...this.props}
                {...extra}
                content={content}
                contentItemClick={select}
                notice={notice}
                onClose={() => this.setState({ visible: false })}
                key='dialog'
            />
        );
    }

    getContainer() {
        const container = document.createElement('div');
        container.setAttribute('id', `dialog-${new Date().getTime()}`);
        this.container = container;
        document.body.appendChild(container);
        return container;
    }

    render() {
        const { visible } = this.state;
        if (!IS_REACT_16) {
            return (
                <ContainerRender
                    parent={this}
                    visible={visible}
                    autoDestroy={false}
                    getComponent={this.getComponent}
                    getContainer={this.getContainer}
                >
                    {({ renderComponent, removeContainer }) => {
                        this.renderComponent = renderComponent;
                        this.removeContainer = removeContainer;
                        return null;
                    }}
                </ContainerRender>
            );
        }
        let portal = null;
        if (visible) {
            portal = (
                <Portal getContainer={this.getContainer}>
                    {this.getComponent()}
                </Portal>
            );
        }
        return portal;
    }
}

AlertDialog.propTypes = {
    // 是否显示，只能控制首次显示
    visible: PropTypes.bool,
    // 弹窗内容
    content: PropTypes.array,
    notice: PropTypes.string,
};

AlertDialog.defaultProps = {
    visible: false,
    content: [],
    notice: '',
};

/**
 * 显示弹窗
 * @param {string} title 标题
 * @param {array} content 内容
 * @param {string} confirm 确认按钮文字
 * @param {func} onConfirm 确认按钮点击回调方法
 * @param {string} cancel 取消按钮文字
 * @param {func} onCancel 取消按钮点击回调
 * @param {object} contentStyle 内容样式
 */
AlertDialog.alert = (title, content, confirm = '确定', onConfirm, cancel = '', onCancel, contentStyle) => {
    const div = document.createElement('div');
    div.setAttribute('id', `dialog-wrapper-${new Date().getTime()}`);
    document.body.appendChild(div);
    // 用于判断是否修改mask背景的透明度
    const dialogs = document.getElementsByClassName('dialog');

    function close(status) {
        const func = status === 'confirm' ? onConfirm : onCancel;
        ReactDOM.unmountComponentAtNode(div);
        if (div && div.parentNode) {
            div.parentNode.removeChild(div);
        }
        if (func) {
            func();
        }
    }

    function select(row) {
        console.log(row);
    }

    ReactDOM.render(
        <AlertDialog
            visible
            title={title}
            content={content}
            select={() => select()}
            onConfirm={() => close('confirm')}
            confirm={confirm}
            cancel={cancel}
            onCancel={() => close()}
            contentStyle={contentStyle}
            isFirstAlert={!(dialogs.length > 0)}
        />,
        div
    );
};

AlertDialog.error = (title, content, confirm = '确定', onConfirm) => {
    const div = document.createElement('div');
    div.setAttribute('id', `dialog-wrapper-${new Date().getTime()}`);
    document.body.appendChild(div);
    // 用于判断是否修改mask背景的透明度
    const dialogs = document.getElementsByClassName('dialog');

    function close() {
        ReactDOM.unmountComponentAtNode(div);
        if (div && div.parentNode) {
            div.parentNode.removeChild(div);
        }
        if (onConfirm) {
            onConfirm();
        }
    }

    ReactDOM.render(
        <AlertDialog
            className='error'
            visible
            title={title}
            content={content}
            onConfirm={() => close()}
            confirm={confirm}
            cancel=''
            isFirstAlert={!(dialogs.length > 0)}
        />,
        div
    );
};

// 网络错误类型弹窗，限制只弹一次
AlertDialog.network = (title, content, confirm = '确定', onConfirm) => {
    const div = document.createElement('div');
    div.setAttribute('id', `dialog-wrapper-${new Date().getTime()}`);
    document.body.appendChild(div);
    // 用于判断是否修改mask背景的透明度
    const dialogs = document.getElementsByClassName('dialog network');

    function close() {
        ReactDOM.unmountComponentAtNode(div);
        if (div && div.parentNode) {
            div.parentNode.removeChild(div);
        }
        if (onConfirm) {
            onConfirm();
        }
    }
    if (dialogs.length === 0) {
        ReactDOM.render(
            <AlertDialog
                className='network'
                visible
                title={title}
                content={content}
                onConfirm={() => close()}
                confirm={confirm}
                cancel=''
            />,
            div
        );
    }
};

export default AlertDialog;
