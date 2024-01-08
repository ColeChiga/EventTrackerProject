# EventTrackerProject part 1

## About

The event tracker project is a project designed to test someones understanding of building a full stack application using Java, java script, sql, and Spring Boot.

In part 1 of this project, we were tasked with building a database and creating the entities, repositories, services, and controllers, to create the bones of a functional application. We also needed to test our entities using junit tests and our boot project using postmap.

With my program, you are meant to explore the cosmos, with information about stars, star types, constillations, planets, and satellites. At this point in the project, the database is only loaded with a few entries, but the user can use postman to create and experiment with new entries. 

## Postman Queries:

For each entity, you can see all columns, all enabled columns, individual selections (by their Id), You can create new, update, delete (switch enabled to false), and re-enable disabled entities. to do this, you use the following on postmap:

	GET: stars -see all enabled stars
	GET: admin/stars -see all stars
	GET: admin/stars/{id} -see individual stars
	GET: stars/{id} -see individual enabled stars
	POST: stars -create new star
	PUT: stars/{id} -update existing star
	PUT: stars/{id}/enabled -set enabled to true
	DELETE: stars/{id} -set enabled to false

This same formula works for each entity, allowing individual entities to be accessed and changed. The other entities can be accessed using "starTypes", "constellations", "planets", and "satellites".

## Technologies Used

Terminal, sublime, sql, mySQLWorkbench, mySQL, SpringToolSuite, eclipse, java, gradle, JPA, Spring Boot, REST, JUNIT Tests, MAMP, postman, Git. 

## Lessons Learned

One lesson I learned from this project is the importance of consistency. This project had a lot of repetative elemtents, especially after creating the entities and starting on building the controllers, services, and repositories. When doing each of these for different entities, I found myself doing a lot of the same types of work, it was very repetative, almost copy/paste type of work. I found it was easiest for me to do it in stages, rather than finishing all of the classes for each entity, i finished the class for each of the entities before moving on to the next type. This helped to make sure that I was staying consistent. This worked well for the most part with the only issue being that if I made a mistake, it was often carried over through each entity (although fixing that mistake was often easy). 



