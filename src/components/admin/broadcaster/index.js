import React from 'react';
import Form from 'antd/lib/form';

const base = String(API_URL);

class Broadcaster extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: false
        };
        this.broadcast = this.broadcast.bind(this);
    }

    broadcast(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.state.loading) return false;
        this.setState({loading: true});
        fetch(base + '/broadcast', {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify([
                {
                    type: this.props.id,
                    data: this.props.onSubmit(this.props.id),
                    notification: this.props.notification
                }
            ]),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(data => {
                this.setState({loading: false})
            }
        );

    }

    render() {
        return (
            <Form onSubmit={this.broadcast}>
                {this.props.children}
            </Form>
        );
    }
}

export default Broadcaster;