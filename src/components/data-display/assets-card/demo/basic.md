```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { AssetCard } from 'h5-libs';

class Demo extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            this.card.setState({
                data: [
                    {
                        hbdm: '0',
                        zjkqs: '500000158.290',
                        zjkys: '500000158.290',
                        zsz: '12166746.970',
                        zzc: '512167005.260'
                    },
                    {
                        hbdm: '1',
                    },
                    {
                        hbdm: '2',
                        zjkqs: '621.540',
                        zjkys: '621.540',
                        zsz: '18432.728',
                        zzc: '19054.268'
                    }
                ]
            });
        }, 1000);
    }

    onConfirm() {
        this.confirm.setState({ visible: false });
    }

    render() {
        return (
            <div>
                <AssetCard ref={(ele) => { this.card = ele; }} type="ptjy" />
            </div>
        );
    }
}

ReactDOM.render(<Demo />, document.getElementById('root'));

```
