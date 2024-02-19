import { Component, HostListener } from "@angular/core";
import { catchError } from "rxjs";
import { CityWeatherService } from "src/app/services/city.service";

@Component({
  selector: "app-city-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.scss"],
})
export class WeatherComponent {
  searchResult: boolean = false;
  cityName: string = localStorage.getItem("defaultCityName");
  cityWeatherData;
  scrollTop = window.screenY;
  @HostListener("window:scroll", []) onWindowScroll() {
    this.scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
  }
  cityPhoto: any = {
    results: [
      {
        urls: {
          full: "../../assets/images/Museum.jpg",
        },
      },
    ],
  };
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

  constructor(private cityWeather: CityWeatherService) {
    if (localStorage.getItem("defaultCityName")) this.onSubmitCityName();
  }

  async onSubmitCityName($event = null) {
    if ($event) $event.preventDefault();
    await this.cityWeather
      .getWeatherData(this.cityName)
      .pipe(
        catchError((err) => {
          this.searchResult = false;
          return err;
        })
      )
      .subscribe({
        next: (data: any) => {
          localStorage.setItem("defaultCityName", this.cityName);

          this.searchResult = true;
          this.cityWeatherData = data;
          this.cityWeather
            .getPhoto(this.cityName)
            .subscribe({ next: (photo: any) => (this.cityPhoto = photo) });
        },
      });
  }
  screen = screen;
  log() {
    console.log(this.scrollTop);
    console.log(screen.height);
  }

  getAllPhotos() {
    const urls: string[] = this.cityPhoto.results.map((item) => {
      return `url(${item.urls.full}) `;
    });
    return urls.toString();
  }

  getDay(day) {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return weekdays[new Date(day).getDay()];
  }
}
