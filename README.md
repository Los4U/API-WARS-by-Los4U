# Project Name
> # API WARS!

## Table of contents
* [General info](#general-info)
* [Features](#features)
* [Technologies](#technologies)
* [Setup](#setup)
* [Screenshots](#screenshots)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## General info
This is a web application that shows data about the Star Wars universe. This is the project created during my education in Codecool.

## Features
List of features ready:
* store data (Login and voting informations) in a local database (PostgreSQL)
* fetch information about Star Wars from https://swapi.co API (This site provides an endpoint with no authentication needed)
* create a simple user login system with sessions
* create a voting system (User can vote for planets)

## Technologies
* JavaScript
* Flask (micro web framework for Python)
* HTML, CSS
* AJAX
* Bootstrap
* SQL , Psycopg (the most popular PostgreSQL database adapter for the Python)

## Setup
Direct link: <https://starwars-swapi.herokuapp.com/>

## Screenshots
![Example screenshot](./img/screenshot.png)

## Code Examples
Show examples of usage:
`         addVote(ev){
            let planetName = ev.target.dataset.planetName;
            let planetId = ev.target.dataset.planetId;
            console.log("Vote", planetName, planetId );

            let xhr = new XMLHttpRequest();
                xhr.open('POST', '/add_vote', true);
                xhr.responseText = 'text';
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                xhr.onload = function () {

                    let modalContent = document.querySelector(".kamilModal");
                    modalContent.innerHTML = "";
                    modalContent.insertAdjacentHTML('beforeend', `<h2 id="modelMessage">You voted for: ${planetName}</h2>`);

                    let modalWindow = document.querySelector(".modal-bg-kamil");
                    modalWindow.classList.remove("modalForStats");
                    modalWindow.classList.add("modal-bg-kamil-active");

                      };
                xhr.send(`planetName=${planetName}&planetId=${planetId}`);
},`

## Status
Project is: _finished_

## Inspiration
Project inspired by Star Wars

## Contact
Created by [Kamil Woś](mailto:inz.kamil.wos@gmail.com) - feel free to contact me!
