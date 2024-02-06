const { Login } = require('../pageObject/login.page');
const { Navigation } = require('../pageObject/Navigation.js');
const { Projects } = require('../pageObject/Projects');

function instantiatePageObjects(page) {
    return {
        login: new Login(page),
        navigation: new Navigation(page),
        projects: new Projects(page)
    };
}

module.exports = {
    instantiatePageObjects
};
