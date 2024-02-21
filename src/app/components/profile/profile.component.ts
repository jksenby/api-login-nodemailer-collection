import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { EditDialogComponent } from "../edit-dialog/edit-dialog.component";

import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-profile",
  templateUrl: "profile.component.html",
  styleUrl: "profile.component.scss",
})
export class ProfileComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  user;

  ngOnInit() {
    this._route.params.subscribe((res) => {
      this.userService
        .getUser(res.username)
        .subscribe((user) => (this.user = user[0]));
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
