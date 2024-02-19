import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import ITask from "../../../shared/models/task.model";
import { TaskService } from "src/app/services/task.service";
import { Priority } from "src/shared/enums/priority";
import { FormControl, Validators, FormGroup } from "@angular/forms";

import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit, AfterViewInit {
  createFormGroup: FormGroup;

  displayedColumns: string[] = [
    "name",
    "description",
    "readiness",
    "created",
    "priority",
    "delete",
  ];

  pageSize: number[] = [5, 7, 10];
  totalDataLength: number;
  @ViewChild("paginator") paginator: MatPaginator;
  priority = Priority;

  taskName: string;
  taskPriority: Priority;
  taskDescription: string;

  isReady: number = 0;
  priorityTask: number = 0;

  task: ITask[];

  dataSource: MatTableDataSource<ITask> = new MatTableDataSource<ITask>();

  serverMessage = {
    message: null,
    class: null,
  };

  fileUrl;

  constructor(
    private taskService: TaskService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getTasks();

    this.createFormGroup = new FormGroup({
      nameFormControl: new FormControl("", [Validators.required]),
      priorityFormControl: new FormControl("", [Validators.required]),
      descriptionFormControl: new FormControl(""),
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getTasks() {
    this.taskService.getTasks(this.priorityTask, this.isReady).subscribe({
      next: (task: ITask[]) => {
        this.task = task;
        this.totalDataLength = this.task.length;
        this.dataSource = new MatTableDataSource(this.task);
      },
      error: (e) => {
        alert(e.message);
      },
    });
  }

  toggleReadiness(id, readiness) {
    return this.taskService.taskToggle(id, !readiness).subscribe({
      next: (res) => {
        this.getTasks();
      },
      error: (e) => {
        alert(e.message);
      },
    });
  }

  select(value) {
    if (value === this.isReady) this.isReady = 0;
    else this.isReady = value;
    this.getTasks();
  }

  format(stringDate: string) {
    return new Date(stringDate).toLocaleString();
  }

  createTask() {
    if (this.createFormGroup.invalid) return;

    const task: ITask = {
      name: this.taskName,
      created: new Date(),
      readiness: false,
      description: this.taskDescription,
      priority: this.taskPriority,
    };

    return this.taskService.createTask(task).subscribe({
      next: () => {
        this.serverMessage.message = "The task has created";
        this.serverMessage.class = "green";
        setTimeout(() => (this.serverMessage.message = null), 8000);
        this.getTasks();
      },
      error: (e: any) => {
        this.serverMessage.message = e.message;
        this.serverMessage.class = "red";
      },
    });
  }

  deleteTask(id) {
    document.querySelector("#trash" + id).classList.add("fa-bounce");
    this.taskService.deleteTask(id).subscribe({
      next: (response) => {
        this.getTasks();
      },
      error: (e) => {
        alert(e.message);
      },
    });
  }

  downloadResult() {
    const blob = new Blob([JSON.stringify(this.task)], {
      type: "application/octet-stream",
    });
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      window.URL.createObjectURL(blob)
    );
  }
}
