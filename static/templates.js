let content = {
    getRow: function(planet){
            return `  
            <div class="card board-${board.id}">
                <tr>
                    <td> {{ planet['name'] }}</td>
                    <td> {{ planet['diameter'] }} {% if planet['diameter'] != 'unknown' %} KM{%endif%}</td>
                    <td> {{ planet['climate'] }}</td>
                    <td> {{ planet['terrain'] }}</td>
                    <td> {{ planet['surface_water'] }}{% if planet['surface_water'] != 'unknown' %}%{% endif %}</td>
                    <td> {{ planet['population'] }}{% if planet['population'] != 'unknown' %} people{% endif %}</td>
                    <td>
                        {% if (planet['residents'] == []) %}
                            NO RESIDENTS
                        {% else %}
                            RESIDENTS
                            <!--<button data-url="{{ planet['url'] }}" class="details"> Known residents</button>-->
                        {% endif %}
                    </td>
                </tr>
            </div> `
        }

};