import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-edit-dialog",
  templateUrl: "edit-dialog.component.html",
  styleUrl: "edit-dialog.component.scss",
})
export class EditDialogComponent implements OnInit {
  editForm: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  onSubmit(): void {
    this.dialogRef.close(this.editForm.value);
  }

  ngOnInit() {
    this.editForm = new FormGroup({
      firstName: new FormControl(this.data.firstName),
      lastName: new FormControl(this.data.lastName),
      gender: new FormControl(this.data?.gender),
      country: new FormControl(this.data?.country),
      phone: new FormControl(this.data?.phone),
      age: new FormControl(this.data?.age),
    });
  }
}
