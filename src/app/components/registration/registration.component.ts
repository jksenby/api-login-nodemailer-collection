import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrl: "./registration.component.scss",
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (
      this.f.firstName.value.length > 0 &&
      this.f.lastName.value.length > 0 &&
      this.f.email.value.length > 9 &&
      this.f.username.value.length > 5 &&
      this.f.password.value.length > 8
    ) {
      this.userService
        .createUser({
          firstName: this.f.firstName.value,
          lastName: this.f.lastName.value,
          email: this.f.email.value,
          username: this.f.username.value,
          password: this.f.password.value,
          pfp: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1084px-Unknown_person.jpg",
        })
        .subscribe((res) => {
          if (res.message) {
            alert("Something went wrong");
          } else {
            if (res.check) {
              alert(res.check);
            } else alert("You succussfully signed up");
          }
        });
    } else {
      alert("Validation is wrong");
    }
  }
}
