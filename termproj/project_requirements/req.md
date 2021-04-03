- Your term project could be any web project ( game, business application, multiplayer, etc)  provided it meets the following requirements

1. client side hosted in one origin, server side in another (E.g. One of team members provides the host for the server the other one for the client )

2. server side provides at least 10 different endpoints as follows:

- At least three have to be of type POST method
- At least two DELETE method
- At least two PUT method 
- At least one GET method

* The RESTful services have to implement all the CRUD operations on the stored data in DB ( e.g. endpoints to read data from DB,  endpoints to write data into DB, endpoints to delete data fromDB, endpoint to update data of DB)

3. client side has at least 4 pages ( or 4 different views if using SPA) with dynamic contents ( getting input from the user and communicating with the server). 

4. client side utilizes all of the end points

5. client side uses semi-secure approach to send requests to the server by including the token that has been received from the server. The server then matches the token with the domain from which the request comes and if there is a match returns the response, otherwise it returns The HTTP 401 Unauthorized client error

- only token holders can get API services)

6. client side has an additional API admin page, admin.html

 - The client side as well as all the 4 pages you need, it also has an API admin page, admin.html, which needs authentication to open. ( the user has to enter a user/pass where the user/pass are stored in the DB of the server side and the password is hashed)

* After entering the credentials, your client sends a post request to the server and the server checkers the user/pass and if matches with the one stored in the DB will return the following information to the client via json after entering the right credential,

 

* Stats for each of  the 10 endpoints ( how many times each endpoint served requests) in tabular format. E.g. image

7. json content negotiation 

- Your APIs have to support exchange of data in json format:  application/json

8. every single page of your app has to communicate with the server via API calls and the app has to utilize all the 10 end points. E.g. a calculator cannot be a good client app as it does not need to use DELETE method, it does not need to use DB

9. your database has to contain at least 3 tables. The password of the API admin page has to be hashed.

10. give the Access-Control-Allow-Origin only to your client side origin  ( not to "*")

11. Mobile friendly UX 

- no zoom or pinching must be needed, no panning to left or right must be needed, all necessary primary information has to be visible on the screen with large font, each button has to be at least as wide as the size of our index finger so that touching the screen does not end up clicking multiple bottoms 

12. the server has to implement at least six  different HTTP status code  

13. If everything is ok with the client request, a Json object will be returned by the server.

* If not, the server returns the corresponding http code (
    - 5xx if its servers fault
    - 4xx if you asked something you were not supposed to
    - 2xx if everything was fine

- Please refer to: https://www.w3.org/Protocols/HTTP/HTRESP.html

 

Technology stack to use

Backend

node js, you can use any package (module) but for processing http you are only limited to http or express and for processing mySQl ( if you choose mySQL) you are limited to mySQL module 

Front-end 

Any styling package such as bootstrap etc can be used

Any JS libraries can be used (As long as you know what you are doing, otherwise support will not be provided to the libraries not covered in class)

Database 

relational databases such as mySQL,postgre db, SQLite, …. 

Documentation 

Proper documentation for developers to use your API service

The implementation should specify at least the following:

A description of available resources and their URI

Available HTTP methods for each resource in the API

Sample JSON representation of each resource in the API

Examples of JSON representation of client payload for the services

The url of API documentation must end with /doc/ e.g. example.com/doc

You can use Swagger for documentation (optional) 

Versioning 

Proper API versioning

http://api.example.com/v1

Or

http://example.com/api/v1

 

Input validation in your term project 

These apply to both your apps, the client and the server 

If an email is expected to input, you must validate the input to be in the format of an email ( e.g. at some text with an @ followed by a domain name. You can use existing regex samples from the net ( or at least check that the entered email has to content an @ and a '.' somewhere

 

If a number is expected to input, your app has to return an error if something else gets entered 

Never trust input at the server side either. You need to do sanity check ( input validation) at the end point of APIs as well in your function that is responsible to handle that http method or route 

Coding style recommendations 

Modular folder structure: separate folders for HTML, CSS and JS

Clean code: good code organization using ES6 modules

All functions have to be arrow functions

Separation of concerns, meaning each function has to do one thing (e.g. a function cannot do both calculation and display of message, you need one function for calculation, one for display of messages)

Short function declaration ( preferably not more than 15 lines)

All string messages you want to display to user in a separate file 

For variable declaration first use const, then let. Never var

 

Deliverable 

A) At the comment section: 

1- Provide 10 sample test uris/urls and parameters  to test all of your  API endpoints ( GET and POST method) 

Including the token and all parameters to use with postman

So that we can easily test them directly via a browser or postman 

2- the url of the client app
3- API Admin credentials , the admin login page url (e.g. yourDomain.com/.../termproject/ : so that I can login and see the admin page to see the stat of each endpoint (number of requests served so far)

4- the url of the server app 

 5- Git URL(public github or git lab) with the following folders/files

Front-end folder (Only include files relevant to this application. Including files from previous labs, from the root folder of your hosted website will result in mark deduction)

Back-end folder (Only include javascript files that show your server logic. Including other files and folders (e.g. node_modules, .git, .vscode) will result in mark deduction) [Use .gitignore to exclude unnecessary folders. You wouldn't include node_modules in your git repo anyway!]

DB.sql file in the root of your git repo ( visible to me ) containing the SQL dump of your DB which contains a record of the table structure and/or the data  ( the SQL script that creates the tables and inserts the data ) . As seen in videos shared with you , you can use phpMyAdmin and export your DB to a file. That file is called SQL dump or DB dump, or DB backup that we need here

ERD.jpg ERD(Entity Relationship Diagram) of your database erd.jpg 

 

B) team#finalProjectTitle.pdf 

a pdf containing 

B.1 team member names at the top of 

B.2 briefly what the application does 

B.3 everything you were asked to provide at the comment section 

B.4 APi documentation with example

 

Rubric:

(2 marks) API design and implementation at server side

Following REST API design best practices and comprehensive description of available services

(2 marks) CRUD implementation in DB 

(0.5 marks) API security using tokens as described in server specifications above. 

(1 marks) documentation as per specifications and API versioning

(3 marks) Complete, bug free frontend client application that can consume all available services, mobile friendly 

(1 mark) Server authentications described above for API admin page

(0.5 marks) input/data validation both for frontend and backend as well as proper error handling that covers all edge cases

General deductions:

-4 if you do not use SQL based databases

-2 if you do not post the link to your app at the comment section

-5 if not hosted

-2 Invalid SSL certificate on your website

-2 missing implementation of a HTTP request ( for each)

-0.5  for each day late, up to 4 days, afterwards, the assignment will be marked 0

up to -3, failure to implementation a requirement of the assignment

up to -2, from minor bugs or bugs that break the application after being used

Up to -2 if not mobile friendly

Up to -2 if bad UX,  wage user flow (if it is not clear how to use the app, what to do next, etc)

