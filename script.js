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

  const hearts = document.querySelectorAll('.heart');
  hearts.forEach((heart) => {
	heart.addEventListener('click', () => {
	  heart.classList.toggle('clicked');
	  const cardTitle = heart.nextElementSibling.textContent;
	  if (heart.classList.contains('clicked')) {
		localStorage.setItem(cardTitle, true);
	  } else {
		localStorage.removeItem(cardTitle);
	  }
	  console.log(localStorage);
	});
  });