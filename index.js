'use strict';

var Alexa = require('alexa-sdk');

var APP_ID = 'amzn1.ask.skill.c27dc4fa-e21b-4ac3-905b-d98e83c2f308';

var userDate; //handles day, month, and year
var userTime; //just handles time of day
var userLocation; //just US cities right now because I'm a rock
var userFormalLevel; //black tie or t-shirt?
var clothesSelected;
var lastSuggestions; //last suggestions made by alexa

var reprompt = 'Do you need anything else from My Mirror?';

var states = {
    //GUESSMODE: '_GUESSMODE', // User is trying to guess the number.
    FASHION_SELECTED: 'FASHION_SELECTED'  // Prompt the user to start or restart the game.
};

//really just for the start
var handlers = {
	
    'FindClothing': findClothingFunc,
	'BuyClothes':  buyClothes,
	'SalesPitch': function ()
	{
		this.emit(":tell", 
		'While its comfy and convenient to just wear the same outfits and styles everyday, the weather is probably not going to let you do that.  ' +
		'Sometimes you might walk out in a pair of leather shoes in the rain, or worse wear a sweater when its 85 degrees. ' + 
		'Where there is rain there is sun, now there is also My Mirror.  Get valuable fashion tips that will keep you trendy, and out of the rain too!');
	},
	'Unhandled': function () {
		this.emit(":tell", 'I did not get that.  Fashion not selected... try again', 'please try again');
	}
};

var fashionSelectedHandlers = Alexa.CreateStateHandler(states.FASHION_SELECTED, {

    'FindClothing': findClothingFunc,
	'BuyClothes': buyClothes,
	'Unhandled': function () {
		this.emit(":tell", 'I did not get that.  Fashion selected... try again');
	}

});

function buyClothes() {
		console.log("BuyClothes Method");
		clothesSelected = this.event.request.intent.slots.ClothesItem.value;
		if(clothesSelected==null)
		{
			this.emit(':tell', 'You must specify the type of clothing in your question');
		}
		this.emit(':tell', 'Brands like Tommy Hillfiger, J.Crew, and H and M' + 
		'are all have sales for ' + clothesSelected);
}
function findClothingFunc () {
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
	'tank top and short pants, or a white shirt.  ';
	//only if successful

	
	this.handler.state = states.FASHION_SELECTED;
	
	//information
	this.emit(':tell', hello + weatherInfo + clothesInfo);
};

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context, callback); 
    alexa.APP_ID = APP_ID;
	//alexa.dynamoDBTableName = 'FashionSession'; // That's it!
	alexa.registerHandlers(handlers);
	alexa.execute();
};