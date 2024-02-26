import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { HomeService } from "src/app/services/home.service";
import { UserService } from "src/app/services/user.service";
import { ItemDialogComponent } from "../item-dialog/item-dialog.component";

@Component({
  selector: "app-home",
  templateUrl: "home.component.html",
  styleUrl: "home.component.scss",
})
export class HomeComponent implements OnInit {
  constructor(
    private userService: UserService,
    private homeService: HomeService,
    public dialog: MatDialog
  ) {}
  newItemForm: FormGroup;
  isAdmin: boolean = false;
  loading: boolean = false;
  items: any = null;
  onRussian: boolean = false;
  ngOnInit() {
    this.userService.getTempUser().subscribe((result: any) => {
      this.isAdmin = result[0].isAdmin;
      if (this.isAdmin) {
        this.newItemForm = new FormGroup({
          name: new FormControl(""),
          nameOnRussian: new FormControl(""),
          description: new FormControl(""),
          descriptionOnRussian: new FormControl(""),
          image: new FormControl(""),
        });
      }
    });
    this.getAllItems();
  }

  getAllItems() {
    this.homeService.getAllItems().subscribe((result: any) => {
      this.items = result;
    });
  }

  onSubmit() {
    this.loading = true;
    this.homeService.postNewItem(this.newItemForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.getAllItems();
        alert("The item successfully added");
      },
      error: (res) => {
        this.loading = false;
        alert(res.error.message);
      },
    });
  }
  deleteItem(id) {
    this.homeService.deleteItem(id).subscribe(() => {
      this.getAllItems();
    });
  }
  putItem(item) {
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      data: item,
      hasBackdrop: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      const body = {
        image: result.image,
        name: result.image,
        nameOnRussian: result.nameOnRussian,
        description: result.description,
        descriptionOnRussian: result.descriptionOnRussian,
        created: item.created,
        _id: item._id,
      };
      this.homeService.putItem(body).subscribe(() => {
        window.location.reload();
      });
    });
  }
}
