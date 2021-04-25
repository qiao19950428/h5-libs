import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style';

class MenuListItem extends Component {
    shouldComponentUpdate(nextProps) {
        const { value } = this.props;

        if (nextProps.value !== value) {
            return true;
        }
        return false;
    }

    render() {
        const { title, value } = this.props;

        return (
            <div className='item'>
                <p className='item-title'>{title}</p>
                <p className='item-value'>{value}</p>
            </div>
        );
    }
}

MenuListItem.defaultProps = {
    title: '',
    value: '',
};

MenuListItem.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
};


class MenuList extends Component {
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
            <table className='menu-list'>
                <tbody>
                    {
                        result.map((list, i) => {
                            // 补充
                            if (list.length < colomn) {
                                list.push({ empty: true });
                            }
                            return (
                                <tr className='list' key={i}>
                                    {
                                        list.map((item, key) => (
                                            <td valign='top' key={key} className={item.empty ? `list-item item${key % colomn} empty` : `list-item item${key % colomn}`} onClick={this.onClickItem.bind(this, item)}>
                                                <MenuListItem {...item} />
                                            </td>
                                        ))
                                    }
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>

        );
    }
}
MenuList.defaultProps = {
    colomn: 2, // 列数
    data: [
        { title: '交割单查询' },
        { title: '资金流水' },
        { title: '银证转账' },
        { title: '资金调度' },
        { title: '交割单查询', value: '今日可查询', },
    ],
    onClickItem: () => {}
};
MenuList.propTypes = {
    colomn: PropTypes.number,
    data: PropTypes.array,
    onClickItem: PropTypes.func
};
export default MenuList;
