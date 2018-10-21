$(document).ready(function() {

    let dom = {

        showPlanet(){
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://swapi.co/api/planets', true);
            xhr.responseText = 'text';

            xhr.onload = function () {

                let data = (JSON.parse(xhr.response));
                console.log("Tablice", data.results);

                let table = document.getElementById("table");
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
});