import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import ITask from "../../shared/models/task.model";
import { Observable } from "rxjs";

@Injectable()
export class TaskService {
  constructor(private http: HttpClient) {}

  options = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  createTask(body: ITask): Observable<ITask> {
    return this.http.post<ITask>(
      "http://localhost:3000/tasks",
      body,
      this.options
    );
  }

  getTasks(priority: number | null, isReady: number = 0) {
    const params = new HttpParams()
      .set("priority", priority)
      .set("isReady", isReady);
    return this.http.get<ITask[]>("http://localhost:3000/tasks", { params });
  }

  taskToggle(id, readiness) {
    return this.http.put<ITask>(
      "http://localhost:3000/tasks",
      { id, readiness },
      this.options
    );
  }

  deleteTask(id) {
    return this.http.delete(`http://localhost:3000/tasks/${id}`, this.options);
  }
}
