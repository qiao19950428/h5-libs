import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';

export default class SeparateLine extends Component {
    constructor(props) {
        super(props);
        this.getHeight = this.getHeight.bind(this);
    }

    getHeight() {
        return document.getElementsByClassName('separateLine')[0].clientHeight;
    }

    render() {
        const { height, bgColor, className } = this.props;
        return (
            <div
                className={`separateLine ${className}`}
                style={{ height: `${height}px`, backgroundColor: bgColor }}
            />
        );
    }
}

SeparateLine.defaultProps = {
    height: 10,
    bgColor: '#F6F6F6',
    className: '',
};

SeparateLine.propTypes = {
    height: PropTypes.number,
    bgColor: PropTypes.string,
    className: PropTypes.string,
};
