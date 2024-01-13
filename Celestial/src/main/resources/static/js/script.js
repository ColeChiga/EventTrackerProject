console.log('script.js loaded');

window.addEventListener('load', function(e) {
	console.log('page loaded, DO complete');
	init();
});

function init() {
	//set up event handlers, load initial data, etc

	loadStarList();
	loadStarTypeForForm();
	document.newStar.submit.addEventListener('click', createStar);
}

//********************************** */
//Star List
//********************************** */

function loadStarList(star) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/stars')
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let starList = JSON.parse(xhr.responseText);
				console.log(starList);
				displayStarList(starList, star);
			}
		}
	}
	xhr.send();
}

function displayStarList(starList, newStar) {
	let tbody = document.getElementById('starListTBody');
	tbody.replaceChildren();
	for (let star of starList) {
		let tr = document.createElement('tr');
		tr.id = "starRow" + star.id;
		tbody.appendChild(tr);
		let td = document.createElement('td');
		td.textContent = star.name;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = star.about;
		tr.appendChild(td);
		td = document.createElement('td');
		tr.appendChild(td);

		tr.addEventListener('click', function(event) {
			console.log(event.target);
			getStarDetails(star);
		});
	}

	if (newStar != null) {
		getStarDetails(newStar);
	}
}

function getStarDetails(star) {
	console.log("getting details for star " + star.id);
	let starDiv = document.getElementById('displayStar');
	starDiv.replaceChildren();

	let h1 = document.createElement('h1');
	h1.textContent = star.name;
	starDiv.appendChild(h1);
	h1 = document.createElement('blockquote')
	h1.textContent = star.about
	starDiv.appendChild(h1);

	let ul = document.createElement('ul');
	ul.id = "starUL";
	h1.appendChild(ul);
	let li = document.createElement('li');
	li.textContent = "age: " + star.age;
	ul.appendChild(li);
	li = document.createElement('li')
	li.textContent = "lifetime: " + star.lifetime;
	ul.appendChild(li);
	li = document.createElement('li')
	li.textContent = "Right Ascension: " + star.ascension;
	ul.appendChild(li);
	li = document.createElement('li')
	li.textContent = "Declination: " + star.declination;
	ul.appendChild(li);
	li = document.createElement('li')
	li.textContent = "Solar Masses: " + star.solarMasses;
	ul.appendChild(li);
	li = document.createElement('li')
	li.textContent = "Luminosity: " + star.luminosity;
	ul.appendChild(li);
	li = document.createElement('li')
	li.textContent = "radius: " + star.radius;
	ul.appendChild(li);

	if (star.starType != null) {
		li = document.createElement('li')
		li.textContent = "Star Type: " + star.starType.name;
		ul.appendChild(li);
	}

	let edit = document.createElement('button');
	edit.textContent = "Edit";
	starDiv.appendChild(edit);
	let del = document.createElement('button');
	del.textContent = "Delete"
	starDiv.appendChild(del);

	/*
	tr.addEventListener('click', function(event){
		console.log(event.target);
		singleStarPage(star);
	});*/
	edit.addEventListener('click', function(event) {
		event.preventDefault();
		editForm(star);

	});
	del.addEventListener('click', function(event) {
		event.preventDefault;
		console.log(event.target);
		console.log(star.id);
		console.log("delete button pressed");
		let starName = "" +star.name
		if (confirm("Are You Sure You want to delete " + starName)){
			deleteStar(event, star)
		}

	});
}

function singleStarPage(star) {
	console.log("Single Star Page");
	//	window.location.href = "singleStar/"+star.id;
}


//********************************** */
//Create Star
//********************************** */

function loadStarTypeForForm(id) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/starTypes')
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let starList = JSON.parse(xhr.responseText);
				console.log(starList);
				console.log(id);
				if (id === undefined ){
					id='starType';
				}
					displayStarTypes(starList, id);					
			}
		}
	}
	xhr.send();
}

function displayStarTypes(starList, id) {
	let sel = document.getElementById(id);
	let option = document.createElement('option');
	option.value = -1;
	option.textContent = "None";
	sel.appendChild(option);
	for (let starT of starList) {
		let option = document.createElement('option');
		option.value = starT.id;
		option.textContent = starT.name;
		sel.appendChild(option);
	}
}

function createStar(event) {

	event.preventDefault();

	let star = document.newStar;


	let typeOfStar = {
		id: star.starType.value
	}


	let createStar = {
		name: star.name.value,
		about: star.about.value,
		image: star.imageUrl.value,
		enabled: true,
		age: star.age.value,
		lifetime: star.lifetime.value,
		ascension: star.ascension.value,
		declination: star.declination.value,
		solarMasses: star.solarMasses.value,
		luminosity: star.luminosity.value,
		radius: star.radius.value,
	};
	if (typeOfStar.id != -1) {
		createStar.starType = typeOfStar;
	}


	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/stars');
	console.log("post open")
	xhr.setRequestHeader("Content-type", "application/json");

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 201) {
				// * On success, if a response was received parse the film data
				//   and pass the film object to displayFilm().
				let newstar = JSON.parse(xhr.responseText);
				loadStarList(newstar);
				getStarDetails(newstar);
			}
			else {
				// * On failure, or if no response text was received, put "Film not found" 
				//   in the filmData div.
				console.error("POST request failed");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	};
	let userObjectJson = JSON.stringify(createStar);

	xhr.send(userObjectJson);
}


//********************************** */
//Edit Star
//********************************** */

function editStar(event) {
	event.preventDefault()
	let star = document.editForm;
	console.log(star.name.value);

	let typeOfStar = {
		id: star.starType.value
	}

	let editStar = {
		id: star.id.value,
		name: star.name.value,
		about: star.about.value,
		image: star.imageUrl.value,
		enabled: true,
		age: star.age.value,
		lifetime: star.lifetime.value,
		ascension: star.ascension.value,
		declination: star.declination.value,
		solarMasses: star.solarMasses.value,
		luminosity: star.luminosity.value,
		radius: star.radius.value,
	}
	console.log(typeOfStar.id);
	if (typeOfStar.id != -1) {
		editStar.starType = typeOfStar;
	}
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/stars/' + editStar.id);
	console.log("put open")
	xhr.setRequestHeader("Content-type", "application/json");

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				// * On success, if a response was received parse the film data
				//   and pass the film object to displayFilm().
				console.log("PUT request success");
				let newstar = JSON.parse(xhr.responseText);
				loadStarList(newstar);
				getStarDetails(newstar);
			}
			else {
				// * On failure, or if no response text was received, put "Film not found" 
				//   in the filmData div.
				console.error("PUT request failed");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	};
	let userObjectJson = JSON.stringify(editStar);

	xhr.send(userObjectJson);
}

function editForm(star) {
	let starDiv = document.getElementById('displayStar');
	starDiv.replaceChildren();
	console.log(star);

	let form = document.createElement('form');
	form.name = "editForm"
	starDiv.appendChild(form);

	let div1 = document.createElement('div');
	form.appendChild(div1);
	h1 = document.createElement('input');
	h1.type = "number";
	h1.name = "id";
	h1.value = star.id;
	h1.hidden = "hidden"
	div1.appendChild(h1);

	div1 = document.createElement('div');
	div1.textContent = "Name: ";
	form.appendChild(div1);
	h1 = document.createElement('input');
	h1.type = "text";
	h1.name = "name";
	h1.value = star.name;
	div1.appendChild(h1);

	div1 = document.createElement('div');
	div1.textContent = "About: ";
	form.appendChild(div1);
	h1 = document.createElement('textarea');
	h1.name = "about";
	h1.value = star.about;
	div1.appendChild(h1);

	div1 = document.createElement('div');
	div1.textContent = "Image: ";
	form.appendChild(div1);
	h1 = document.createElement('input');
	h1.type = "text";
	h1.name = "imageUrl";
	h1.value = star.imageUrl;
	div1.appendChild(h1);

	div1 = document.createElement('div');
	div1.textContent = "Age: ";
	form.appendChild(div1);
	h1 = document.createElement('input');
	h1.type = "number";
	h1.name = "age";
	h1.value = star.age;
	div1.appendChild(h1);

	div1 = document.createElement('div');
	div1.textContent = "Lifetime: ";
	form.appendChild(div1);
	h1 = document.createElement('input');
	h1.type = "number";
	h1.name = "lifetime";
	h1.value = star.lifetime;
	div1.appendChild(h1);

	div1 = document.createElement('div');
	div1.textContent = "Right Acension: ";
	form.appendChild(div1);
	h1 = document.createElement('input');
	h1.type = "number";
	h1.name = "ascension";
	h1.value = star.ascension;
	div1.appendChild(h1);

	div1 = document.createElement('div');
	div1.textContent = "Declination: ";
	form.appendChild(div1);
	h1 = document.createElement('input');
	h1.type = "number";
	h1.name = "declination";
	h1.value = star.declination;
	div1.appendChild(h1);

	div1 = document.createElement('div');
	div1.textContent = "Solar Mass: ";
	form.appendChild(div1);
	h1 = document.createElement('input');
	h1.type = "number";
	h1.name = "solarMasses";
	h1.value = star.solarMasses;
	div1.appendChild(h1);

	div1 = document.createElement('div');
	div1.textContent = "Luminosity: ";
	form.appendChild(div1);
	h1 = document.createElement('input');
	h1.type = "number";
	h1.name = "luminosity";
	h1.value = star.luminosity;
	div1.appendChild(h1);

	div1 = document.createElement('div');
	div1.textContent = "Radius: ";
	form.appendChild(div1);
	h1 = document.createElement('input');
	h1.type = "number";
	h1.name = "radius";
	h1.value = star.radius;
	div1.appendChild(h1);
	div1 = document.createElement('div');
	div1.textContent = "Star Type: ";
	form.appendChild(div1);
	h1 = document.createElement('select');
	h1.id = "editStarType";
	h1.name = "starType";
	div1.appendChild(h1);
	
	loadStarTypeForForm('editStarType');

	div1 = document.createElement('div');
	form.appendChild(div1);
	let submitButton = document.createElement('input');
	submitButton.type = "submit";
	submitButton.name = "submit";
	submitButton.value = "Edit Star";
	div1.appendChild(submitButton);

	cancelButton = document.createElement('input');
	cancelButton.type = "submit";
	cancelButton.name = "cancel";
	cancelButton.value = "Cancel";
	div1.appendChild(cancelButton);

	submitButton.addEventListener('click', editStar);
	cancelButton.addEventListener('click', function(e) {
		loadStarList(star);
		getStarDetails(star);
	});
}

//********************************** */
//Delete Star
//********************************** */

function deleteStar(event, star) {
	event.preventDefault()
	
	console.log(star.id);

	
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/stars/' + star.id);
	console.log("delete open")
	xhr.setRequestHeader("Content-type", "application/json");

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				// * On success, if a response was received parse the film data
				//   and pass the film object to displayFilm().
				console.log("DELETE request success");
				
				let starDiv = document.getElementById('displayStar');
				starDiv.replaceChildren();
				loadStarList();
			}
			else {
				// * On failure, or if no response text was received, put "Film not found" 
				//   in the filmData div.
				console.error("DELETE request failed");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	};

	xhr.send();
}







