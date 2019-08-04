const $ = document;
const action = $.getElementById('action');

action.addEventListener('click', () => {
	/*In this function we search holidays by country that we got*/
	let inputTo = $.getElementById('secondAddress').value;
	let inputFrom = $.getElementById('address').value;

	/*Now we check if user wrote something not good in the input*/
	const regex = /(\\)|(\/)|(\?)/;
	if (regex.test(inputTo) || inputTo === '') {
		//check if we have one of that symbols in input 
		console.log('Error');
		return;
	}
	if (regex.test(inputFrom) || inputFrom === '') {
		//check if we have one of that symbols in input 
		console.log('Error');
		return;	
	}




	/*now we connect SEARCHING API*/
	const placesClient = algoliasearch.initPlaces(
	  'plJEC6ZJ6XFH',
	  '8f8c09c406bc629b85c185f27e8a074a'
	);
	let preferredLanguage = window.navigator.language.split('-')[0];
		placesClient.search({
			 query: inputTo,
			 type: 'city',
			 hitsPerPage: 1,
			 language: preferredLanguage,
		}).then(function(results) {
			 let hits = results.hits;
			 if (!hits[0]) {
			 	return;
			 }
			 /*here we get short name of country*/
			 let country = hits[0].country_code;

			 return country;
		}).then(function(country) {
			/*now when we got short name we can use it for api request in holidays api*/
			holidaysCall(country);
		})
});


/* this function will work with DOM */
const workWithDom = (data) => {
	console.log(data);
	const content = $.getElementById('content');
	const wraperForForm = $.getElementById('wraperForForm');
	wraperForForm.innerHTML = '';
	for (let i = 0; i < data.length; i++) {
		let createBlock = $.createElement('div');
		let title = $.createElement('span');
		let date = $.createElement('span');
		let description = $.createElement('p');

		title.innerHTML = data[i]['name'];
		date.innerHTML = data[i]['date']['iso'];
		description.innerHTML = data[i]['description'];

		createBlock.appendChild(title);
		createBlock.appendChild(date);
		createBlock.appendChild(description);

		wraperForForm.appendChild(createBlock);
	}
	/*const content = $.getElementById('content');
	const wraperForForm = $.getElementById('wraperForForm');


	let createBlock = $.createElement('div');
	let title = $.createElement('span');
	let date = $.createElement('span');
	let description = $.createElement('p');

	title.innerHTML = data['name'];
	date.innerHTML = data['date']['iso'];
	description.innerHTML = data['description'];

	createBlock.appendChild(title);
	createBlock.appendChild(date);
	createBlock.appendChild(description);

	wraperForForm.appendChild(createBlock);*/
}




/* this function will show data on the page */
const showHolidaysOnpage = (data) => {
	const holidays = data['response']['holidays'];
	let departData = $.getElementById('fromData').value;
	let returnData = $.getElementById('toData').value;

	let arrDateDepart = departData.split('-');
	let arrDateReturn = returnData.split('-');
	let departMonthNumberOfInput = parseInt(arrDateDepart[1]);
	let returnMonthNumberOfInput = parseInt(arrDateReturn[1]);

	let departDayNumberOfInput = parseInt(arrDateDepart[2]);
	let returnDayNumberOfInput = parseInt(arrDateReturn[2]);

	if (departData === '' || returnData === '') {
		console.log('lollolololoo');
		return;
	}
	let holidaysArr = [];
	for (let key in holidays) {
		let holidayMonth = holidays[key]['date']['datetime']['month'];
		let holidayDay = holidays[key]['date']['datetime']['day'];
		if (departMonthNumberOfInput <= holidayMonth && holidayMonth <= returnMonthNumberOfInput) {
			if (departDayNumberOfInput <= holidayDay && holidayDay <= returnDayNumberOfInput) {
				/*here we put all holidays that we need in array for next function*/
				holidaysArr.push(holidays[key]);	
			} else {
				console.log('no holidays in thats dates');
			}
		}
	}
	workWithDom(holidaysArr);
	/*console.log(holidaysArr);*/
}


/*this function for holiday api*/
const holidaysCall = (country) => {
	const request = new XMLHttpRequest();
	console.log(country);
	/* holiday api request */
	request.open('GET', `https://calendarific.com/api/v2/holidays?api_key=ebdfdeb8e85af8794b3cffe6ffb73de35d537a9b&country=${country}&year=2019`, true);

	request.onload = function () {
		const data = JSON.parse(this.response);	
		console.log(data);
		if (request.status >= 200 && request.status < 400) {			
			showHolidaysOnpage(data);
		} else {
			console.log('Error 400');
			return;
		}
	}
	request.send();
}