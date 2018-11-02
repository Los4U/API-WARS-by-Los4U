$(document).ready(function() {


    let previousAddress = "";
    let nextAddress = "";
    let pageAddress = "https://swapi.co/api/planets";

    let dom = {

        eventHelper(){
            let buttonPrevious = document.getElementById("previous");
            let buttonNext = document.getElementById("next");

                buttonPrevious.addEventListener("click", function(){
                    $.getJSON(pageAddress , function(response){
                        pageAddress = response['previous'];
                        dom.showPlanet();
                    });
                });

                buttonNext.addEventListener("click", function(){
                    $.getJSON(pageAddress , function(response){
                        pageAddress = response['next'];
                        dom.showPlanet();
                    });
                });
        },

        showPlanet(){
            let xhr = new XMLHttpRequest();
            xhr.open('GET', pageAddress, true);
            xhr.responseText = 'text';

            xhr.onload = function () {
                let data = (JSON.parse(xhr.response));
                // console.log("Tablice", data.results);
                console.log("Prev", data['previous']);
                console.log("Next", data['next']);

                let buttonPrevious = document.getElementById("previous");
                let buttonNext = document.getElementById("next");

                if(data['previous'] == null){  buttonPrevious.disabled = true;    }
                else{                          buttonPrevious.disabled = false;   }

                if(data['next'] == null){      buttonNext.disabled = true;        }
                else{                          buttonNext.disabled = false;       }

                let table = document.getElementById("table");
                table.innerHTML = "";
                table.insertAdjacentHTML('beforeend', templates.getRowHeader());


                for (let planet of data.results) {
                    table.insertAdjacentHTML('beforeend', templates.getRow(planet));
                }

                let residentsButtons = document.getElementsByClassName('residents');
                // console.log("Buttons", residentsButtons);

                [].forEach.call(residentsButtons, function (button) {
                    button.addEventListener("click", dom.showModal);
                });
            };
            xhr.send();
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