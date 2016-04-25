SingleRestaurantInfoView = Backbone.View.extend({

	el : '#restaurantInfo',

	template : _.template($("#restaurantInfoTemplate").html()),

	events : {
		'click #btnbookReservation' : 'bookReservation'
	},

	render : function(){
		console.log(this.model.toJSON());
		globalRestaurantID = this.model.toJSON().restaurantID;

		console.log("Step - 1 " + globalRestaurantID + " " + globalRestaurantName);
		var vacancy = this.model.toJSON().vacancy;
		//console.log(vacancy);
		//var vacancyDates = this.model.vacancy;
		//console.log(vacancyDates);
		
		/*
		for(var date in vacancy){
			console.log(date);
			this.$el.append("<p>" + date + " : Slots available at ===</p> ");	
			for(var time in vacancy[date]){
				console.log(time + " : " + vacancy[date][time] );
				this.$el.append("<p>" + time + " : " + vacancy[date][time] + "</p>");
			}
		}
		*/
		
		//var myTemplate = _.template($('#restaurantInfoTemplate').html());
		//console.log(this.model.toJSON());
		var myTemplate = this.template(this.model.toJSON());
		//var myTemplate = this.template(this.model.toJSON());
		//console.log(myTemplate);
		this.$el.html(myTemplate);
		return this;
	},

	bookReservation : function(e){
		console.log("I am in bookReservation event handler.");
		e.preventDefault();
		$("#myValidationError").html("");
		$('#reservationData').show();
		
		//$('#reservationData').show();
		var singleBooking = new SingleBooking();
		singleBooking.restaurantID = globalRestaurantID;
		singleBooking.restaurantName = globalRestaurantName;
		console.log("Step - 2 " + globalRestaurantID + " " + globalRestaurantName);
		//this.globalRestaurantID = "";
		//this.globalRestaurantName = "";
		var singleBookingView = new SingleBookingView({ model : singleBooking });
		console.log(singleBooking);
		singleBookingView.render();
	}

});

