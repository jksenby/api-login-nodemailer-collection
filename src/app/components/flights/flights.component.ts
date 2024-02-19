import { Component } from "@angular/core";
import { FlightService } from "../../services/flight.service";

@Component({
  selector: "flights-weather-app",
  templateUrl: "./flights.component.html",
  styleUrls: ["flights.component.scss"],
})
export class FlightsComponent {
  flightData: any;

  from: string;
  to: string;
  departureDate: Date = new Date();
  adults: any;
  childs: any;
  infants: any;
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

  arrival;
  departure;

  currensies: any = [
    {
      viewValue: "Tenge",
      value: "KZT",
    },
    {
      viewValue: "Ruble",
      value: "RUB",
    },
    {
      viewValue: "Dollar",
      value: "USD",
    },
  ];
  selectedCurrency: string = "KZT";
  loading: boolean = false;

  constructor(private flightService: FlightService) {}
  onSubmit() {
    this.loading = true;
    this.flightService
      .getTicket(
        this.from,
        this.to,
        new Date(
          this.departureDate.getTime() -
            this.departureDate.getTimezoneOffset() * 60000
        )
          .toISOString()
          .split("T")[0],
        this.adults,
        this.childs,
        this.infants,
        this.selectedCurrency
      )
      .subscribe({
        next: (data: any) => {
          this.loading = false;
          this.flightData = data[0];
          this.departure = data[1];
          this.arrival = data[2];
          console.log(data);
        },
      });
  }

  formatPrice(price: string) {
    let currency: string = "";
    switch (this.flightData.query.currency) {
      case "KZT":
        currency = "₸";
        break;
      case "USD":
        currency = "$";
        break;
      case "RUB":
        currency = "₽";
        break;
      default:
        currency = "₸";
    }
    price = +Math.round(+price) + "";
    let i: number = price.length - 3;

    while (i > 0) {
      price = price.slice(0, i) + "," + price.slice(i);
      i -= 3;
    }
    return currency === "$" ? currency + price : price + currency;
  }
  formatDate(date: string) {
    const month = +date.slice(5, 7);
    const day = +date.slice(8, 10);
    const time = date.slice(11);
    const year = +date.slice(0, 4);

    return {
      month: this.monthNames[month - 1],
      day,
      time,
      year,
      monthIndex: month - 1,
    };
  }
  formatTimeDuration(
    year,
    month,
    day,
    hours,
    minutes,
    seconds,
    year2,
    month2,
    day2,
    hours2,
    minutes2,
    seconds2
  ) {
    return this.msToHMS(
      new Date(year2, month2, day2, hours2, minutes2, seconds2).getTime() -
        new Date(year, month, day, hours, minutes, seconds).getTime()
    );
  }
  log() {
    console.log(this.arrival - this.departure);
  }
  msToHMS(ms) {
    let seconds = ms / 1000;
    const hours = seconds / 3600;
    const minutes = (ms / 1000 / 60) % 60;
    seconds = seconds % 60;
    return (
      Math.floor(hours) +
      "h " +
      Math.floor(minutes) +
      "m " +
      Math.floor(seconds) +
      "s"
    );
  }
}
