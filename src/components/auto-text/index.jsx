import React from 'react';
import PropTypes from 'prop-types';
import './style';

/**
 * 自动调整字体大小组件（在父控件宽度不变的情况下）
 * 目前只支持单行显示
 */
class AutoText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curSize: props.textSize,
        };
        this.curSize = props.textSize;
    }

    componentDidMount() {
        this.autoSize();
    }

    componentWillReceiveProps(nextProps) {
        const { text, textSize } = this.props;
        if (text !== nextProps.text) {
            this.setState({ curSize: textSize });
        }
    }

    componentDidUpdate(prevProps) {
        const { text } = this.props;
        if (prevProps.text !== text) {
            this.autoSize();
        }
    }

    autoSize() {
        const {
            minTextSize, textSizeStep, blankWidth
        } = this.props;
        let { curSize } = this.state;
        const { container } = this;
        if (container) {
            const width = container.parentNode.clientWidth - blankWidth;
            const textWidth = container.clientWidth;
            if (textWidth > width && curSize > minTextSize) {
                curSize -= textSizeStep;
                this.setState({ curSize }, () => {
                    this.autoSize();
                });
            }
        }
    }

    render() {
        const { targetElement, text, className } = this.props;
        const { curSize } = this.state;

        const style = {
            fontSize: curSize,
            display: 'inline-block',
        };

        const TargetWrapper = targetElement;

        return (
            <TargetWrapper className={className} ref={(ele) => { this.container = ele; }} style={style}>
                {text}
            </TargetWrapper>
        );
    }
}

AutoText.defaultProps = {
    className: '',
    text: '',
    textSize: 16,
    minTextSize: 8,
    textSizeStep: 1,
    blankWidth: 0,
    targetElement: 'span',
};

AutoText.propTypes = {
    className: PropTypes.string,
    // 显示文字
    text: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    // 默认字体大小
    textSize: PropTypes.number,
    // 最小字体大小
    minTextSize: PropTypes.number,
    // 每次递减字体大小
    textSizeStep: PropTypes.number,
    // 空白内容宽度
    blankWidth: PropTypes.number,
    // 文字内容的容器
    targetElement: PropTypes.oneOf([ 'div', 'p', 'label', 'span' ]),
};

export default AutoText;
