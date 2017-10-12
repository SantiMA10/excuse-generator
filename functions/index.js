'use strict';

const functions = require('firebase-functions'),
    i18n = require('i18n'),
	_ = require('lodash'),
    Assistant = require('actions-on-google').DialogflowApp;

const ACTION_GENERATE_EXCUSE = 'generate-excuse';

exports.generateExcuse = functions.https.onRequest((request, response) => {
    const assistant = new Assistant({"request": request, "response": response});

	i18n.configure({
		locales: ['en-US'],
		directory: __dirname + '/../locales',
		defaultLocale: 'en-US'
	});
	i18n.setLocale(assistant.getUserLocale() || 'en-US');

    let generateExcuseHandler = (app) => {

        app.ask(getRandomTranslation(i18n, 'INITIALS') + ' ' + getRandomTranslation(i18n, 'EXCUSES') + ". " + getRandomTranslation(i18n, 'FINALS'));

    };

    const actionMap = new Map();
    actionMap.set(ACTION_GENERATE_EXCUSE, generateExcuseHandler);
    
    assistant.handleRequest(actionMap);
});

function getRandomTranslation(i18n, key){

	return _.sample(i18n.__(key))

}
