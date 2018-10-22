$(document).ready(function() {

    pageAdress = "https://swapi.co/api/planets";

    let dom = {

        eventHelper(){
            let buttonPrevious = document.getElementById("previous");
            let buttonNext = document.getElementById("next");
            buttonPrevious.disabled = true;

                buttonPrevious.addEventListener("click", function(){
                    $.getJSON(pageAdress , function(response){
                        console.log("Previous",response['previous'] );
                        if(response['previous'] != null){
                              pageAdress = response['previous'];
                              dom.showPlanet();
                        }
                        else{
                            buttonPrevious.disabled = true;
                        }

                    });
                });

                buttonNext.addEventListener("click", function(){
                    buttonPrevious.disabled = false;
                    $.getJSON(pageAdress , function(response){
                        pageAdress = response['next'];
                        dom.showPlanet();
                    });
                });
        },

        showPlanet(){
            let xhr = new XMLHttpRequest();
            xhr.open('GET', pageAdress, true);
            xhr.responseText = 'text';

            xhr.onload = function () {
                let data = (JSON.parse(xhr.response));
                console.log("Tablice", data.results);

                let table = document.getElementById("table");
                table.innerHTML = "";
                table.insertAdjacentHTML('beforeend', templates.getRowHeader());


                for (let planet of data.results) {
                    table.insertAdjacentHTML('beforeend', templates.getRow(planet));
                }

                let residentsButtons = document.getElementsByClassName('residents');
                console.log("Buttons", residentsButtons);

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