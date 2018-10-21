let templates = {
    getRow: function(planet){
            return `  
            <div class="">
                <tr>
                    <td> ${planet['name']} </td>
                    <td> ${planet['diameter']}  ${ planet['diameter'] != "unknown" ? ` KM` : ` -- `} </td>
                    <td> ${planet['climate']} </td>
                    <td> ${planet['terrain']} </td>
                    <td> ${planet['surface_water']}  ${ planet['surface_water'] != "unknown" ? ` %` : ` -- `} </td>
                    
                    <td> ${planet['population']} ${ planet['population'] != "unknown" ? ` people` : ` -- `} <td>
                    <td> ${ planet['residents'] == [] ?
                        ` NO RESIDENTS` : ` <button data-url="${planet['url']}" class="details"> RESIDENTS</button>`} 
                        
                    </td>
                </tr>
            </div> `
        }

};