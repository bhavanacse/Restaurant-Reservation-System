var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
//var express = require("bootstrap");

//var fs = require("fs");
//var whilApp = require("./models/singleRestaurantModel");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

var restaurants = [{ 
						restaurantID : 1,
						url : "/restaurants/bawarchi",
						restaurantName : "bawarchi",
						link : "bawarchi",
						openingTime : 9,
						closingTime : 21,
						totalCapacity : 30,
						vacancy : {"Apr 9, 2016" : {"10-11" : 0, "11-12" : 0},
			     				  "Apr 10, 2016" : {"10-11" : 10, "13-14" : 14}},
			     		lastBookingDateNTime : new Date() 
			     		//vacancy : "Hello Bawarchi"
				    },
					{ 
						restaurantID : 2,
						url: "/restaurants/turmeric",
						restaurantName : "turmeric",
						link : "turmeric",
						openingTime : 10,
						closingTime : 22,
						totalCapacity: 30,
						vacancy : {"Apr 11, 2016" : {"13-14" : 18, "14-15" : 4, "15-16" : 8, "16-17" : 15},
			     				   "Apr 15, 2016" : {"10-11" : 3, "13-14" : 24}},
						lastBookingDateNTime : new Date() 
						//vacancy : "Hello Turmeric"
					}];
var bookings = [];

var selectedRestaurant = "bawarchi";
var noOfPersons = 10;
var dateAndTime = new Date("April 1, 2016 11:13:00");

var monthsInAYear = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

function getMonthName(number){
	return monthsInAYear[number];
} 

app.use(express.static("./public"));

app.get('/restaurants', function(req, res){

	res.writeHead(200, {"Content-Type" : "text/json"});
	getRestaurants(res);

	function getRestaurants(res){
		var restaurantNames = [];
		for(var i = 0; i < restaurants.length; i++){

			restaurantNames.push({ ID: i, restaurantName : restaurants[i].restaurantName, link : restaurants[i].link});
		}
			//res.writeHead(200, {"Content-Type" : "text/plain"});
		res.end(JSON.stringify(restaurantNames));
			
		//res.end("Hello World");
	}
});

app.put('/bookings', function(req, res){

	//console.log("I am in post method of Server");
	if(!req.body.hasOwnProperty('personName') ||
	   !req.body.hasOwnProperty('totalMembers') ||
	   !req.body.hasOwnProperty('bookingDateNTime') ||
	   !req.body.hasOwnProperty('comments')||
	   !req.body.hasOwnProperty('restaurantID')){
		res.statusCode = 400;
		return res.end("Error 400 : Post Syntax incorrect.");
	}

	var newPersonName = req.body.personName;
	var newPersonsCount = parseInt(req.body.totalMembers);
	var newDateNTime = req.body.bookingDateNTime;
	var newComments = req.body.comments;
	var existingrestaurantID = req.body.restaurantID;
	
	var newBooking = { personName : newPersonName, 
					   totalMembers : newPersonsCount, 
					   bookingDateNTime : newDateNTime, 
					   comments : newComments, 
					   restaurantID :  existingrestaurantID};	

	bookings.push(newBooking);

	//console.log(JSON.stringify(bookings));

	updateVacancyInfo(existingrestaurantID, newPersonsCount, newDateNTime);

	res.json(true);
});

app.get('/restaurants/:restaurantName', function(req, res){

	//console.log("Hello, I am here.");
	//console.log(req.params.restaurantName);
	res.writeHead(200, {"Content-Type" : "text/json"});
	getRestaurantVacancy(res);

	function getRestaurantVacancy(res){

		var chosenRestaurant = restaurants.filter(function(item){
			return item.restaurantName === req.params.restaurantName;
		});

		var newVacancyObject = {};

		var date = new Date();

			for(var day = 0; day <= 7; day++){

				var newDate = new Date();
				newDate.setDate(date.getDate() + day);

				var month = getMonthName(newDate.getMonth());
				newDate = month + " " + newDate.getDate() + ", " + dateAndTime.getFullYear();

				newVacancyObject[newDate] = {};
		
				for(slotIndex = 10; slotIndex < 23; slotIndex++){

					var slot = slotIndex + "-" + (slotIndex + 1);

					if(chosenRestaurant[0].vacancy[newDate]){
						if(chosenRestaurant[0].vacancy[newDate][slot]){
							newVacancyObject[newDate][slot] = chosenRestaurant[0].totalCapacity - chosenRestaurant[0].vacancy[newDate][slot];
						} else {
							newVacancyObject[newDate][slot] = chosenRestaurant[0].totalCapacity;
						}
					} else {
						newVacancyObject[newDate][slot] = chosenRestaurant[0].totalCapacity;
					}
				}

		 	}

		//console.log({vacancy : newVacancyObject});

		res.end(JSON.stringify({vacancy : newVacancyObject, restaurantID : chosenRestaurant[0].restaurantID, restaurantName: chosenRestaurant[0].restaurantName}));
	}
});

function updateVacancyInfo(restaurantID, personsCount, dateAndTime){

	var selectedRes = restaurants.filter(function(item){
		return item.restaurantID === restaurantID;
	});

	//console.log(dateAndTime);
	var tempDate = new Date(dateAndTime);
	//console.log(tempDate);
	var month = getMonthName(tempDate.getMonth());
	//console.log(month);
	var givenDate = month + " " + tempDate.getDate() + ", " + tempDate.getFullYear();
	//console.log(givenDate);

	if(!selectedRes[0].vacancy[givenDate]){
		selectedRes[0].vacancy[givenDate] = {};
	}

	var hour = tempDate.getHours();
	var hourString = hour + "-" + (hour + 1);
	
	if(!selectedRes[0].vacancy[givenDate][hourString]){
		if(personsCount <= selectedRes[0].totalCapacity){
			selectedRes[0].vacancy[givenDate][hourString] = personsCount;
			return true;
		} else {
			//selectedRes[0].vacancy[givenDate][hourString] = 0;
			return false;
		}
	} else {
		if ((selectedRes[0].vacancy[givenDate][hourString] + personsCount) <= selectedRes[0].totalCapacity){
			selectedRes[0].vacancy[givenDate][hourString] += personsCount;
			return true;
		} else {
			return false;
		}

	}

	//console.log(JSON.stringify(selectedRes[0].vacancy));
}

http.createServer(app).listen(3000);

/*
http.createServer(function(req, res){

	//if(req.url === "/"){
		//res.writeHead(200, {"Content-Type" : "text/json"});
		//res.end(JSON.stringify(restaurants));
	//}
	//res.writeHead(200, {"Content-Type" : "text/plain"});
	//res.end("Hello World");

	if(req.url === "/"){

		fs.readFile("./index.html", function(err, html){
			if(err){
				console.log("Error: Not able to read index.html file.");
			}
			res.writeHead(200, {"Content-Type" : "mimeType"});
			res.end(html);
		});
	} else if (req.url === "/restaurants"){

		res.writeHead(200, {"Content-Type" : "text/json"});
		getRestaurants();
	} //else if (req.method === "POST"){
	else if (req.url === `/restaurants/bawarchi`){
		res.writeHead(200, {"Content-Type" : "text/json"});
		updateVacancy(res);
	}
	//else if (req.url === "/restaurants"){
		//res.writeHead(200, {"Content-Type" : "text/json"});
		//res.end(JSON.stringify(restaurants));
	//}
	//else if (req.url === "/restaurants/{restaurantName}"){

	//}
}).listen(3000);
*/

	


