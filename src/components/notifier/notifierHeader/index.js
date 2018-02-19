import React from 'react';
import Avatar from 'antd/lib/avatar';
import Button from 'antd/lib/button';
import Badge from 'antd/lib/badge';
import {connect} from 'react-redux';

const NotifierHeader = props => (
    <div>
        <Badge count={props.level}
               style={{backgroundColor: '#52c41a'}}>
            <Avatar style={{backgroundColor: 'orange', verticalAlign: 'middle'}}
                    size="large">
                {props.username[0].toUpperCase()}
            </Avatar>
        </Badge>
        <Button onClick={props.onLogout}
                style={{verticalAlign: 'middle', marginLeft: '10px'}}
                shape="circle"
                icon="logout"/>
    </div>
);

function mapStateToParams(state) {
    return {
        username: state.username,
        level: state.level
    }
}

export default connect(mapStateToParams)(NotifierHeader);

