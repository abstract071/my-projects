<% console.log(cityData) %>
<% var degrees = {} %>
<li data-city-name="<%= cityData.cityName/*.replace(/\s+/g, '')*/ %>">
    <div class="current-forecast">
        <header class="subheader">
            <time>10:19</time><span class="icon-refresh"></span>
            <h1><%- cityData.cityName.split(',')[0] %></h1>
            <h2>
                <time>monday, november 3 ${ '=))' }</time>
            </h2>
        </header>
        <div class="current-temperature icon-<%= cityData.icon %>">
            <div class="current-state">
                <% degrees.celsius = cityData.convertToCelsius(cityData.temperature) %>
                <% degrees.fahrenheit = Math.round(cityData.temperature) %>
                <span class="temp" data-fahrenheit="<%= degrees.fahrenheit %>" data-celsius="<%= degrees.celsius %>"><%- degrees[typeOfDegrees] %></span>
                <span class="state-text">//mostly cloudy</span>
            </div>
            <div class="astronomical-data">
                <span class="icon-almost-old"></span>
                <time>6:20</time>
            </div>
        </div>
        <div class="weather-slider">
            <div class="scroll-pane ui-widget ui-widget-header ui-corner-all">
                <ul class="scroll-content">
                    <% var hours = _.map(_.pluck(cityData.hourly, 'time'), function(time) { return (new Date(time*1000)).getHours().toFixed(2); }) %>
                    <% var hourlyTemperature = _.pluck(cityData.hourly, 'temperature') %>
                    <% for (var i = 0; i < 24; i++) { %>
                    <li class="scroll-content-item ui-widget-header">
                        <span class="time"><%- hours[i] %></span>
                        <span class="icon icon-<%= cityData.hourly[i].icon %>"></span>
                        <% degrees.celsius = cityData.convertToCelsius(hourlyTemperature[i]) %>
                        <% degrees.fahrenheit = Math.round(hourlyTemperature[i]) %>
                        <span class="temp" data-fahrenheit="<%= degrees.fahrenheit %>" data-celsius="<%= degrees.celsius %>"><%- degrees[typeOfDegrees] %></span>
                    </li>
                    <% } %>
                </ul>
            </div>
            <div class="scroll-bar-wrap ui-widget-content ui-corner-bottom">
                <div class="scroll-bar"></div>
            </div>
        </div>

        <ul class="addition-conditions">
            <li>
                <span class="icon icon-humidity"></span>
                <span class="info">50%</span>
            </li>
            <li>
                <span class="icon icon-wind-direction"></span>
                <span class="info">5<sup>m/s</sup></span>
            </li>
            <li>
                <span class="icon icon-sunset"></span>
                <span class="info">6:20</span>
            </li>
            <li>
                <span class="icon icon-sunrise"></span>
                <span class="info">16:20</span>
            </li>
        </ul>
    </div>

    <% var arrDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']; %>
    <% var today = new Date(); %>
    <% var todayIndex = today.getDay(); %>

    <div class="week-forecast">
        <ul>
            <% for (var i = 0; i < 7; i++) { %>
            <li>
                <span class="day"><%- (!i) ? 'today' : arrDays[(++todayIndex)%7] %></span>
                <span class="weather-icon icon-<%= cityData.daily[i].icon %>"></span>
                <div class="temp-range">
                    <% degrees.celsius = cityData.convertToCelsius(cityData.daily[i].temperatureMin) %>
                    <% degrees.fahrenheit = Math.round(cityData.daily[i].temperatureMin) %>

                    <span class="bottom-temp" data-fahrenheit="<%= degrees.fahrenheit %>" data-celsius="<%= degrees.celsius %>"><%- degrees[typeOfDegrees] %></span>
                    <!--<div class="box-range">-->
                        <span class="range"></span>
                    <!--</div>-->
                    <% degrees.celsius = cityData.convertToCelsius(cityData.daily[i].temperatureMax) %>
                    <% degrees.fahrenheit = Math.round(cityData.daily[i].temperatureMax) %>
                    <span class="top-temp" data-fahrenheit="<%= degrees.fahrenheit %>" data-celsius="<%= degrees.celsius %>"><%- degrees[typeOfDegrees] %></span>
                </div>
            </li>
            <% } %>
        </ul>
    </div>
</li>


