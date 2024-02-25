import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { HomeService } from "src/app/services/home.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-home",
  templateUrl: "home.component.html",
  styleUrl: "home.component.scss",
})
export class HomeComponent implements OnInit {
  constructor(
    private userService: UserService,
    private homeService: HomeService
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
}
