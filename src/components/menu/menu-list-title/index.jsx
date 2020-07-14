import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MenuList from '../menu-list';
import './style';

const Img = require('../../assets/img/home/icon_common.svg');

class MenuListTitle extends PureComponent {
    render() {
        const {
            image, value, data, onClickItem
        } = this.props;
        return (
            <div className='menu-list-title'>
                <div className='title'>
                    <img className='image' src={image} />
                    <span className='value'>{value}</span>
                </div>
                <MenuList
                    data={data}
                    onClickItem={onClickItem}
                />
            </div>
        );
    }
}
MenuListTitle.defaultProps = {
    image: Img,
    value: 'hello',
    // colomn: 2, // 列数
    data: [
        {
            title: '交割单查询',
        },
        {
            title: '资金流水',
        },
        {
            title: '银证转账',
        },
        {
            title: '资金调度',
        },
        {
            title: '交割单查询',
            value: '今日可查询',
        },
    ],
    onClickItem() {}
};

MenuListTitle.propTypes = {
    image: PropTypes.element,
    value: PropTypes.string,
    data: PropTypes.array,
    onClickItem: PropTypes.func,
};
export default MenuListTitle;
