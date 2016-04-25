SingleBookingView = Backbone.View.extend({

	el : "#reservationData", 

	template : _.template($('#reservationDataTemplate').html()),

	events : {
		'submit' : 'onSubmit'
	},

	//options : ["restaurantID"],

	/* Not Working 
	initialize : function(options) {
		_.extend(this, _.pick(options, "restaurantID"));	
	},
	
	initialize : function(){
		Backbone.Validation.bind(this);
	},
	*/

	onSubmit : function(e) {
		e.preventDefault();

		console.log("Ur form data is being submitted.");
		var newPersonName = this.$("#personName").val();
		var newPersonsCount = this.$("#personsCount").val();
		var newDateNTime= this.$("#datetimepicker").val();
		var newComments = this.$("textarea").val();

		console.log("Validating...");
		if(newPersonName == "" || newPersonsCount == "" || newDateNTime == "" || newComments == ""){
			$("#myValidationError").html("<h4>Please fill the below details.</h4>");
			return;
		}

		/* Don't Delete this code
		var newSingleBooking = new SingleBooking();
		newSingleBooking.personName = newPersonName;
		newSingleBooking.totalMembers = newPersonsCount;
		newSingleBooking.bookingDateNTime = newDateNTime;
		newSingleBooking.comments = newComments;

		Backbone.Validation.bind(this, {model : newSingleBooking});
		newSingleBooking.bind('validated:invalid', function(newSingleBooking, errors){
			console.log("Stupid Fellow");
			$(".validation-error").html(errors);
			console.log(errors);
		});

		newSingleBooking.bind('validated:valid', function(newSingleBooking){
			console.log("Stupid Fellow");
			$(".validation-error").html("<p></p>");
			//console.log(errors);
			return;
		});
		*/
		
		console.log("Creating new Booking object.");
		var newBookingsCollection = new BookingsCollection(); 

		//newBookingsCollection.add(newSingleBooking);
		console.log("Printing the new Booking object.");
		//this.globalRestaurantNameValue = "";	
		//this.globalRestaurantIDValue = "";
		//console.log(newSingleBooking);	
		newBookingsCollection.create({personName: newPersonName, totalMembers: newPersonsCount, bookingDateNTime: newDateNTime, comments: newComments, restaurantID: globalRestaurantID}, 
		{
			wait : true, 
			success : function(response) {
				
				/*
				if(response){
					//console.log("Response is" + JSON.strinfigy(response));
					$("#myValidationError").html("<h4>Booking successful.</h4>");
					$('#reservationData').hide();
				} else {
					console.log("Response is" + response.updated);
					$("#myValidationError").html("<h4>Booking not successful.Number of persons exceeded the limit.</h4>");
					//$('#reservationData').hide();
				}
				*/
				
				var temporaryRestaurant = new SingleRestaurant();
				// Remove Hard Coding Values for Restaurant Name
				//console.log("Bhavana...What is happening?" + response);
				//console.log("Step4 - " + "/restaurants/" + globalRestaurantName);
				temporaryRestaurant.url = "/restaurants/" + globalRestaurantName;
				temporaryRestaurant.fetch().done(function() {
					$("#myValidationError").html("<h4>Booking successful.</h4>");
					$('#reservationData').hide();
					console.log(temporaryRestaurant.attributes);
					var singleRestaurantInfoView = new SingleRestaurantInfoView({ model : temporaryRestaurant });
					singleRestaurantInfoView.render();
				});
			}
 		});

		/*
		console.log("Updating existing restaurant information.");
		var singleRestaurant = new SingleRestaurant();
		singleRestaurant.lastBookingDateNTime = newDateNTime;
		console.log("Step - 4 " + this.globalRestaurantIDValue);
		singleRestaurant.ID = 1;//this.globalRestaurantIDValue;
		singleRestaurant.url = "/restaurants/:" + this.globalRestaurantIDValue;
		singleRestaurant.save();
		*/
	},

	render : function() {
		//Backbone.Validation.bind(this);
		//this.$el.html(this.template(this.model.toJSON()));
		console.log("Template Printing...");
		//this.el.innerHTML = this.template();
		console.log("Step - 3 " + this.model.restaurantID +  " " + this.model.restaurantName);
		var currentTemplate = this.template(this.model.toJSON());
		this.$el.html(currentTemplate);
		return this;
	}
	
});