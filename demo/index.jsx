import React from 'react';
import ReactDOM from 'react-dom';
import { AlertDialogImg } from '../src';
import './main.less';

class Demo extends React.Component {
    componentDidMount() {
        AlertDialogImg.show();
    }

    render() {
        return (
            <div />
        );
    }
}

ReactDOM.render(<Demo />, document.getElementById('root'));
