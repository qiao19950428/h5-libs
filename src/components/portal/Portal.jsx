import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Portal extends React.Component {
    constructor(props) {
        super(props);
        this.container = null;
    }

    componentDidMount() {
        this.createContainer();
    }

    componentWillUnmount() {
        this.removeContainer();
    }

    createContainer() {
        const { getContainer } = this.props;
        this.container = getContainer();
        this.forceUpdate();
    }

    removeContainer() {
        if (this.container) {
            this.container.parentNode.removeChild(this.container);
        }
    }

    render() {
        const { children } = this.props;
        if (this.container) {
            return ReactDOM.createPortal(children, this.container);
        }
        return null;
    }
}

Portal.propTypes = {
    getContainer: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Portal;
