import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable()
export class GamesService {
  constructor(private http: HttpClient) {}
  searchFor(searchInput: string, category: string) {
    const params = new HttpParams().set("searchWords", searchInput);
    const headers = new HttpHeaders({
      "X-RapidAPI-Key": "b1e5646d2amsh650db7c12d103c5p10bc51jsn9019a9ff1f60",
      "X-RapidAPI-Host": "epic-store-games.p.rapidapi.com",
    });
    return this.http.get(
      "https://epic-store-games.p.rapidapi.com/" + category,
      {
        headers,
        params,
      }
    );
  }
}
