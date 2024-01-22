# EventTrackerProject

## About

The event tracker project is a project designed to test someones understanding of building a full stack application using Java, javascript, typescript, angular, html, sql, and Spring Boot.

With my program, you are meant to explore the cosmos, with information about stars, star types, constillations, planets, and satellites. At this point in the project, the database is only loaded with a few entries, but the user can use postman to create and experiment with new entries. 

In part 1 of this project, we were tasked with building a database and creating the entities, repositories, services, and controllers, to create the bones of a functional application. We also needed to test our entities using junit tests and our boot project using postmap.

For part 2 of the project, we used Javascript on a web application to create a displays using XMLHttpRequests to access the data created in part 1, including sending GET/POST/PUT/DELETE. We needed to parse through our JSON responses with Javascript as well as build an HTML file. Another feature we needed to implement was data aggregation. In this part, I implemented
a function to calculate the temperature and Goldilocks Zones of stars using the known information about them.

During part 3 of the project, We used Angular to develop a more dynamic web page than with our javascript. This was done by building models of the enities created in part 1. After this a component was made using html and typescript that would display the information from the models, Services were then made for each model that would allow the Angular program to access the original Spring Boot project. 


## Postman Queries:

For each entity, you can see all columns, all enabled columns, individual selections (by their Id), You can create new, update, delete (switch enabled to false), and re-enable disabled entities. to do this, you use the following on postmap:


| HTTP Verb | URI               | Request Body | Response Body | Status Codes | 
|-----------|-------------------|--------------|---------------|---------|
| GET 		| `/api/stars`		|     		   | List all enabled stars | 200, 404 |
| GET 		| `/api/admin/stars`	| 			   | List all stars| 200, 404 |
| GET 		| `/api/admin/stars/{id}`| 		   | show individual stars| 200, 400 |
| GET 		| `/api/stars/{id}`	|			   | show individual enabled stars| 200, 400 |
| POST 		| `/api/stars`		| JSON of a new star entity | create new star| 201, 400 |
| PUT 		| `/api/stars/{id}`	| JSON of an updated star entity | update existing star| 200, 400 |
| PUT 		| `/api/stars/{id}/enabled`|		 	   | set enabled to true| 200, 400 |
| DELETE 	| `/api/stars/{id}`	| 			   | set enabled to false| 200, 400 |


This same formula works for each entity, allowing individual entities to be accessed and changed. The other entities can be accessed using "starTypes", "constellations", "planets", and "satellites".

## Technologies Used

Terminal, sublime, sql, mySQLWorkbench, mySQL, SpringToolSuite, eclipse, java, gradle, JPA, Spring Boot, REST, JUNIT Tests, MAMP, postman, Git. 

## Lessons Learned

One lesson I learned from this project is the importance of consistency. This project had a lot of repetative elemtents, especially after creating the entities and starting on building the controllers, services, and repositories. When doing each of these for different entities, I found myself doing a lot of the same types of work, it was very repetative, almost copy/paste type of work. I found it was easiest for me to do it in stages, rather than finishing all of the classes for each entity, i finished the class for each of the entities before moving on to the next type. This helped to make sure that I was staying consistent. This worked well for the most part with the only issue being that if I made a mistake, it was often carried over through each entity (although fixing that mistake was often easy). 
 
Another lesson I learned during part 3 of this project is how important it is to pay attention to the small details within a project. there are times where you will do something early on when creating a project that won't cause any issues until further on where it adds unnecessary complexity to the program. These porblems can be difficult to diagnose and difficult to work around, but knowing how the 'bones' of the program are built will help you troubleshoot these problems.


