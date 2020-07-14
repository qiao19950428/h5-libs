import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import AlertDialog from '../alert-dialog';
import successImg from '../../assets/img/common/img_msg_success.png';
import busyImg from '../../assets/img/common/img_msg_noNetwork.png';
import errorImg from '../../assets/img/common/img_msg_defeat.png';
import './style';

class AlertDialogImg extends Component {
    getImg(type) {
        if (type === 'success') {
            return <img className='img' src={successImg} />;
        }
        if (type === 'error') {
            return <img className='img' src={errorImg} />;
        }
        if (type === 'busy') {
            return <img className='img' src={busyImg} />;
        }
    }

    render() {
        const {
            visible, type, text, decDom, confirm, onConfirm
        } = this.props;
        return (
            <AlertDialog
                visible
                title=''
                cancel=''
                confirm={confirm}
                onConfirm={onConfirm}
            >
                <div className='network-dialot-content'>
                    {this.getImg(type)}
                    <p className='text'>{text}</p>
                    <section className='dec'>
                        {decDom}
                    </section>
                </div>
            </AlertDialog>
        );
    }
}

AlertDialogImg.defaultProps = {
    visible: false,
    type: 'busy',
    text: '下单成功',
    decDom: <span />,
    confirm: '确定',
    onConfirm: () => {},
};

AlertDialogImg.propTypes = {
    visible: PropTypes.bool,
    type: PropTypes.string,
    text: PropTypes.string,
    decDom: PropTypes.node,
    confirm: PropTypes.string,
    onConfirm: PropTypes.func,
};


AlertDialogImg.show = (type, text, props) => {
    let div = document.getElementById(`network-dialog-${type}`);
    const {
        decDom, confirm, onConfirm
    } = { props };
    function close(status) {
        const func = status === 'confirm' ? onConfirm : undefined;
        ReactDOM.unmountComponentAtNode(div);
        if (div && div.parentNode) {
            div.parentNode.removeChild(div);
        }
        if (func) {
            func();
        }
    }

    if (div) {
        close();
    }
    div = document.createElement('div');
    div.setAttribute('id', `lock-dialog-${type}`);
    document.body.appendChild(div);

    ReactDOM.render(
        <AlertDialogImg
            visible
            className='network'
            type={type}
            text={text}
            decDom={decDom}
            confirm={confirm}
            onConfirm={() => close('confirm')}
        />,
        div
    );
};

export default AlertDialogImg;
