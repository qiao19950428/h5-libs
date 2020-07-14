import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style';

export default class BottomButton extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const { onClick } = this.props;
        if (onClick) {
            onClick();
        }
    }

    render() {
        const { text, id, className } = this.props;
        return (
            <div id={id} className={className} onClick={this.onClick}>{text}</div>
        );
    }
}
BottomButton.defaultProps = {
    onClick: () => {},
    text: '点击跳转',
    id: 'bottom-button',
    className: 'bottom-button'
};

BottomButton.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string,
    id: PropTypes.string,
    className: PropTypes.string,
};
