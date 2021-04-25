import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style';

export default class SubmitButton extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const { onClickButton } = this.props;
        if (onClickButton) {
            onClickButton();
        }
    }

    render() {
        const { text } = this.props;
        return (
            <div className='submit-button'>
                <button className='button' type='button' onClick={this.onClick}>{text}</button>
            </div>
        );
    }
}
SubmitButton.defaultProps = {
    onClickButton: () => {},
    text: '退出当前账号',
};

SubmitButton.propTypes = {
    onClickButton: PropTypes.func,
    text: PropTypes.string,
};
