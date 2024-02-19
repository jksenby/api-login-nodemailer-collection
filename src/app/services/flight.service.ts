import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { switchMap, map } from "rxjs";

@Injectable()
export class FlightService {
  _apiKeyNinja: string = "IAG81cwWmaNjJKPq2bBEpA==SmhgkHEoNoRqIbdT";
  constructor(private http: HttpClient) {}

  getTicket(from, to, departureDate, adults, childs, infants, currency) {
    const headers = new HttpHeaders({ "X-Api-Key": this._apiKeyNinja });
    return this.http
      .get(`https://api.api-ninjas.com/v1/airports?name=${from}`, { headers })
      .pipe(
        switchMap((departationPlace) => {
          return this.http
            .get(`https://api.api-ninjas.com/v1/airports?name=${to}`, {
              headers,
            })
            .pipe(
              switchMap((arrivalPlace) => {
                return this.http
                  .get(
                    `https://api.flightapi.io/onewaytrip/65b572e573fd63a81fe43e14/${
                      departationPlace[0].iata
                    }/${
                      arrivalPlace[0].iata
                    }/${departureDate}/${+adults}/${+childs}/${+infants}/Economy/${currency}`
                  )
                  .pipe(
                    map((result) => {
                      return [
                        result,
                        departationPlace[0].iata,
                        arrivalPlace[0].iata,
                      ];
                    })
                  );
              })
            );
        })
      );
  }
}
