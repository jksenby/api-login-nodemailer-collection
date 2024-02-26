import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-edit-dialog",
  templateUrl: "item-dialog.component.html",
  styleUrl: "item-dialog.component.scss",
})
export class ItemDialogComponent implements OnInit {
  editForm: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<ItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  onSubmit(): void {
    this.dialogRef.close(this.editForm.value);
  }

  ngOnInit() {
    this.editForm = new FormGroup({
      name: new FormControl(this.data.name),
      nameOnRussian: new FormControl(this.data.nameOnRussian),
      description: new FormControl(this.data?.description),
      descriptionOnRussian: new FormControl(this.data?.descriptionOnRussian),
      image: new FormControl(this.data?.image),
    });
  }
}
