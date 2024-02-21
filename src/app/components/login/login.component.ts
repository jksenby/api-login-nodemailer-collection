import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user.service";

@Component({
  templateUrl: "login.component.html",
  styleUrl: "login.component.scss",
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private _route: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.userService
      .putTempUser(this.f.username.value, this.f.password.value)
      .subscribe({
        next: (res) => {
          alert(res.message);
          this._route.navigate(["/"]).then(() => window.location.reload());
        },
        error: (err) => alert(err.error.message),
      });
  }
}
