import { Component, OnInit } from "@angular/core";
import { CityWeatherService } from "../../services/city.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
  cityData: any;
  cityName: string;

  searchLat;
  searchLon;

  monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  constructor(private cityWeather: CityWeatherService) {}
  ngOnInit(): void {}

  formatTimeDifference(timeDifferenceInSeconds) {
    let timeDifferenceInMillis = timeDifferenceInSeconds * 1000;

    let currentDate = new Date();

    currentDate.setTime(currentDate.getTime() + timeDifferenceInMillis);

    let day = currentDate.getUTCDate().toString();
    let month = currentDate.getUTCMonth().toString();
    let hours = currentDate.getUTCHours().toString();
    let minutes = currentDate.getUTCMinutes().toString();

    day = +day < 10 ? "0" + day : day;
    hours = +hours < 10 ? "0" + hours : hours;
    minutes = +minutes < 10 ? "0" + minutes : minutes;

    return { day, hours, minutes, month: this.monthNames[+month] };
  }

  onMapClick(event) {
    console.log(event.target);
    const [lat, lon] = event.target._yandexState._model.bounds[1];
    this.cityWeather.getCurrentWeather(lat, lon).subscribe({
      next: (data: any) => (this.cityData = data),
    });
  }
  onSubmitCityName(e) {
    e.preventDefault();
    this.cityWeather.getCity(this.cityName).subscribe({
      next: (data: any) => {
        this.searchLat = data[0].lat;
        this.searchLon = data[0].lon;
      },
    });
  }
}
