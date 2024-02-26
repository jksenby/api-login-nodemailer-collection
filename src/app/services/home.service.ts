import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class HomeService {
  constructor(private http: HttpClient) {}

  options = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  postNewItem(form): Observable<any> {
    return this.http.post(
      "http://localhost:3000/main-page",
      form,
      this.options
    );
  }

  getAllItems(): Observable<any> {
    return this.http.get("http://localhost:3000/main-page");
  }

  deleteItem(id) {
    return this.http.delete("http://localhost:3000/main-page/" + id);
  }

  putItem(item) {
    return this.http.put(
      "http://localhost:3000/main-page/" + item._id,
      item,
      this.options
    );
  }
}
