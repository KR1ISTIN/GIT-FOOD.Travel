// *********** Nav Bar Timer *********** \\
setInterval(function() {
    $('#navTime').text(dayjs().format(' MMMM D, YYYY h:mm A '));
}, 1000);
// *********** Nav Bar Timer *********** \\


var getData = $("#getDates") //submit button on check in and out
var checkIn = $("#datepicker-1") // check in input
var checkOut = $("#datepicker-2") // check out input

// this is for the burger menu to become active
$(document).ready(function() {
	// Check for click events on the navbar burger icon
	$(".navbar-burger").click(function() {
		// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
		$(".navbar-burger").toggleClass("is-active");
		$(".navbar-menu").toggleClass("is-active");
  
	});
  });



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
 // this function saves the check in and check out date
 var checkDates = function (event) {
	event.preventDefault();
	var inDate = checkIn.val(); //check in widget value
	var outDate = checkOut.val(); // check out widget value
	if((inDate === "") || (outDate === "")){ // if user does not fill in both widget dates then input box will outline in red
		$("#datepicker-1").addClass("is-danger");
		$("#datepicker-2").addClass("is-danger");
	} else {
		$("#datepicker-1").removeClass("is-danger");
		$("#datepicker-2").removeClass("is-danger");
	}
	console.log(inDate);
	console.log(outDate);
	var inDate = checkIn.val("");  // check in and out values are set to a string to clear input boxes are hitting submit
	var outDate = checkOut.val("");
 }
 getData.on("click", checkDates) // when you click on submit button this function runs



  // when the heart icon is clicked on 
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
	  console.log(localStorage);
	});
  });