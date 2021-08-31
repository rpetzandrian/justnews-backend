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
4. Knex ( Query Builder )

## API Endpoint
auth endpoint

    POST      /auth/login
    POST      /auth/register

category endpoint

    GET      /category/
    GET      /cinemas/:id
    POST     /cinemas/
    PATCH    /cinemas/:id
    DEL      /cinemas/:id
    
schedule endpoint

    GET      /schedules/1
    GET      /schedules/movies/1
    GET      /schedules/cinemas/1
    POST     /schedules
    PATCH    /schedules/1
    DEL      /schedules/1
    
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
