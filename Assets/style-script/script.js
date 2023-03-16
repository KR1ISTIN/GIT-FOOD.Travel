var getData = $("#getDates") //submit button on check in and out
var checkIn = $("#datepicker-1") // check in input
var checkOut = $("#datepicker-2") // check out input
var cityHotel = $("#cityHotel") // gets value in search box for hotels 
var foodButton = $("#food") // food search button 
var hotelColumn = $("#hotelID")
var restaurantColum = $('#restaurantID')
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a42dd3ce69msh49141bfaf24059dp1ee105jsnada054ff001f',
		'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
	}
};
const option = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'a42dd3ce69msh49141bfaf24059dp1ee105jsnada054ff001f',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
};

// *********** Options Exmaple ***********  just for explaination only \\
// if I pass options here as ${options}, I will get [object Object]
// if I pass options here simply as options, I will get the method and headers needed
// console.log(`${options}`); // outputs [object Object]
// console.log(options); // outputs {method: 'GET', headers: {…}} ** aka what we want to see!! **
// *********** Options Exmaple *********** \\


// *********** Nav Bar Timer *********** \\
setInterval(function() {
    $('#navTime').text(dayjs().format(' MMMM D, YYYY h:mm A '));
}, 1000);
// *********** Nav Bar Timer *********** \\

// this is for the burger menu to become active
$(document).ready(function() {
	// Check for click events on the navbar burger icon
	$(".navbar-burger").click(function() {
		// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
		$(".navbar-burger").toggleClass("is-active");
		$(".navbar-menu").toggleClass("is-active");
  
	});
  });

// *********** HIDES BOTH COLUMNS AT START *********** \\
hotelColumn.hide(); // hides hotel column/cards at start
restaurantColum.hide(); // hides restaurant column/cards at start
// *********** HIDES BOTH COLUMNS AT START************** \\


/*these two dates will update the input box with the 
check in and out value so we can use it for 
the hotel fetch parameters, these functions provide the datepicker widget*/
 $(function() { //check in widget
	$("#datepicker-1" ).datepicker({
	dateFormat:"yy-mm-dd", 
	});
 });
 $(function() { //check out widget
	$("#datepicker-2" ).datepicker({
	dateFormat:"yy-mm-dd", 
	}); 
 });

function checkDates(storeHotels) {
	if((storeHotels.checkIn === "") || (storeHotels.checkOut === "" || cityHotel === "")){ // if user does not fill in both widget dates then input box will outline in red
		$("#datepicker-1").addClass("is-danger");
		$("#datepicker-2").addClass("is-danger");
		cityHotel.addClass("is-danger");
	} else {
		$("#datepicker-1").removeClass("is-danger");
		$("#datepicker-2").removeClass("is-danger");
		cityHotel.removeClass("is-danger");
	}
	
	function returnHotel(urlForHotels, params) {
		return fetch(urlForHotels, params)
		.then(function(response) {
			return response.json()
		})
	}
	returnHotel(`https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations?name=${storeHotels.city}&search_type=ALL`, options)
	.then(function(data) {
		// console.log(data) //fetches the city data
		var cityID = data[0].cityID // gets the city ID for each city that the user puts in
		// console.log(cityID) //confirming we attacked right way to access city ID

		var hotelsURL = `https://priceline-com-provider.p.rapidapi.com/v1/hotels/search?date_checkout=${storeHotels.checkOut}&sort_order=HDR&date_checkin=${storeHotels.checkIn}&location_id=${cityID}&star_rating_ids=4.0,5.0%2C5.0&rooms_number=1`;
	
	returnHotel(hotelsURL, options) // this is going to return hotels in the city
	.then(function(hotelListings) {
		// console.log(hotelListings); // will help navigate through array to get values you want

		var id = 1; // is equal to each div hotel card
		for(var i = 0; i < 50; i++) {
			try { // javascript says hey there might be an error here so let's try out this line of code first
				var hotelName = hotelListings.hotels[i].name // logs top 5 hotel // here we write the code that is giving us an error
			} catch(e) { // so if there is an error, we catch the error (e) and do something with it
				// console.log(e) // in this case, we console.log(e) the error so we know what it is and the program can "skip" the error to keep running and not stop here 
				continue
			}
			try {
				var imgURL = hotelListings.hotels[i].media.url; // picture of hotel
		
				// ****** Nigel's Variables ******
				var street = hotelListings.hotels[i].location.address.addressLine1;
				var city = hotelListings.hotels[i].location.address.cityName;
				var state = hotelListings.hotels[i].location.address.provinceCode;
				var zip = hotelListings.hotels[i].location.address.zip
				var hotelInfo = (street + ', ' + city + ', ' + state + ' ' + zip)
				// ****** Nigel's Variables ******
			} catch(e) {
				// console.log(e);
				continue
			}
			$(`#${id}`).children("#img").attr("src", imgURL);
			$(`#${id}`).children("#hotelName").text(hotelName);
			// ****** NIGELS CODE ******
			$(`#${id}`).children("#hotelName").attr("class", "title is-4");
			$(`#${id}`).children("#address").text("Address: " + hotelInfo);
			$(`#${id}`).children("#address").attr("class", "subtitle is-6")
			// ****** Play Around Notes *******
			// TODO Research hotelListings.hotels[i].hotelFeatures.hotelFeatures[i]; mabe can be added in with description?

			// addressInfo.textContent = `${address}, ${city}, ${provinceCode} ${zip}, ${country} (${countryCode})`;
			// ****** NIGELS CODE ******
			id++
		}

	})
	})
	.catch(err => console.error(err));
 }

 
function foodSearch(findFood) {
	restaurantColum.show();
	function returnFood(urlFood, param) {
		return fetch(urlFood, param)
		.then(function(response) {
			return response.json()
		})
	}
	returnFood(`https://travel-advisor.p.rapidapi.com/locations/search?query=${findFood}&offset=0&units=km&currency=USD&sort=relevance&lang=en_US`, option)
	.then(function(foodFindings) { // gives us access to get location ID
		// console.log(foodFindings);
		var locID = foodFindings.data[0].result_object.location_id // gets location ID
		// console.log(locID);

		var restaurantSearch = `https://travel-advisor.p.rapidapi.com/restaurants/list?location_id=${locID}&limit=30&min_rating=4.0&open_now=false&lang=en_US`
		returnFood(restaurantSearch, option) 
		.then(function(foodListings) {
			// console.log(foodListings)
			var id = 6;
			for(var i = 0; i < 20; i++) {
				try { 
					var restaurantNames = foodListings.data[i].name; // restaurant name
				} catch(e) { 
					// console.log(e) 
					continue
				}
				try {
					var foodImg = foodListings.data[i].photo.images.original.url // picture of hotel
				} catch(e) {
					// console.log(e);
					continue
				} try {
					var webLink = foodListings.data[i].website // link to site
				} catch(e) {
					// console.log(e)
					continue
				}
			 
				// console.log(restaurantNames)
				// console.log(foodImg)
				// console.log(webLink)
				$(`#${id}`).children("#foodName").text(restaurantNames);
                $(`#${id}`).children("#img2").attr("src", foodImg);
                $(`#${id}`).children("#link").attr("href", webLink);
				id++
			}
		})
		findFood = $("#findFood").val("");
	})
	.catch(err => console.error(err));
}

getData.on("click", function() {
	hotelColumn.show();
	var searchHotel = cityHotel.val(); // value for search city box for hotels
	var inDate = checkIn.val(); //check in widget value
	var outDate = checkOut.val(); // check out widget value
	var storeHotels = {
		"city": searchHotel,
		"checkIn": inDate,
		"checkOut": outDate,
		
	}
	checkDates(storeHotels);
	saveHotels(storeHotels)


}) 

foodButton.on("click", function() {
	restaurantColum.show();
	var findFood = $("#findFood").val(); // this is targetting the input for food and this is grabbing the value from input
	foodSearch(findFood);
	saveFood(findFood);
}) // when you click on the food search button, the foodSearch function will run 

  


function saveHotels(storeHotels) {
	var arrHotels = JSON.parse(localStorage.getItem("Hotels")) || [];
	if(!arrHotels.includes(storeHotels)) {
		fetch(`https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations?name=${storeHotels.city}&search_type=ALL`, options)
		.then(response => response.json())
		.then(data => {
			if (data.length > 0) {
				storeHotels.cityID = data[0].cityID;
			}
			arrHotels.push(storeHotels);
			localStorage.setItem("Hotels", JSON.stringify(arrHotels));
			showHotels();
			// console.log(arrHotels); // ******  logs city name, check in , check out, city ID ***********
		})
		.catch(err => console.error(err));
	}
}

function showHotels() {
	var arrHotels = JSON.parse(localStorage.getItem("Hotels")) || [];
	$("#hotelBtn").empty();
	for(var i = 0; i < arrHotels.length; i++) {
		var city = arrHotels[i].city;
		var btn = getHotels(city);
		$("#hotelBtn").append(btn)
	}
}
// // working on trying to get local storage buttons when clicked on under favorites, api will be called again
function getHotels(storeHotels){
	var html =  `
	<button class="btn hotelHistory" 
 		onclick="checkDates('${storeHotels.city},${storeHotels.checkIn},${storeHotels.checkOut}')">${storeHotels}</button>`
 	 return $(html);
}


function saveFood(findFood) {
	var dining = JSON.parse(localStorage.getItem("Restaurants")) || [];
	if(!dining.includes(findFood)) {
		dining.push(findFood);
		localStorage.setItem("Restaurants", JSON.stringify(dining))
	
	showDining()
	}
}

function showDining() {
	var dining = JSON.parse(localStorage.getItem("Restaurants")) || [];
	$("#foodBtn").empty();
	for(var i = 0; i < dining.length; i++){
		var city = dining[i];
		var btn = getCity(city)
		$("#foodBtn").append(btn)
	}
}

function getCity(findFood){
	var html =  `
	<button class="btn restaurantHistory" 
		onclick="foodSearch('${findFood}')">${findFood}</button>`
	return $(html);
 }

 showDining()
 showHotels()

   // when the heart icon is clicked on - will continue 
   var hearts = document.querySelectorAll('.heart');
   hearts.forEach((heart) => {
	 heart.addEventListener('click', () => {
	   heart.classList.toggle('clicked');
	   var cardTitle = heart.nextElementSibling.textContent;
 
	   if (heart.classList.contains('clicked')) {
		 localStorage.setItem(cardTitle, true);
	   } else {
		 localStorage.removeItem(cardTitle);
	   }
	//    console.log(localStorage);
	 });
   });


//    ************** NIGELS UPDATE *************
   
//    ************** This function makes it so that it displays the hotels based on the information stored **************
// ************* in the button that is appended to Hotel history in the navbar **************
$(document).ready(function() {
	$('.hotelHistory').on('click', function() {
	  var hotelData = localStorage.getItem('Hotels');
	  hotelData = JSON.parse(hotelData);
	  var city = $(this).text();
	  var hotelInfo = hotelData.find(hotel => hotel.city === city);
	  var searchUrl = `https://priceline-com-provider.p.rapidapi.com/v1/hotels/search?date_checkout=${hotelInfo.checkOut}&sort_order=HDR&date_checkin=${hotelInfo.checkIn}&location_id=${hotelInfo.cityID}&star_rating_ids=4.0,5.0%2C5.0&rooms_number=1`;
	  
	//  console.log(hotelInfo)
	 
	  fetch(searchUrl, options)
		.then(response => response.json())
		.then(hotelListings => {

// console.log(hotelListings) // logs fetch call
var id = 1;
for(var i = 0; i < 50; i++) {
	try {
		var hotelName = hotelListings.hotels[i].name 
	} catch(e) { 
		// console.log(e)
		continue
	}
	try {
		var imgURL = hotelListings.hotels[i].media.url; // picture of hotel

		
		var street = hotelListings.hotels[i].location.address.addressLine1;
		var city = hotelListings.hotels[i].location.address.cityName;
		var state = hotelListings.hotels[i].location.address.provinceCode;
		var zip = hotelListings.hotels[i].location.address.zip
		var hotelInfo = (street + ', ' + city + ', ' + state + ' ' + zip)
		
	} catch(e) {
		// console.log(e);
		continue
	}
	$(`#${id}`).children("#img").attr("src", imgURL);
	$(`#${id}`).children("#hotelName").text(hotelName);
	$(`#${id}`).children("#hotelName").attr("class", "title is-4");
	$(`#${id}`).children("#address").text("Address: " + hotelInfo);
	$(`#${id}`).children("#address").attr("class", "subtitle is-6")

	id++
	$('#hotelID').show()
}
		})
		.catch(error => console.error(error));
	});
  });


  