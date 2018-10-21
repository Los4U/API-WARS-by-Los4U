$(document).ready(function() {

    let xhr =  new XMLHttpRequest();
    xhr.open('GET','https://swapi.co/api/planets', true);
    xhr.responseText = 'text';

    xhr.onload = function(){

        let data = (JSON.parse(xhr.response));

        console.log("Tablice", data.results[0]);
        let table = document.getElementById("table");

        for (let planet of data.results){
            table.insertAdjacentHTML('beforeend', templates.getRow(planet));

            // let newCardButton = $(`#new-card-${board.id}`);
            // newCardButton.click(function (ev){
            //     console.log(ev.target);
            //     let modal = document.getElementById("modal");
            //     modal.dataset.boardId = board.id;
            // });

        }

    };

    xhr.send();


   // do stuff when DOM is ready
});