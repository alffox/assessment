import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App.js';
import JSUsersHeader from "../modules/JSUsersHeader.js";
import JSUsersTable from "../modules/JSUsersTable.js";
import JSCreateUser from "../modules/JSCreateUser.js";


describe('App', () => {
    test('snapshot renders', () => {
        const component = renderer.create(<App />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('JSUsersHeader', () => {
    test('snapshot renders', () => {
        const component = renderer.create(<JSUsersHeader />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('JSUsersTable', () => {
    test('snapshot renders', () => {
        const component = renderer.create(<JSUsersTable />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('JSCreateUser', () => {
    test('snapshot renders', () => {
        const component = renderer.create(<JSCreateUser />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});