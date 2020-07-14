import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style';

class MenuImg extends Component {
    handleClick(item) {
        const { onClickItem } = this.props;
        if (onClickItem) {
            onClickItem(item);
        }
    }

    render() {
        const { data } = this.props;
        return (
            <div className='menu-image'>
                {
                    data.map(function (item, i) {
                        return (
                            <div className='image-box' key={i} onClick={this.handleClick.bind(this, item)}>
                                <img className='image' src={item.image} />
                                <p className='title'>{item.title}</p>
                            </div>
                        );
                    }, this)
                }
            </div>
        );
    }
}

MenuImg.defaultProps = {
    data: [
        {
            image: '../../../img/home/ptjy_buy.svg', title: '买入', width: '20%', url: ''
        },
        {
            image: '../../../img/home/ptjy_sell.svg', title: '卖出', width: '20%', url: ''
        },
        {
            image: '../../../img/home/ptjy_remove.svg', title: '撤单', width: '20%', url: ''
        },
        {
            image: '../../../img/home/ptjy_query.svg', title: '查询', width: '20%', url: ''
        },
        {
            image: '../../../img/home/ptjy_position.svg', title: '持仓', width: '20%', url: ''
        },
    ],
    onClickItem: () => {}
};

MenuImg.propTypes = {
    data: PropTypes.array,
    onClickItem: PropTypes.func
};

export default MenuImg;
