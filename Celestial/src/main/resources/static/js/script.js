console.log('script.js loaded');

window.addEventListener('load', function(e){
	console.log('page loaded, DO complete');
	init();
	});
	
function init(){
	//set up event handlers, load initial data, etc
	
	loadStarList();
	loadStarTypeForForm();
	document.newStar.submit.addEventListener('click', createStar);
}

//********************************** */
//Star List
//********************************** */

function loadStarList(){
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/stars')
	xhr.onreadystatechange = function(){
		if (xhr.readyState === 4){
			if (xhr.status === 200){
				let starList = JSON.parse(xhr.responseText);
				console.log(starList);
				displayStarList(starList);
			}
		}
	}
	xhr.send();
}

function displayStarList(starList){
 	let tbody = document.getElementById('starListTBody');
		let lastClick = -1;
	for (let star of starList){
		let tr = document.createElement('tr');
		tr.id = "starRow"+star.id;
		tbody.appendChild(tr);
		let td = document.createElement('td');
		td.textContent = star.name;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = star.about;
		tr.appendChild(td);
		td = document.createElement('td');
		tr.appendChild(td);
		
		tr.addEventListener('click', function(event){
			console.log(event.target);
			getStarDetails(star, lastClick);
			lastClick=star.id;
		});
	}
}

function getStarDetails(star, lastClick){
	console.log("getting details for star " + star.id);
	let tr = document.getElementById('starRow'+star.id);
	
			console.log("last click: " + lastClick);
	if(lastClick > -1){
	let trRemove = document.getElementById('starRow'+lastClick);
	let td = document.createElement('td');
			console.log(trRemove.lastElementChild)
			trRemove.removeChild(trRemove.lastElementChild);
			trRemove.appendChild(td)
	}
	
	let ul = document.createElement('ul');
		ul.id = "starUL"+star.id
		tr.lastElementChild.append(ul);
		let li = document.createElement('li');
		li.textContent = "Star Type: " + star.starType.name;
		ul.appendChild(li);
		li = document.createElement('li')
		li.textContent = "age: " + star.age;
		ul.appendChild(li);
		li = document.createElement('li')
		li.textContent = "lifetime: " + star.lifetime;
		ul.appendChild(li);
		let edit = document.createElement('button');
		edit.textContent = "Edit";
		ul.appendChild(edit);
		let del = document.createElement('button');
		del.textContent = "Delete"
		ul.appendChild(del);
		
		/*
		tr.addEventListener('click', function(event){
			console.log(event.target);
			singleStarPage(star);
		});*/
		edit.addEventListener('click', function(event){
			console.log(event.target);
			console.log("edit button pressed");
		});
		del.addEventListener('click', function(event){
			console.log(event.target);
			console.log("delete button pressed");
		});
}

function singleStarPage(star){
	console.log("Single Star Page");
//	window.location.href = "singleStar/"+star.id;
}


//********************************** */
//Create Star
//********************************** */

function 	loadStarTypeForForm(){
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/starTypes')
	xhr.onreadystatechange = function(){
		if (xhr.readyState === 4){
			if (xhr.status === 200){
				let starList = JSON.parse(xhr.responseText);
				console.log(starList);
				displayStarTypes(starList);
			}
		}
	}
	xhr.send();
}

function displayStarTypes(starList){
 	let sel = document.getElementById('starType');
		let option  = document.createElement('option');
		option.value = null;
		option.textContent = "None";
		sel.appendChild(option);
	for (let starT of starList){
		let option  = document.createElement('option');
		option.value = starT.id;
		option.textContent = starT.name;
		sel.appendChild(option);
	}
}

function createStar(e){
	e.preventDefult();
	let star = document.newStar();
	
	let createStar = {
			'name': star.name.value,
			'about': star.about.value,
			'image': star.imageUrl.value,
			'age': star.age.value,
			'lifetime': star.lifetime.value,
			'ascention': star.ascension.value,
			'declination': star.declination.value,
			'solarMasses': star.solarMasses.value,
			'luminosity': star.luminosity.value,
			'radius': star.radiusradius.value,
			'starType': star.starType.value
	}
	
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/stars');
	xhr.setRequestHeader("Content-type", "application/json")
	
	xhr.onreadystatechange = function() {
	if (xhr.readyState === 4) {
			if (xhr.status === 201) {
				// * On success, if a response was received parse the film data
				//   and pass the film object to displayFilm().
			loadStarList();
			}
			else {
				// * On failure, or if no response text was received, put "Film not found" 
				//   in the filmData div.
				console.error("POST request failed")
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	};
	console.log(createStar);
	let userObjectJson = JSON.stringify(createStar);
	console.log(userObjectJson);
	
	xhr.send(userObjectJson);
}
