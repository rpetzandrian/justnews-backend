# JustNews
	  

JustNews is a news provider app. In this repository, This is a Backend for JustNews App. This is based API for [JustNews Frontend](https://github.com/rpetzandrian/justnews-frontend)

## Getting Started

To get the Node server running locally:

* Clone this repo with `git clone https://github.com/rpetzandrian/justnews-backend.git project-name`
* `cd project-name`
* `npm install` to install all required dependencies
* Create a `.env` file and reference the `.env.example` file
* `node index.js or npm start if nodemon installed in your computer` to start the local server

## Architechture

The architechture to created this project: 
1. Database PostgreSQL
2. Node JS
3. Express JS ( Framework )
4. Pusher Beams For Notification

## Additional

This project has implement CleanCode like KISS, DRY, YAGNI, and SOLID Principle, Design Pattern, and Common Database Optimation. For full documentation, see the link below.

> [Implementation Docs](https://catnip-coelurus-544.notion.site/Implementation-Clean-Code-Design-Pattern-and-Database-Optimization-66706d01cb8e43478d80423ccbb34b86)

> [Material Docs](https://catnip-coelurus-544.notion.site/Advance-Week-Documentation-56408c250bdf4896b01aba83872b2311)

## API Endpoint
auth endpoint

    POST      /auth/login
    POST      /auth/register
    
post(article) endpoint

    GET      /posts
    GET      /posts/category
    GET      /posts/:id
    POST     /posts
    PATCH    /posts/likes/:user_id/:id
    PATCH    /posts/save/:user_id/:id
    PATCH    /posts/watchs/:id
    PATCH    /posts/:user_id/:id
    DEL      /posts/unlikes/:user_id/:id
    DEL      /posts/unsave/:user_id/:id
    DEL      /posts/:user_id/:id
    
user endpoint

    GET      /users
    GET      /users/:user_id
    POST     /users
    PATCH    /users/:user_id
    DEL      /users/:user_id
    
user endpoint

    GET      /comments/:post_id
    POST     /comments/:user_id
    PATCH    /comments/:user_id/:id
    DEL      /comments/:user_id/:id
    
Documentation : [Postman Collection](https://documenter.getpostman.com/view/13687762/TzeTJp5C)
