import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable()
export class MusicService {
  constructor(private http: HttpClient) {}
  ACCESS_TOKEN =
    "Zo4qHyu3FKH8h4ezg2bfyNRsPv5BkntMAF_b7fRAbPnOfkvov3YQdraI1ZbHYkij";
  searchFor(searchInput: string) {
    const params = new HttpParams()
      .set("q", searchInput)
      .set("per_page", "10")
      .set("page", "1");
    const headers = new HttpHeaders({
      "X-RapidAPI-Key": "b1e5646d2amsh650db7c12d103c5p10bc51jsn9019a9ff1f60",
      "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
    });
    return this.http.get("https://genius-song-lyrics1.p.rapidapi.com/search/", {
      headers,
      params,
    });
  }
}
