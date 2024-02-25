import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class EmailService {
  constructor(private http: HttpClient) {}

  sendEmail(form) {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post("http://localhost:3000/sendEmail", form, { headers });
  }
}
