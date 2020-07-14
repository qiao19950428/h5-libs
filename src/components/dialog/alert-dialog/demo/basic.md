```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { AlertDialog } from 'h5-libs';

class Demo extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            AlertDialog.alert('温馨提示', ['网络请求失败，请稍后再试！']);
            this.confirm.setState({ visible: true });
        }, 1000);
    }

    onConfirm() {
        this.confirm.setState({ visible: false });
    }

    render() {
        return (
            <div>
                <AlertDialog
                    ref={(ele) => { this.confirm = ele; }}
                    title="委托确认"
                    content={[
                        ['证券代码', '000001'],
                        ['证券名称', '平安银行'],
                        ['委托价格', '18.00'],
                        ['委托数量', '100']
                    ]}
                    onConfirm={() => this.onConfirm()}
                    height={50}
                />
            </div>
        );
    }
}

ReactDOM.render(<Demo />, document.getElementById('root'));

```
