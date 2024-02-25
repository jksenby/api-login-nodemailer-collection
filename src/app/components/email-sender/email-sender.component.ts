import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { EmailService } from "src/app/services/email.service";

@Component({
  selector: "app-email-sender",
  templateUrl: "email-sender.component.html",
  styleUrl: "email-sender.component.scss",
})
export class EmailSenderComponent implements OnInit {
  emailForm: FormGroup;
  loading: boolean = false;
  message: string;
  messageColor: string;

  constructor(private emailService: EmailService) {
    this.emailForm = new FormGroup({
      user: new FormControl(""),
      pass: new FormControl(""),
      to: new FormControl(""),
      subject: new FormControl(""),
      text: new FormControl(""),
      filename: new FormControl(null),
      content: new FormControl(null),
      service: new FormControl(""),
    });
  }

  ngOnInit() {}

  sendEmail() {
    this.loading = true;
    this.emailService.sendEmail(this.emailForm.value).subscribe({
      next: (result: any) => {
        this.message = result.message;
        this.messageColor = "green";
        this.loading = false;
      },
      error: (result) => {
        this.message = result.error.message;
        this.messageColor = "red";
        this.loading = false;
      },
    });
  }

  onFilePicked(event: Event) {
    this.emailForm.patchValue({
      filename: (event.target as HTMLInputElement).files[0].name,
    });
    this.readText(event).then((res) =>
      this.emailForm.patchValue({ content: res })
    );
  }

  async readText(event) {
    const file = event.target.files.item(0);
    return await file.text();
  }
}
