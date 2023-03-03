const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f7405bb471mshd0743285be682f2p1aecacjsncf8b70e2b390',
		'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
	}
};

fetch('https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation?query=mumbai', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));