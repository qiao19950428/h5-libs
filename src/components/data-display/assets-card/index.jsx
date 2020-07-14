import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style';
import Img from '../../assets/img/common/icon_arrow_down.png';
import ImgTriangle from '../../assets/img/home/icon_triangle.svg';
import MenuList from '../../menu/menu-list';

export default class AssetsCard extends Component {
    constructor(props) {
        super(props);
        const { active } = this.props;
        this.state = {
            active,
            showMore: false,
        };
    }

    onClickAccount() {
        const { onClickAccount } = this.props;
        onClickAccount();
    }

    onClickCurrency(item) {
        const { onClickCurrency } = this.props;
        this.setState({
            active: item
        }, () => {
            onClickCurrency();
        });
    }

    onClickMore() {
        this.setState(state => ({
            showMore: !state.showMore,
        }));
    }

    render() {
        const {
            name, account, currency, allAsset, data
        } = this.props;
        // const { IcEyeOpen, IcEyeClose, IcArrowDown } = this;
        const { active, showMore } = this.state;
        let transForm;
        let moreText;
        let list;
        if (showMore) {
            transForm = {
                transform: 'rotate(180deg)',
            };
            moreText = '收起更多';
            list = <MenuList data={data} />;
        } else {
            transForm = {
                transform: 'rotate(0deg)',
            };
            moreText = '查看更多';
            list = undefined;
        }
        const { title, value } = allAsset;
        return (
            <div className='libs-assets-card'>
                <div className='libs-assets-top'>
                    <div className='info' onClick={() => { this.onClickAccount(); }}>
                        <div className='name'>{name}</div>
                        <div className='account'>
                            {account}
                            <img className='triangle' src={ImgTriangle} />
                        </div>
                    </div>
                    <div className='currency'>
                        {
                            currency.map((item, index) => (
                                <div className='currency-box' key={item.id} onClick={() => { this.onClickCurrency(item); }}>
                                    <span className={`currency-item ${index.toString() === active.id ? 'checked' : 'unChecked'}`}>{item.value}</span>
                                    <div className={`currency-underline ${index.toString() === active.id ? 'show' : 'hidden'}`} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='libs-assets-middle'>
                    <div className='title'>{title}</div>
                    <div className='total'>{value}</div>
                    <div className='more' onClick={() => { this.onClickMore(); }}>
                        <img className='arrow' src={Img} style={transForm} />
                        <span>{moreText}</span>
                    </div>
                </div>
                {list}
            </div>
        );
    }
}

AssetsCard.defaultProps = {
    active: { id: '0', value: '人民币', dec: 'RMB' },
    name: '小乔',
    account: '1818231980',
    allAsset: {
        title: '总资产（HKD）',
        value: '1000000',
    },
    currency: [
        { id: '0', value: '人民币', dec: 'RMB' },
        { id: '1', value: '港币', dec: 'HKD' },
        { id: '2', value: '美元', dec: 'USD' },
    ],
    data: [
        { title: '总市值', value: '1000000' },
        { title: '盈亏', value: '1000000' },
        { title: '可用', value: '1000000' },
        { title: '可取', value: '1000000' },
    ],
    onClickCurrency: () => {},
    onClickAccount: () => {},
};

AssetsCard.propTypes = {
    active: PropTypes.object,
    name: PropTypes.string,
    account: PropTypes.string,
    currency: PropTypes.array,
    allAsset: PropTypes.object,
    data: PropTypes.array,
    onClickCurrency: PropTypes.func,
    onClickAccount: PropTypes.func,
};
