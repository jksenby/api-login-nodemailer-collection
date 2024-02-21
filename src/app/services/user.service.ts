import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  options = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  createUser(body): Observable<any> {
    return this.http.post("http://localhost:3000/users", body, this.options);
  }

  putTempUser(username, password): Observable<any> {
    return this.http.put<Observable<any>>(
      "http://localhost:3000/tempUser/65d60450684da12832039223",
      {
        username,
        password,
      },
      this.options
    );
  }

  getTempUser() {
    return this.http.get("http://localhost:3000/tempUser");
  }

  getUser(username) {
    return this.http.get("http://localhost:3000/users/" + username);
  }

  deleteTask(id) {
    return this.http.delete(`http://localhost:3000/tasks/${id}`, this.options);
  }
}
