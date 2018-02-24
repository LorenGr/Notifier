import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});
import {shallow, mount} from 'enzyme';

import Notifier from '../notifier';
import Login from '../../login';
import {
    loginNotifier,
    logoutNotifier,
    setNewMessages,
    setNewEvents,
    setNewGames
} from '../../actions/';

describe('<Notifier />', () => {
    test("It logs in user", () => {

        const wrapper = shallow(<Notifier logged={true}/>);

        expect(loginForm).toBe({});
    });

});