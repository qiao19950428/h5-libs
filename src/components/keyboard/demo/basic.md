```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { InputKeyBoard } from 'h5-libs';

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleInput = this.handleInput.bind(this);
    }
    
    clickInput() {
        this.keyBoard.show($('#test'));
    }

    handleInput(text) {
        const { value } = this.state;
        this.setState({
            value: `${value}${text}`
        }, () => {
            const { value: latervalue } = this.state;
            this.box.innerHTML = latervalue;
        });
    }
    render() {
        return (
            <div>
                <span
                    id="test"
                    ref={(box) => { this.box = box; }}
                    onClick={() => { this.clickInput(); }}
                    style={{
                        display: 'block',
                        height: '30px',
                        width: '100px',
                        border: '1px solid #000'
                    }}
                />
                <KeyBoard
                    keyboardType="6"
                    ref={(board) => { this.keyBoard = board; }}
                    handleInput={this.handleInput}
                />
            </div>
        );
    }
}

ReactDOM.render(<Demo />, document.getElementById('root'));
```