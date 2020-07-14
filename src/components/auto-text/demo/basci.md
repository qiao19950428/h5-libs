```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { AutoText } from 'h5-libs';

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ text: '4542354326546453654' });
        }, 1000);
    }

    render() {
        const { text } = this.state;
        return (
            <div>
                <div style={{ width: '100px' }}>
                    <AutoText text={text} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Demo />, document.getElementById('root'));

```
