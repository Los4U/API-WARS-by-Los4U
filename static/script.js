$(document).ready(function() {


    let previousAddress = "";
    let nextAddress = "";
    let pageAddress = "https://swapi.co/api/planets";

    let dom = {

        eventHelper(){
            let buttonPrevious = document.getElementById("previous");
            let buttonNext = document.getElementById("next");

                buttonPrevious.addEventListener("click", function(){
                    pageAddress = previousAddress;
                    dom.showPlanet();
                });

                buttonNext.addEventListener("click", function(){
                    pageAddress = nextAddress;
                    dom.showPlanet();
                });

                modalClose = document.getElementById("modalClose");
                modalClose.addEventListener("click", function () {
                    let modal = document.querySelector(".modal-bg-kamil");
                    modal.classList.remove("modal-bg-kamil-active");
                });

                let statisticButton = document.getElementById("statistic");
                statisticButton.addEventListener("click", function () {
                   let modal = document.querySelector(".modal-bg-kamil");
                   modal.classList.add("modalForStats");
                   modal.classList.add("modal-bg-kamil-active");

                    let modalMessage = document.getElementById("modelMessage");
                    modalMessage.innerText = `Statistic`;
                }) ;


        },

        showPlanet(){
            let xhr = new XMLHttpRequest();
            xhr.open('GET', pageAddress, true);
            xhr.responseText = 'text';

            xhr.onload = function () {
                let data = (JSON.parse(xhr.response));

                let buttonPrevious = document.getElementById("previous");
                let buttonNext = document.getElementById("next");

                if(data['previous'] == null){  buttonPrevious.disabled = true;    }
                else{                          buttonPrevious.disabled = false;   }

                if(data['next'] == null){      buttonNext.disabled = true;        }
                else{                          buttonNext.disabled = false;       }

                previousAddress = data['previous'];
                nextAddress = data['next'];

                let isUserLoggedIn = !!document.getElementById("logedInA");
                console.log("is_Logged", isUserLoggedIn);

                let table = document.getElementById("table");
                table.innerHTML = "";
                table.insertAdjacentHTML('beforeend', templates.getRowHeader(isUserLoggedIn));

                for (let planet of data.results) {
                    // Array(7) [ "https:", "", "swapi.co", "api", "planets", "4", "" ]   4
                    planet.id = planet['url'].split('/')[5]; // thx Saymon N
                    table.insertAdjacentHTML('beforeend', templates.getRow(planet, isUserLoggedIn));

                    if (isUserLoggedIn) {
                        let vote_button = document.getElementById(`${planet['name']}-vote`);
                        vote_button.addEventListener('click', dom.addVote);
                    }
                }

                let residentsButtons = document.getElementsByClassName('residents');

                [].forEach.call(residentsButtons, function (button) {
                    button.addEventListener("click", dom.showModal);
                });
            };
            xhr.send();
        },


        addVote(ev){
            let planetName = ev.target.dataset.planetName;
            let planetId = ev.target.dataset.planetId;
            console.log("Vote", planetName, planetId );

            let xhr = new XMLHttpRequest();
                xhr.open('POST', '/add_vote', true);
                xhr.responseText = 'text';
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                xhr.onload = function () {
                    let data = xhr.response;
                    console.log("data", data);
                    let modal = document.querySelector(".modal-bg-kamil");
                    modal.classList.add("modal-bg-kamil-active");

                    let modalMessage = document.getElementById("modelMessage");
                    modalMessage.innerText = `Thank you for voting for the planet: ${planetName}`;
                      };
                xhr.send(`planetName=${planetName}&planetId=${planetId}`);
        },

        showModal(ev){
            let modalContent = document.getElementById("residentTable");
            modalContent.innerHTML = "";
            let planetName = document.getElementById("planetName");
            planetName.innerText = "";

            $.getJSON(ev.target.dataset.url , function(response){
                console.log("Planet name", response['name']);
                planetName.innerText = "Residents of planet " + response['name'];
                dom.showResidents(response['residents'])
            });
        },

        showResidents(residents){
            let modalContent = document.getElementById("residentTable");
            modalContent.innerHTML = "";
            modalContent.insertAdjacentHTML('beforeend', templates.getResidentHeader() );

            residents.forEach(function (resident) {
                $.getJSON(resident , function(response){
                console.log("Resident", response['name']);
                modalContent.insertAdjacentHTML('beforeend', templates.getResidents(response));
                });
            });
        }
    };

dom.showPlanet();
dom.eventHelper();
});