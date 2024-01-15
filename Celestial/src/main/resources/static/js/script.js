console.log('script.js loaded');

window.addEventListener('load', function(e) {
	console.log('page loaded, DO complete');
	init();
});

function init() {
	//set up event handlers, load initial data, etc

	loadStarList();
	loadStarTypeForForm();
	loadConstellationForForm();
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
	console.log(star.starType)
	if (star.starType === null){
		star.starType ={
			name : null
		}
	}
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
	if (star.age === null) {
		li.textContent = "Age: unknown";		
	} else{
	li.textContent = "Age: " + star.age + ' billion years';
	}
	ul.appendChild(li);
	
	li = document.createElement('li');
	if (star.lifetime === null) {
		li.textContent = "Lifetime: unknown";		
	} else{
	li.textContent = "Lifetime: " + star.lifetime + ' billion years';
	}
	ul.appendChild(li);
	
	
	if (star.constellation != null) {
		li = document.createElement('li')
		li.textContent = "Constellation: " + star.constellation.name;
		ul.appendChild(li);
	};
	
	if(star.id != 1){
	li = document.createElement('li');
	if (star.ascension == 0) {
		li.textContent = "Right Ascension: unknown";		
	} else{
	li.textContent = "Right Ascension: " + star.ascension + ' degrees';
	}
	ul.appendChild(li);
	
	li = document.createElement('li');
	if (star.declination == 0) {
		li.textContent = "Declination: unknown";		
	} else{
	li.textContent = "Declination: " + star.declination + ' degrees';
	}
	ul.appendChild(li);
	}
	
	if (star.starType.name != null) {
		li = document.createElement('li')
		li.textContent = "Star Type: " + star.starType.name;
		ul.appendChild(li);
	}
	
	li = document.createElement('li');
	if (star.solarMasses == 0) {
		li.textContent = "Solar Masses: unknown";		
	} else{
	li.textContent = "Solar Masses: " + star.solarMasses + ' M⊙';
	}
	ul.appendChild(li);
	
	li = document.createElement('li');
	if (star.luminosity == 0 && star.starType.name != 'Black Hole') {
		li.textContent = "Luminosity: unknown";		
	} else{
	li.textContent = "Luminosity: " + star.luminosity + ' L⊙';
	}
	ul.appendChild(li);
	
	li = document.createElement('li');
	if (star.radius == 0) {
		li.textContent = "Radius: unknown";		
	} else{
	li.textContent = "radius: " + star.radius + ' R⊙';
	}
	ul.appendChild(li);

	if (star.luminosity > 0 && star.radius > 0) {
		li = document.createElement('li')
		li.textContent = "Temperature: " + calculateTemp(star) + " K";
		ul.appendChild(li);
	}

	if (star.luminosity > 0) {
		li = document.createElement('li')
		let goldilocks = calcGoldilocksZone(star)
		li.textContent = "Goldilocks Zone between: " + goldilocks[0] + " AU and " + goldilocks[1] + " AU";
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
		let starName = "" + star.name
		if (confirm("Are You Sure You want to delete " + starName)) {
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
				if (id === undefined) {
					id = 'starType';
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

function loadConstellationForForm(id) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/constellations')
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let constellation = JSON.parse(xhr.responseText);
				console.log(constellation);
				console.log(id);
				if (id === undefined) {
					id = 'constellation';
				}
				displayConstellation(constellation, id);
			}
		}
	}
	xhr.send();
}

function displayConstellation(constellation, id) {
	let sel = document.getElementById(id);
	let option = document.createElement('option');
	option.value = -1;
	option.textContent = "None";
	sel.appendChild(option);
	for (let con of constellation) {
		let option = document.createElement('option');
		option.value = con.id;
		option.textContent = con.name;
		sel.appendChild(option);
	}
}

function createStar(event) {

	event.preventDefault();

	let star = document.newStar;

	let createStar = createStarObject(star);


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

function createStarObject(star) {

	let typeOfStar = {
		id: star.starType.value
	}
	let constellation = {
		id: star.constellation.value
	}

	let starObject = {

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
		starObject.starType = typeOfStar;
	}
	if (constellation.id != -1) {
		starObject.constellation = constellation;
	}

	console.log(star.id.value);
	if (star.id) {
		starObject.id = star.id.value;
	}

	return starObject;
}

//********************************** */
//Edit Star
//********************************** */

function editStar(event) {
	event.preventDefault()
	let star = document.editForm;
	console.log(star.name.value);

	let editStar = createStarObject(star);

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
	h1.min = '0';
	h1.step = '0.01';
	div1.appendChild(h1);

	div1 = document.createElement('div');
	div1.textContent = "Lifetime: ";
	form.appendChild(div1);
	h1 = document.createElement('input');
	h1.type = "number";
	h1.name = "lifetime";
	h1.value = star.lifetime;
	h1.min = '0';
	h1.step = '0.01';
	div1.appendChild(h1);

	div1 = document.createElement('div');
	div1.textContent = "Right Acension: ";
	form.appendChild(div1);
	h1 = document.createElement('input');
	h1.type = "number";
	h1.name = "ascension";
	h1.value = star.ascension;
	h1.min = '0';
	h1.step = '0.01';
	div1.appendChild(h1);

	div1 = document.createElement('div');
	div1.textContent = "Declination: ";
	form.appendChild(div1);
	h1 = document.createElement('input');
	h1.type = "number";
	h1.name = "declination";
	h1.value = star.declination;
	h1.min = '0';
	h1.step = '0.01';
	div1.appendChild(h1);

	div1 = document.createElement('div');
	div1.textContent = "Solar Mass: ";
	form.appendChild(div1);
	h1 = document.createElement('input');
	h1.type = "number";
	h1.name = "solarMasses";
	h1.value = star.solarMasses;
	h1.min = '0';
	h1.step = '0.01';
	div1.appendChild(h1);

	div1 = document.createElement('div');
	div1.textContent = "Luminosity: ";
	form.appendChild(div1);
	h1 = document.createElement('input');
	h1.type = "number";
	h1.name = "luminosity";
	h1.value = star.luminosity;
	h1.min = '0';
	h1.step = '0.01';
	div1.appendChild(h1);

	div1 = document.createElement('div');
	div1.textContent = "Radius: ";
	form.appendChild(div1);
	h1 = document.createElement('input');
	h1.type = "number";
	h1.name = "radius";
	h1.value = star.radius;
	h1.min = '0';
	h1.step = '0.01';
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
	div1.textContent = "Constellation: ";
	form.appendChild(div1);
	h1 = document.createElement('select');
	h1.id = "editConstellation";
	h1.name = "constellation";
	div1.appendChild(h1);
	loadConstellationForForm('editConstellation');

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

//********************************** */
//data aggregation Star
//********************************** */

function calculateTemp(star) {
	let L = star.luminosity * 3.827 * (10 ** 26)
	console.log("luminosity " + L);
	const pi4o = 4 * 3.14 * 5.67 * Math.pow(10, -8);
	console.log("temp constant " + pi4o);
	let R = star.radius * (6.957 * 10 ** 8);
	console.log("radius convert " + R);
	let T = (L / (pi4o * ((R) ** 2))) ** (1 / 4);
	console.log("temp " + T);
	return T.toFixed(0);
};

function calcGoldilocksZone(star) {
	let GLZ = [];
	GLZ[0] = (0.95 * Math.sqrt(star.luminosity)).toFixed(2);
	GLZ[1] = (1.37 * Math.sqrt(star.luminosity)).toFixed(2);
	

	return GLZ;
};




