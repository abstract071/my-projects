<li data-city-name="<%= cityData.cityName/*.replace(/\s+/g, '')*/ %>">
    <div class="current-forecast">
        <header class="subheader">
            <time>10:19</time><span class="icon-refresh"></span>
            <h1><%- cityData.cityName.split(',')[0] %></h1>
            <h2>
                <time>monday, november 3 ${ '=))' }</time>
            </h2>
        </header>
        <div class="current-temperature icon-snow">
            <div class="current-state">
                <span class="temp">-2</span>
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
                    <li class="scroll-content-item ui-widget-header">
                        <span class="time">6:00</span>
                        <span class="icon icon-thunderstorm"></span>
                        <span class="temp">-2</span>
                    </li>
                    <li class="scroll-content-item ui-widget-header">
                        <span class="time">7:00</span>
                        <span class="icon icon-sleet-rain"></span>
                        <span class="temp">0</span>
                    </li>
                    <li class="scroll-content-item ui-widget-header">
                        <span class="time">8:00</span>
                        <span class="icon icon-partly-cloudy"></span>
                        <span class="temp">-2</span>
                    </li>
                    <li class="scroll-content-item ui-widget-header">
                        <span class="time">9:00</span>
                        <span class="icon icon-sunny"></span>
                        <span class="temp">0</span>
                    </li>
                    <li class="scroll-content-item ui-widget-header">
                        <span class="time">10:00</span>
                        <span class="icon icon-sunny"></span>
                        <span class="temp">0</span>
                    </li>
                    <li class="scroll-content-item ui-widget-header">
                        <span class="time">11:00</span>
                        <span class="icon icon-sunny"></span>
                        <span class="temp">0</span>
                    </li>
                    <li class="scroll-content-item ui-widget-header">
                        <span class="time">12:00</span>
                        <span class="icon icon-sunny"></span>
                        <span class="temp">0</span>
                    </li>
                    <li class="scroll-content-item ui-widget-header">
                        <span class="time">13:00</span>
                        <span class="icon icon-sunny"></span>
                        <span class="temp">0</span>
                    </li>
                    <li class="scroll-content-item ui-widget-header">
                        <span class="time">14:00</span>
                        <span class="icon icon-sunny"></span>
                        <span class="temp">0</span>
                    </li>
                    <li class="scroll-content-item ui-widget-header">
                        <span class="time">15:00</span>
                        <span class="icon icon-sunny"></span>
                        <span class="temp">0</span>
                    </li>
                    <li class="scroll-content-item ui-widget-header">
                        <span class="time">16:00</span>
                        <span class="icon icon-sunny"></span>
                        <span class="temp">0</span>
                    </li>
                    <li class="scroll-content-item ui-widget-header">
                        <span class="time">17:00</span>
                        <span class="icon icon-sunny"></span>
                        <span class="temp">0</span>
                    </li>
                    <li class="scroll-content-item ui-widget-header">
                        <span class="time">18:00</span>
                        <span class="icon icon-sunny"></span>
                        <span class="temp">0</span>
                    </li>
                    <li class="scroll-content-item ui-widget-header">
                        <span class="time">19:00</span>
                        <span class="icon icon-sunny"></span>
                        <span class="temp">0</span>
                    </li>
                    <li class="scroll-content-item ui-widget-header">
                        <span class="time">20:00</span>
                        <span class="icon icon-sunny"></span>
                        <span class="temp">0</span>
                    </li>
                    <li class="scroll-content-item ui-widget-header">
                        <span class="time">21:00</span>
                        <span class="icon icon-sunny"></span>
                        <span class="temp">0</span>
                    </li>
                    <li class="scroll-content-item ui-widget-header">
                        <span class="time">22:00</span>
                        <span class="icon icon-sunny"></span>
                        <span class="temp">0</span>
                    </li>
                    <li class="scroll-content-item ui-widget-header">
                        <span class="time">23:00</span>
                        <span class="icon icon-sunny"></span>
                        <span class="temp">0</span>
                    </li>
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

    <% var arrDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sut']; %>
    <% var today = new Date(); %>
    <% var todayIndex = today.getDay(); %>

    <div class="week-forecast">
        <ul>
            <li>
                <span class="day">today</span>
                <span class="weather-icon icon-heavy-snow"></span>
                <div class="temp-range">
                    <span class="bottom-temp"><%- Math.round(cityData.daily[0].temperatureMin) %></span>
                    <div class="box-range">
                        <span class="range"></span>
                    </div>
                    <span class="top-temp"><%- Math.round(cityData.daily[0].temperatureMax) %></span>
                </div>
            </li>
            <li>
                <span class="day"><%- arrDays[(++todayIndex)%7] %></span>
                <span class="weather-icon icon-sleet-rain"></span>
                <div class="temp-range">
                    <span class="bottom-temp"><%- Math.round(cityData.daily[1].temperatureMin) %></span>
                    <div class="box-range">
                        <span class="range"></span>
                    </div>
                    <span class="top-temp"><%- Math.round(cityData.daily[1].temperatureMax) %></span>
                </div>
            </li>
            <li>
                <span class="day"><%- arrDays[(++todayIndex)%7] %></span>
                <span class="weather-icon icon-sunny"></span>
                <div class="temp-range">
                    <span class="bottom-temp"><%- Math.round(cityData.daily[2].temperatureMin) %></span>
                    <div class="box-range">
                        <span class="range"></span>
                    </div>
                    <span class="top-temp"><%- Math.round(cityData.daily[2].temperatureMax) %></span>
                </div>
            </li>
            <li>
                <span class="day"><%- arrDays[(++todayIndex)%7] %></span>
                <span class="weather-icon icon-thunderstorm"></span>
                <div class="temp-range">
                    <span class="bottom-temp"><%- Math.round(cityData.daily[3].temperatureMin) %></span>
                    <div class="box-range">
                        <span class="range"></span>
                    </div>
                    <span class="top-temp"><%- Math.round(cityData.daily[3].temperatureMax) %></span>
                </div>
            </li>
            <li>
                <span class="day"><%- arrDays[(++todayIndex)%7] %></span>
                <span class="weather-icon icon-cloudy"></span>
                <div class="temp-range">
                    <span class="bottom-temp"><%- Math.round(cityData.daily[4].temperatureMin) %></span>
                    <div class="box-range">
                        <span class="range"></span>
                    </div>
                    <span class="top-temp"><%- Math.round(cityData.daily[4].temperatureMax) %></span>
                </div>
            </li>
            <li>
                <span class="day"><%- arrDays[(++todayIndex)%7] %></span>
                <span class="weather-icon icon-dust"></span>
                <div class="temp-range">
                    <span class="bottom-temp"><%- Math.round(cityData.daily[5].temperatureMin) %></span>
                    <div class="box-range">
                        <span class="range"></span>
                    </div>
                    <span class="top-temp"><%- Math.round(cityData.daily[5].temperatureMax) %></span>
                </div>
            </li>
            <li>
                <span class="day"><%- arrDays[(++todayIndex)%7] %></span>
                <span class="weather-icon icon-fog"></span>
                <div class="temp-range">
                    <span class="bottom-temp"><%- Math.round(cityData.daily[6].temperatureMin) %></span>
                    <div class="box-range">
                        <span class="range"></span>
                    </div>
                    <span class="top-temp"><%- Math.round(cityData.daily[6].temperatureMax) %></span>
                </div>
            </li>
        </ul>
    </div>
</li>


