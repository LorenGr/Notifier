import React from 'react';
import {
    List
} from 'antd';
import {connect} from 'react-redux';

const NotifierGames = props => {
    return (
        <List
            dataSource={props.games}
            renderItem={item => (
                <List.Item style={{borderColor: 'rgb(37, 191, 255)'}}>
                    <h2 style={{color: '#82b5ff'}}>
                        {item.label}
                    </h2>
                </List.Item>
            )}
        />
    );
};

function mapStateToParams(state) {
    return {
        games: state.games
    }
}

export default connect(mapStateToParams)(NotifierGames);