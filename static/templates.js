let templates = {
    getRow: function(planet){
            return `  
            <div class="">
                <tr>
                    <td class="text-left"> ${planet['name']} </td>
                    <td> ${planet['diameter']}  ${ planet['diameter'] != "unknown" ? ` KM` : `?`} </td>
                    <td> ${planet['climate']} </td>
                    <td> ${planet['terrain']} </td>
                    <td> ${planet['surface_water']}  ${ planet['surface_water'] != "unknown" ? ` %` : `?`} </td>
                    
                    
                    <td> ${ planet['population'] != "unknown" ? `${ Number(planet['population']).toLocaleString()} people` : `unknown`} </td>
                    <td class="text-center" > ${ planet['residents'].length == 0 ?
                        ` NO RESIDENTS` : ` 
                            <button data-url="${planet['url']}" type="button" class="residents btn btn-outline-light" data-toggle="modal" data-target="#modal"> RESIDENTS</button>
                              `} 
                     </td>
                </tr>
            </div> `
        },

    getRowHeader: function(){
        return ` 
                <tr>
                    <thead class="thead-dark">
                        <th class="text-left">Name</th>
                        <th>Diameter</th>
                        <th>Climate</th>
                        <th>Terrain</th>
                        <th>Surface water</th>
                        <th>Population</th>
                        <th class="text-center">Population details</th>
                    </thead>
                </tr> `
    },

    getResidents: function(resident){
            return`   <tr>
                    <td class="text-left"> ${resident['name']} </td>
                    <td> ${resident['height']}  </td>
                    <td> ${resident['mass']} </td>
                    <td> ${resident['hair_color']} </td>
                    <td> ${resident['skin_color']} </td>
                    <td> ${resident['eye_color']} </td>
                    <td> ${resident['birth_year']} </td>
                    <td> ${resident['gender']} </td>
                </tr>          `
        },


    getResidentHeader: function(){
        return ` 
                <tr>
                 <thead>
                    <th class="text-left">Name</th>
                    <th>Height</th>
                    <th>Mass</th>
                    <th>Hair color</th>
                    <th>Skin color</th>
                    <th>Eye color</th>
                    <th>Birth year</th>
                    <th>Gender</th>
                 </thead>
                </tr>  `
    }

// ${ Number(planet['population']).toLocaleString()}
};