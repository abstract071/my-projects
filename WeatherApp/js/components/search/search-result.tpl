<% var id = cityElement.cityName.replace(/\s+/g, '') %>

<li>
    <span class="city-weather icon-sunny"></span>
    <span class="city-temperature">32</span>
    <div>
        <span class="city-text"><%- cityElement.cityName %></span>
        <span class="city-state-text">//mostly sunny</span>
    </div>
    <% if (!isChecked) { %>
    <input type="checkbox" id="<%- id %>"/>
    <label for="<%- id %>"><span class="icon-check"></span></label>
    <% } %>
</li>

