```
import React, { Component } from 'react';
import { MenuImg } from '../../../../libs';
import './index.less';
import buyImg from '../../../assets/img/home/ptjy_buy.png';
import sellImg from '../../../assets/img/home/ptjy_sell.png';
import removeImg from '../../../assets/img/home/ptjy_remove.png';
import queryImg from '../../../assets/img/home/ptjy_query.png';
import positionImg from '../../../assets/img/home/ptjy_position.png';

const menuImgData = [
    { image: buyImg, title: '买入' },
    { image: sellImg, title: '卖出' },
    { image: removeImg, title: '撤单' },
    { image: queryImg, title: '查询' },
    { image: positionImg, title: '持仓' },
];

export default class Index extends Component {
    handleClick(title) {
        console.log(title);
    }

    render() {
        return (
            <div className='home'>
                <MenuImg data={menuImgData} handleClick={this.handleClick} />
            </div>
        );
    }
}

```