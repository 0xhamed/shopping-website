# SRC255x - Online Store Project

## Built with:

### Front-End:
HTML5, CSS3, Bootstrap, Vanilla JavaScript

### Back-End:
Nodejs, Expressjs, MongoDB, EJS

------------

## Features:

### Control Management System:
Profile: User can add/edit address and change his name,email etc..

Products: Admin and Mods can view, add, edit and remove products.

Users: Admin can view, add, edit, remove users.

Orders: users can view their orders status and Admin/Mods can edit the status.

### Dynamic Pagination:
Page items are Dynamically loaded

Number of page items depends on client width

### Shopping Cart:
View Shopping Cart items

Increase/decrease Product quantity

Dynamic prices are dependent on quantity

Checkout with Paypal

### Wish List:
View/Remove Wishes

### Products:
Add to Shopping Cart

Add to Wish List

View Products detials

### Register/Login/Logout


------------

## Get the Project Up and Running:
First of all you need to install the dependencies

`npm install`

next go to src/startup/config.js

###### if you are in production you should set this keys to an Environment variables.

- db_URI: MongoDB connection string.
- session_secret: set a strong random string
- paypal_mode: 'sandbox' or 'live'
- paypal_client_id & _secret you can get them from paypal dev account from [here](https://www.paypal.com/signin?returnUri=https%3A%2F%2Fdeveloper.paypal.com%2Fdeveloper%2Fapplications "here").

Now you can run the server through

`npm run start`


------------

### License:
MIT
