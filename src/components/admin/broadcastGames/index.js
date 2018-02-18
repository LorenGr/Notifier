import React from 'react';
import Broadcaster from '../broadcaster/';
import {
    Button,
    Card,
    Icon,
    Input
} from 'antd';

const {TextArea} = Input;

class BroadcastGames extends React.Component {

    constructor() {
        super();
        this.state = {
            games: []
        };
        this.changeGame = this.changeGame.bind(this);
        this.addGame = this.addGame.bind(this);
        this.removeGame = this.removeGame.bind(this);
        this.cleanGames = this.cleanGames.bind(this);
    }

    changeGame(event, index) {
        const games = this.state.games;
        games[index] = {label: event.target.value};
        this.setState({games});
    }

    addGame() {
        const games = this.state.games;
        games.push({label: ''});
        this.setState({games});
    }

    removeGame(index) {
        const games = this.state.games;
        games.splice(index, 1);
        this.setState({games});
    }

    cleanGames() {
        const games = this.state.games.filter(game => game.label != '');
        this.setState({games});
        return games;
    }

    render() {
        const buttonStyle = {
            width: '100%',
            marginTop: '10px'
        }
        const inputRowStyle = {
            display: 'flex',
            marginTop: '5px'
        }

        return (
            <Broadcaster
                onSubmit={() => this.cleanGames()}
                id="games"
                notification="You have new games!"
                {...this.props}
            >
                <Card bordered={false} title="Games">
                    {this.state.games.map((event, index) => {
                        return (<div
                            style={inputRowStyle}
                            key={index}>
                            <Input
                                onChange={evt => this.changeGame(evt, index)}
                                placeholder="Enter name of game."
                                value={this.state.games[index].label}/>
                            <Button
                                style={{marginLeft: '5px'}}
                                shape="circle"
                                type="secondary"
                                icon="minus-circle-o"
                                onClick={() => this.removeGame(index)}
                            />
                        </div>);
                    })}
                    <Button
                        onClick={this.addGame}
                        type="dashed"
                        style={buttonStyle}>
                        <Icon type="plus"/> Add game
                    </Button>
                    <Button
                        style={buttonStyle}
                        htmlType="submit"
                        loading={this.state.loading}
                        type="primary"> Submit games
                    </Button>
                </Card>
            </Broadcaster>
        );
    }
}

export default BroadcastGames;