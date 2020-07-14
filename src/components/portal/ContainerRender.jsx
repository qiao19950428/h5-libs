import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class ContainerRender extends React.Component {
    constructor(props) {
        super(props);
        this.removeContainer = this.removeContainer.bind(this);
        this.renderComponent = this.renderComponent.bind(this);
    }

    componentDidMount() {
        const { autoMount } = this.props;
        if (autoMount) {
            this.renderComponent();
        }
    }

    componentDidUpdate() {
        const { autoMount } = this.props;
        if (autoMount) {
            this.renderComponent();
        }
    }

    componentWillUnmount() {
        const { autoDestroy } = this.props;
        if (autoDestroy) {
            this.removeContainer();
        }
    }

    removeContainer() {
        if (this.container) {
            ReactDOM.unmountComponentAtNode(this.container);
            this.container.parentNode.removeChild(this.container);
            this.container = null;
        }
    }

    renderComponent(props, ready) {
        const {
            visible, getComponent, getContainer, parent
        } = this.props;
        if (visible) {
            if (!this.container) {
                this.container = getContainer();
            }
            ReactDOM.unstable_renderSubtreeIntoContainer(
                parent,
                getComponent(props),
                this.container,
                function callback() {
                    if (ready) {
                        ready.call(this);
                    }
                }
            );
        }
    }

    render() {
        const { children } = this.props;
        return children({
            renderComponent: this.renderComponent,
            removeContainer: this.removeContainer,
        });
    }
}

ContainerRender.defaultProps = {
    autoMount: true,
    autoDestroy: true,
    visible: false,
    parent: null,
};

ContainerRender.propTypes = {
    autoMount: PropTypes.bool,
    autoDestroy: PropTypes.bool,
    visible: PropTypes.bool,
    parent: PropTypes.object,
    getComponent: PropTypes.func.isRequired,
    getContainer: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,

};

export default ContainerRender;
