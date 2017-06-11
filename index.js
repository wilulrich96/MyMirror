'use strict';

var Alexa = require('alexa-sdk');

var APP_ID = 'amzn1.ask.skill.c27dc4fa-e21b-4ac3-905b-d98e83c2f308';

var userDate; //handles day, month, and year
var userTime; //just handles time of day
var userLocation; //just US cities right now because I'm a rock
var userFormalLevel; //black tie or t-shirt?
var lastSuggestions; //last suggestions made by alexa


var handlers = {

    'FindClothing': function () {
		console.log("\nFind Clothing Method");
		userDate = this.event.request.intent.slots.Date.value;
		userLocation = this.event.request.intent.slots.Location.value;
		userTime = this.event.request.intent.slots.Time.value;
		userFormalLevel = this.event.request.intent.slots.FormalLevel.value;
		
		
		//speech helpers
		if(userLocation==null)
		{
			userLocation="New York City";
		}
		if(userDate==null)
		{
			userDate= 'today';
		}

		var hello = 'Hello, ';
		//say hello
		//this.emit(':tell', 'Hi Elle.');
		
		var weatherInfo = userDate + ' in ' + userLocation + ', it is sunny and warm outside.  ';
		var weatherInfo2 = 'Why would I care? I\'m a computer. ';
		
		//clothing info
		var clothesInfo = 'You\'ll be comfortable wearing a summer dress, ' + 
		'tank top and short pants, or a bathing suit.  ';
		
		//information
        this.emit(':tell', hello + weatherInfo + clothesInfo, 
		hello + weatherInfo2 + clothesInfo);

    },
	'BuyClothes': function () {
		console.log("BuyClothes Method");
		console.log(this.context);
		this.emit(':tell', 'Go buy a scarf');
	}

};

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context, callback); 
    alexa.APP_ID = APP_ID;
	//alexa.dynamoDBTableName = 'FashionSession'; // That's it!
	alexa.registerHandlers(handlers);
	alexa.execute();
};