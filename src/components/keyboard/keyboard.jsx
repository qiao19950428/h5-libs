import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style';

/**
 * TODO: 键盘收起弹出动画待添加,现为直接隐藏
 */
export default class Keyboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyboardType: props.keyboardType, // 键盘类型：1-纯数字键盘；2-带小数点的数字键盘；3-数字字母切换键盘；4-字母键盘；5-股票搜索键盘；6-符号键盘
            shiftOn: false,
        };
        this.keyboardHeight = '200px';
        this.status = 0; // 键盘状态，0为隐藏，1为显示
        this.handleKeyboardClick = this.handleKeyboardClick.bind(this);
        this.bodyClick = this.bodyClick.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.getWordKeyboard = this.getWordKeyboard.bind(this);
        this.getNumberKeyboard = this.getNumberKeyboard.bind(this);
        this.getStockKeyboard = this.getStockKeyboard.bind(this);
        this.getNumberWordKeyboard = this.getNumberWordKeyboard.bind(this);
        this.getKeyboard = this.getKeyboard.bind(this);
    }

    componentDidMount() {
        const { animateAppear, animationType } = this.props;
        if (animateAppear && animationType !== 'none') {
            this.componentDidUpdate({});
        }
        document.body.addEventListener('click', this.bodyClick, false);
        document.body.addEventListener('touchstart', this.bodyClick, false);
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { visible } = this.props;
        const { modalVisible } = this.state;
        if (visible || visible !== nextProps.visible) {
            return true;
        }
        if (nextState) {
            if (nextState.modalVisible !== modalVisible) {
                return true;
            }
        }
        return false;
    }

    componentDidUpdate(prevProps) {
        const { props } = this;
        if (prevProps.visible !== props.visible) {
            this.show(props.visible);
        }
    }

    /**
     * 获取字母键盘
     */
    getWordKeyboard() {
        const { shiftOn } = this.state;
        const shiftOnChar = !shiftOn ? '⇧' : '⇪';

        return (
            <div className='word-table'>
                <div className='line' />
                <ul>
                    <li className='one-width'><button type='button'>{shiftOn ? 'Q' : 'q'}</button></li>
                    <li className='one-width'><button type='button'>{shiftOn ? 'W' : 'w'}</button></li>
                    <li className='one-width'><button type='button'>{shiftOn ? 'E' : 'e'}</button></li>
                    <li className='one-width'><button type='button'>{shiftOn ? 'R' : 'r'}</button></li>
                    <li className='one-width'><button type='button'>{shiftOn ? 'T' : 't'}</button></li>
                    <li className='one-width'><button type='button'>{shiftOn ? 'Y' : 'y'}</button></li>
                    <li className='one-width'><button type='button'>{shiftOn ? 'U' : 'u'}</button></li>
                    <li className='one-width'><button type='button'>{shiftOn ? 'I' : 'i'}</button></li>
                    <li className='one-width'><button type='button'>{shiftOn ? 'O' : 'o'}</button></li>
                    <li className='one-width'><button type='button'>{shiftOn ? 'P' : 'p'}</button></li>
                </ul>
                <div className='clear' />
                <ul>
                    <li className='half-width' />
                    <li><button type='button'>{shiftOn ? 'A' : 'a'}</button></li>
                    <li><button type='button'>{shiftOn ? 'S' : 's'}</button></li>
                    <li><button type='button'>{shiftOn ? 'D' : 'd'}</button></li>
                    <li><button type='button'>{shiftOn ? 'F' : 'f'}</button></li>
                    <li><button type='button'>{shiftOn ? 'G' : 'g'}</button></li>
                    <li><button type='button'>{shiftOn ? 'H' : 'h'}</button></li>
                    <li><button type='button'>{shiftOn ? 'J' : 'j'}</button></li>
                    <li><button type='button'>{shiftOn ? 'K' : 'k'}</button></li>
                    <li><button type='button'>{shiftOn ? 'L' : 'l'}</button></li>
                    <li className='half-width' />
                </ul>
                <div className='clear' />
                <ul>
                    <li className='one-half-width'><button keyType='shift' className='special' type='button'>{shiftOnChar}</button></li>
                    <li><button type='button'>{shiftOn ? 'Z' : 'z'}</button></li>
                    <li><button type='button'>{shiftOn ? 'X' : 'x'}</button></li>
                    <li><button type='button'>{shiftOn ? 'C' : 'c'}</button></li>
                    <li><button type='button'>{shiftOn ? 'V' : 'v'}</button></li>
                    <li><button type='button'>{shiftOn ? 'B' : 'b'}</button></li>
                    <li><button type='button'>{shiftOn ? 'N' : 'n'}</button></li>
                    <li><button type='button'>{shiftOn ? 'M' : 'm'}</button></li>
                    <li className='one-half-width'><button keyType='delete' className='special-delete' type='button' /></li>
                </ul>
                <div className='clear' />
                <ul>
                    <li className='two-half-width'><button keyType='1' className='special' type='button'>123</button></li>
                    <li className='two-half-width'><button keyType='3' className='special' type='button'>#+=</button></li>
                    <li className='four-width'><button keyType='space' className='whitespage' type='button'>空格</button></li>
                    <li className='two-half-width'><button keyType='confirm' className='special' type='button'>确定</button></li>
                </ul>
                <div className='clear' />
            </div>
        );
    }

    /**
     * 获取纯数字键盘
     */
    getNumberKeyboard() {
        return (
            <table className='number-table' cellPadding='0' cellSpacing='0'>
                <tbody>
                    <tr>
                        <td colSpan='4'><div className='lineNormal' /></td>
                    </tr>
                    <tr>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>1</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>2</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>3</button></td>
                        <td rowSpan='3' className='lineWidth del'><button className='btnDelete' keyType='delete' type='button' /></td>
                    </tr>
                    <tr>
                        <td colSpan='3' className='lineWidth'><div className='lineSpacial-graybutton' /></td>
                        <td><div className='lineNormal' /></td>
                    </tr>
                    <tr>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>4</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>5</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>6</button></td>
                    </tr>
                    <tr>
                        <td colSpan='4' className='lineWidth'><div className='lineSpacial-graybutton' /></td>
                    </tr>
                    <tr>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>7</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>8</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>9</button></td>
                        <td rowSpan='3' className='lineWidth cfm'><button className='btnConfirm' keyType='confirm' type='button'>确认</button></td>
                    </tr>
                    <tr>
                        <td colSpan='3' className='lineWidth'><div className='lineSpacial-graybutton' /></td>
                        <td><div className='lineNormal' /></td>
                    </tr>
                    <tr>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button' /></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>0</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button' /></td>
                    </tr>
                </tbody>
            </table>
        );
    }

    getNumberDotKeyboard() {
        return (
            <table className='number-table' cellPadding='0' cellSpacing='0'>
                <tbody>
                    <tr>
                        <td colSpan='4'><div className='lineNormal' /></td>
                    </tr>
                    <tr>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>1</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>2</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>3</button></td>
                        <td rowSpan='3' className='lineWidth del'><button className='btnDelete' keyType='delete' type='button' /></td>
                    </tr>
                    <tr>
                        <td colSpan='3' className='lineWidth'><div className='lineSpacial-graybutton' /></td>
                        <td><div className='lineNormal' /></td>
                    </tr>
                    <tr>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>4</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>5</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>6</button></td>
                    </tr>
                    <tr>
                        <td colSpan='4' className='lineWidth'><div className='lineSpacial-graybutton' /></td>
                    </tr>
                    <tr>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>7</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>8</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>9</button></td>
                        <td rowSpan='3' className='lineWidth cfm'><button className='btnConfirm' keyType='confirm' type='button'>确认</button></td>
                    </tr>
                    <tr>
                        <td colSpan='3' className='lineWidth'><div className='lineSpacial-graybutton' type='button' /></td>
                        <td><div className='lineNormal' /></td>
                    </tr>
                    <tr>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button' /></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>0</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>.</button></td>
                    </tr>
                </tbody>
            </table>
        );
    }

    /**
     * 获取数字字母切换键盘
     */
    getNumberWordKeyboard() {
        return (
            <table className='number-table' cellPadding='0' cellSpacing='0'>
                <tbody>
                    <tr>
                        <td colSpan='4'><div className='lineNormal' /></td>
                    </tr>
                    <tr>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>1</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>2</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>3</button></td>
                        <td rowSpan='3' className='lineWidth del'><button className='btnDelete' keyType='delete' type='button' /></td>
                    </tr>
                    <tr>
                        <td colSpan='3' className='lineWidth'><div className='lineSpacial-graybutton' /></td>
                        <td><div className='lineNormal' /></td>
                    </tr>
                    <tr>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>4</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>5</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>6</button></td>
                    </tr>
                    <tr>
                        <td colSpan='4' className='lineWidth'><div className='lineSpacial-graybutton' /></td>
                    </tr>
                    <tr>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>7</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>8</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>9</button></td>
                        <td rowSpan='3' className='lineWidth cfm'><button className='btnConfirm' keyType='confirm' type='button'>确认</button></td>
                    </tr>
                    <tr>
                        <td colSpan='3' className='lineWidth'><div className='lineSpacial-graybutton' /></td>
                        <td><div className='lineNormal' /></td>
                    </tr>
                    <tr>
                        <td className='lineWidth rightLine'><button keyType='2' className='white-btn' type='button'>abc</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>0</button></td>
                        <td className='lineWidth rightLine'><button keyType='3' className='white-btn' type='button'>#+=</button></td>
                    </tr>
                </tbody>
            </table>
        );
    }

    getStockKeyboard() {
        return (
            <table className='stock-table' cellPadding='0' cellSpacing='0'>
                <tbody>
                    <tr>
                        <td colSpan='5'><div className='lineNormal' /></td>
                    </tr>
                    <tr>
                        <td className='lineWidth rightLine'><button className='special' type='button'>000</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>1</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>2</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>3</button></td>
                        <td rowSpan='3' className='lineWidth del'><button className='btnDelete' keyType='delete' type='button' /></td>
                    </tr>
                    <tr>
                        <td colSpan='4' className='lineWidth'><div className='lineSpacial-graybutton' /></td>
                        <td><div className='lineNormal' /></td>
                    </tr>
                    <tr>
                        <td className='lineWidth rightLine'><button className='special' type='button'>002</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>4</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>5</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>6</button></td>
                    </tr>
                    <tr>
                        <td colSpan='5' className='lineWidth'><div className='lineSpacial-graybutton' /></td>
                    </tr>
                    <tr>
                        <td className='lineWidth rightLine'><button className='special' type='button'>300</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>7</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>8</button></td>
                        <td className='lineWidth rightLine'><button className='white-btn' type='button'>9</button></td>
                        <td rowSpan='3' className='lineWidth cfm'><button className='btnConfirm' keyType='confirm' type='button'>确认</button></td>
                    </tr>
                    <tr>
                        <td colSpan='4' className='lineWidth'><div className='lineSpacial-graybutton' /></td>
                        <td><div className='lineNormal' /></td>
                    </tr>
                    <tr>
                        <td className='lineWidth rightLine'><button className='special' type='button'>600</button></td>
                        <td className='lineWidth rightLine'><button keyType='2' className='white-btn' type='button'>ABC</button></td>
                        <td colSpan='2' className='lineWidth rightLine'><button className='white-btn' type='button'>0</button></td>
                    </tr>
                </tbody>
            </table>
        );
    }

    getSymbolKeyboard() {
        return (
            <table className='symbol-table'>
                <tbody>
                    <tr>
                        <td><button type='button'>!</button></td>
                        <td><button type='button'>@</button></td>
                        <td><button type='button'>#</button></td>
                        <td><button type='button'>$</button></td>
                        <td><button type='button'>%</button></td>
                        <td><button type='button'>^</button></td>
                        <td><button type='button'>&</button></td>
                        <td><button type='button'>*</button></td>
                        <td><button type='button'>(</button></td>
                        <td><button type='button'>)</button></td>
                    </tr>
                    <tr>
                        <td><button type='button'>&acute;</button></td>
                        <td><button type='button'>&quot;</button></td>
                        <td><button type='button'>=</button></td>
                        <td><button type='button'>_</button></td>
                        <td><button type='button'>‘</button></td>
                        <td><button type='button'>:</button></td>
                        <td><button type='button'>;</button></td>
                        <td><button type='button'>?</button></td>
                        <td><button type='button'>~</button></td>
                        <td><button type='button'>|</button></td>
                    </tr>
                    <tr>
                        <td><button type='button'>+</button></td>
                        <td><button type='button'>-</button></td>
                        <td><button type='button'>\</button></td>
                        <td><button type='button'>/</button></td>
                        <td><button type='button'>[</button></td>
                        <td><button type='button'>]</button></td>
                        <td><button type='button'>{'{'}</button></td>
                        <td><button type='button'>{'}'}</button></td>
                        <td colSpan='2'><button className='btnDelete' keyType='delete' type='button' /></td>
                    </tr>
                    <tr>
                        <td colSpan='2'><button keyType='1' className='special' type='button'>123</button></td>
                        <td colSpan='2'><button keyType='2' className='special' type='button'>abc</button></td>
                        <td><button type='button'>,</button></td>
                        <td><button type='button'>.</button></td>
                        <td><button type='button'>{'<'}</button></td>
                        <td><button type='button'>{'>'}</button></td>
                        <td colSpan='2'><button keyType='confirm' className='special' type='button'>确定</button></td>
                    </tr>
                </tbody>
            </table>
        );
    }

    getKeyboard() {
        const { keyboardType } = this.state;
        const type = parseInt(keyboardType, 10);
        let result = null;
        if (type === 1) {
            result = this.getNumberKeyboard();
        } else if (type === 2) {
            result = this.getNumberDotKeyboard();
        } else if (type === 3) {
            result = this.getNumberWordKeyboard();
        } else if (type === 4) {
            result = this.getWordKeyboard();
        } else if (type === 5) {
            result = this.getStockKeyboard();
        } else if (type === 6) {
            result = this.getSymbolKeyboard();
        }
        return result;
    }

    handleKeyboardClick(e = window.event) {
        const { keyboardType, shiftOn } = this.state;
        const { handleInput, keyboardType: normalKeyBoardType } = this.props;
        const target = e.target || e.srcElement;
        if (!target || target.localName !== 'button') {
            return;
        }
        let text = target.innerText;
        // 1-纯数字键盘；2-带小数点的数字键盘；3-数字字母切换键盘；4-字母键盘；5-股票搜索键盘；6-符号键盘
        const keyType = target.getAttribute('keyType');
        // 当前键盘类型
        const type = parseInt(keyboardType, 10);
        // 默认键盘类型
        const prevType = parseInt(normalKeyBoardType, 10);
        if (!keyType) {
            if (type === 3) {
                if (!shiftOn) {
                    text = text.toLowerCase();
                }
            }
        } else if (keyType === '1') { // 切换至 123
            switch (type) {
            case 4: // 字母数字键盘
                if (prevType === 5) {
                    this.setState({ keyboardType: 5 });
                } else {
                    this.setState({ keyboardType: 3 });
                }
                break;
            case 6: // 符号键盘
                this.setState({ keyboardType: 3 });
                break;
            default:
                break;
            }
            return;
        } else if (keyType === '2') { // 切换至 abc
            this.setState({ keyboardType: 4, shiftOn: false });
            return;
        } else if (keyType === '3') { // 切换至 #+=
            if (prevType === 5) {
                this.setState({ keyboardType: 5 });
            } else {
                this.setState({ keyboardType: 6 });
            }
            return;
        } else if (keyType === 'space') { // 空格
            text = ' ';
        } else if (keyType === 'delete') { // 回退
            text = 'del';
        } else if (keyType === 'confirm') { // 确定
            this.hide();
            return;
        } else if (keyType === 'shift') { // 上档
            this.setState({ shiftOn: !shiftOn });
            return;
        }
        if (typeof handleInput === 'function') {
            handleInput(text);
        }
    }

    show(visible) {
        const { animationDuration } = this.props;
        if (visible) {
            // 键盘为显示状态
            if (this.status === 1) {
                return;
            }

            this.status = 1;
            const keyboard = document.getElementById('keyboard');
            keyboard.style.bottom = '0px';
        } else {
            this.hide();
        }
    }

    hide() {
        if (this.status === 0) {
            return;
        }
        const { onHide, animationDuration } = this.props;
        this.status = 0;
        const keyboard = document.getElementById('keyboard');
        keyboard.style.bottom = '0px';
        if (typeof onHide === 'function') {
            onHide();
        }
    }

    /**
     * 外层元素点击事件
     */
    bodyClick(e = window.event) {
        const target = e.target || e.srcElement;
        const keyboardBody = document.getElementById('keyboard');
        let isChild = true;
        if (keyboardBody) {
            isChild = keyboardBody.contains(target);
        }
        if (!isChild) {
            this.hide();
        }
    }

    render() {
        const { className } = this.props;
        return (
            <div id='keyboard' className={`keyboard ${className}`} onClick={this.handleKeyboardClick}>
                {this.getKeyboard()}
            </div>
        );
    }
}

Keyboard.defaultProps = {
    keyboardType: 1,
    animationType: 'slide-up',
    animateAppear: true,
    animationDuration: 0,
    visible: false,
    handleInput: null,
    onHide: () => {},
    className: ''
};
Keyboard.propTypes = {
    // 键盘类型
    keyboardType: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    // 动画类型
    animationType: PropTypes.string,
    // 是否加载动画
    animateAppear: PropTypes.bool,
    // 动画持续时间
    animationDuration: PropTypes.number,
    // 是否可见
    visible: PropTypes.bool,
    handleInput: PropTypes.func,
    // 隐藏回调函数
    onHide: PropTypes.func,
    // 样式名，用来覆盖
    className: PropTypes.string
};
