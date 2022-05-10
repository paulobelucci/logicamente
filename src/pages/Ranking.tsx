import cx from 'classnames';
import { Component } from 'react';

export default class Counter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            counter: 42,
        }
    }

    increment(){
        this.setState({
            counter: this.state.counter + 1
        })
    }

    decrement(){
        this.setState({
            counter: this.state.counter - 1
        })
    }

    reset(){
        this.setState({
            counter: 0
        })
    }

    render() {
        return (
            <>
                <div>
                    <h2 className="counter">{this.state.counter}</h2>
                    <button onClick={() => this.increment()}>Click</button>
                    <button onClick={() => this.decrement()}>Decrement</button>
                    <button onClick={() => this.reset()}>Reset</button>
                </div>


                <style>{`
                    .counter-button {
                        font-size: 1rem;
                        padding: 5px 10px;
                        color:  #585858;
                    }
                `}</style>
            </>
        );
    }
}
