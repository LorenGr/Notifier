import React from 'react';
import {
    Card
} from 'antd';
import {connect} from 'react-redux';

const NotifierGames = props => (
    <Card type="inner" title="Games">
        <ul>
            {props.games.map((game, index) => {
                return <li key={index}>{game.label}</li>
            })}
        </ul>
    </Card>
);

function mapStateToParams(state) {
    return {
        games: state.games
    }
}

export default connect(mapStateToParams)(NotifierGames);