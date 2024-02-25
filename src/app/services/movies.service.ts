import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable()
export class MoviesService {
  constructor(private http: HttpClient) {}
  searchFor(searchInput: string) {
    const params = new HttpParams().set("query", searchInput);
    const headers = new HttpHeaders({
      "X-RapidAPI-Key": "b1e5646d2amsh650db7c12d103c5p10bc51jsn9019a9ff1f60",
      "X-RapidAPI-Host": "movies-api14.p.rapidapi.com",
    });
    return this.http.get("https://movies-api14.p.rapidapi.com/search", {
      headers,
      params,
    });
  }
}
