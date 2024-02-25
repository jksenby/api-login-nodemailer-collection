import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { text } from "body-parser";
import { EmailService } from "src/app/services/email.service";
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
    private userService: UserService,
    private emailService: EmailService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]],
      isAdmin: [false, Validators.required],
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
          isAdmin: this.f.isAdmin.value,
        })
        .subscribe((res) => {
          if (res.message) {
            alert("Something went wrong");
          } else {
            if (res.check) {
              alert(res.check);
            } else {
              this.emailService
                .sendEmail({
                  user: "zhalgas.karsenbai@gmail.com",
                  pass: "hbqd buof bqjo owft",
                  to: this.f.email.value,
                  subject:
                    "Congratulations! You have registered to our web site",
                  text: "Yeah my boy",
                  filename: null,
                  content: null,
                  service: ".gmail.com",
                })
                .subscribe();
              alert("You succussfully signed up");
            }
          }
        });
    } else {
      alert("Validation is wrong");
    }
  }
}
