import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import ITask from "../../shared/models/task.model";
import { Observable } from "rxjs";
import mongoose from "mongoose";

@Injectable()
export class TaskService {
  constructor(private http: HttpClient) {}

  options = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  createTask(body) {
    return this.http.post("http://localhost:3000/tasks", body, this.options);
  }

  getTasks(priority: number | null, isReady: number = 0, id: string) {
    const params = new HttpParams()
      .set("priority", priority)
      .set("isReady", isReady)
      .set("id", id + "");
    return this.http.get("http://localhost:3000/tasks", { params });
  }

  taskToggle(id, readiness) {
    return this.http.put(
      "http://localhost:3000/tasks",
      { id, readiness },
      this.options
    );
  }

  deleteTask(id) {
    return this.http.delete(`http://localhost:3000/tasks/${id}`, this.options);
  }
}
