import React from 'react';
import {
    Avatar,
    Button
} from 'antd';
import {connect} from 'react-redux';

const NotifierHeader = props => (
    <div>
        <Avatar style={{backgroundColor: 'orange', verticalAlign: 'middle'}}
                size="large">
            {props.username}
        </Avatar>
        <Button onClick={props.onLogout}
                style={{verticalAlign: 'middle', marginLeft: '10px'}}
                shape="circle"
                icon="logout"/>
    </div>
);

function mapStateToParams(state) {
    return {
        username: state.username
    }
}

export default connect(mapStateToParams)(NotifierHeader);

