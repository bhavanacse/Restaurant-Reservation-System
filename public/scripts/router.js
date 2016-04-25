Router = Backbone.Router.extend({

	routes : {
		"" : "noCopy",
		"bawarchi" : "bawarchiMessage",
		"turmeric" : "turmericMessage"
	},

	noCopy : function() {
		$('#restaurantInfo').html("");
	},

	bawarchiMessage : function() {
		//$('#restaurantInfo').html("Bawarchi Restaurant information below.");
		//$('#restaurantVacancyInfo').show();
	},

	turmericMessage : function() {
		//$('#restaurantInfo').html("Turmeric Restaurant information below.");
		//$('#restaurantVacancyInfo').show();
	}     
});

//var restaurantRouter = new Router();

//Backbone.history.start();