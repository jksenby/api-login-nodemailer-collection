import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import ITask from "../../../shared/models/task.model";
import { TaskService } from "src/app/services/task.service";
import { Priority } from "src/shared/enums/priority";
import { FormControl, Validators, FormGroup } from "@angular/forms";

import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

import { DomSanitizer } from "@angular/platform-browser";
import mongoose from "mongoose";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-todolist",
  templateUrl: "./todolist.component.html",
  styleUrl: "./todolist.component.scss",
})
export class TodolistComponent implements OnInit, AfterViewInit {
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

  isReady: number = 0;
  priorityTask: number = 0;

  task: ITask[];

  dataSource: MatTableDataSource<ITask> = new MatTableDataSource<ITask>();

  serverMessage = {
    message: null,
    class: null,
  };

  fileUrl;

  user;

  constructor(
    private taskService: TaskService,
    private sanitizer: DomSanitizer,
    private userService: UserService
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
    this.userService.getTempUser().subscribe((user) => {
      this.taskService
        .getTasks(this.priorityTask, this.isReady, user[0].userId)
        .subscribe({
          next: (task: ITask[]) => {
            this.task = task;
            this.totalDataLength = this.task.length;
            this.dataSource = new MatTableDataSource(this.task);
          },
          error: (e) => {
            alert(e.message);
          },
        });
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
    this.userService.getTempUser().subscribe((user) => {
      const task = {
        name: this.createFormGroup.controls.nameFormControl.value,
        created: new Date(),
        readiness: false,
        description: this.createFormGroup.controls.descriptionFormControl.value,
        priority: this.createFormGroup.controls.priorityFormControl.value,
        userId: user[0].userId,
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
