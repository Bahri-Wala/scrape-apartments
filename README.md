# Apartment Scraper

## Introduction

This project is my submission for Luxonis' technical assignment for the position JavaScript Developer.

## Assignment

My task was to scrape 500 items from [sreality.cz](https://www.sreality.cz/en), then save them in a PostgreSQL database.

Then, I was requested to create an HTTP Server to query and visualize the items. 

Everything should be dockerized and a docker-compose file is a must.

## Running the project

First, build the images:

``` shell
docker-compose build
```

Then let's run our containers:

``` shell
docker-compose up
```

If you want to scrape and load the items in the database, just make a `GET localhost:3000/apartments/scrape` request(They are already loaded in the database so you can go directly to last step).

You can also run the following curl command:

``` shell
curl --location --request GET 'localhost:3000/apartments/scrape'
```

Go to `localhost:8080` to see the UI