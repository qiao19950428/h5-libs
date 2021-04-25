import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style';

class MenuCardImgItem extends Component {
    render() {
        const {
            style, title, dec, value
        } = this.props;
        return (
            <div className='card-item' style={style}>
                <p className='card-title'>{title}</p>
                <p className='card-dec'>{dec}</p>
                <p className='card-value'>{value}</p>
            </div>
        );
    }
}
MenuCardImgItem.defaultProps = {
    title: '新股申购',
    dec: '今日新股',
    value: '2只',
    style: {
        // eslint-disable-next-line global-require
        backgroundImage: `url(${require('../../assets/img/home/backgroundImage_xgsg.png').default})`
    }
};
MenuCardImgItem.propTypes = {
    title: PropTypes.string,
    dec: PropTypes.string,
    value: PropTypes.string,
    style: PropTypes.object,
};
class MenuCardImg extends Component {
    onClickItem(item) {
        const { onClickItem } = this.props;
        if (onClickItem) {
            onClickItem(item);
        }
    }

    render() {
        const { colomn, data } = this.props;
        const result = [];
        for (let i = 0; i < data.length; i += colomn) {
            result.push(data.slice(i, i + colomn));
        }
        return (
            <table className='menu-card-img'>
                <tbody>
                    {
                        result.map(list => (
                            <tr className='list'>
                                {
                                    list.map((item, key) => (
                                        <td className={`list-item ${key % colomn}`} key='list-item' onClick={this.onClickItem.bind(this, item)}>
                                            <MenuCardImgItem {...item} />
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }
}

MenuCardImg.defaultProps = {
    colomn: 2, // 列数
    data: [
        {
            title: '新股申购',
            dec: '今日新股',
            value: '2只',
            style: {
                // eslint-disable-next-line global-require
                backgroundImage: `url(${require('../../assets/img/home/backgroundImage_xgsg.png').default})`
            },
            url: '',
        },
        {
            title: '国债理财',
            dec: '14天期',
            value: '4.450%',
            style: {
                // eslint-disable-next-line global-require
                backgroundImage: `url(${require('../../assets/img/home/backgroundImage_gzlc.png').default})`
            },
            url: '',
        }
    ]
};

MenuCardImg.propTypes = {
    colomn: PropTypes.number,
    data: PropTypes.array,
};

export default MenuCardImg;
