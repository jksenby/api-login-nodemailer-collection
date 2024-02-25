import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
    public dialog: MatDialog,
    private router: Router
  ) {}

  user: any;

  ngOnInit() {
    this.getUser();
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: this.user,
      hasBackdrop: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      const body = {
        id: this.user._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: this.user.email,
        username: this.user.username,
        password: this.user.password,
        pfp: this.user.pfp,
        gender: result.gender,
        country: result.country,
        phone: result.phone,
        age: result.age,
        isAdmin: result.isAdmin,
      };
      this.userService.updateUser(body).subscribe(() => {
        this.getUser();
      });
    });
  }
  getUser() {
    this._route.params.subscribe((res) => {
      this.userService
        .getUser(res.username)
        .subscribe((user) => (this.user = user[0]));
    });
  }

  logout() {
    this.userService
      .logoutTempUser(this.user.username, this.user.isAdmin)
      .subscribe({
        next: (res) => {
          alert(res.message);
          this.router.navigate(["/"]).then(() => window.location.reload());
        },
        error: (err) => alert(err.error.message),
      });
  }
}
