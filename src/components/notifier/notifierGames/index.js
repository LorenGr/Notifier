import React from 'react';

import List from 'antd/lib/list';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';

import {connect} from 'react-redux';

const NotifierGames = props => {
    return (
        <List
            dataSource={props.games}
            renderItem={item => (
                <List.Item style={{borderColor: 'rgb(37, 191, 255)'}}>
                    <h2 style={{color: '#82b5ff'}}>
                        <Icon type="star-o" /> {item.label}
                    </h2>
                    <Button ghost type="dashed"
                        style={{
                            position: 'absolute',
                            right: '10px'
                        }}>PLAY</Button>
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