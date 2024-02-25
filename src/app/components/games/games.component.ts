import { Component, OnInit } from "@angular/core";
import { GamesService } from "src/app/services/games.service";

@Component({
  selector: "app-games",
  templateUrl: "games.component.html",
  styleUrl: "games.component.scss",
})
export class GamesComponent implements OnInit {
  searchInput: string = "";
  loading: boolean = false;
  result: any;
  category: string = "onSale";
  constructor(private gamesService: GamesService) {}

  ngOnInit() {}

  onSubmit() {
    this.loading = true;
    this.gamesService
      .searchFor(this.searchInput, this.category)
      .subscribe((result) => {
        this.result = result;
        this.loading = false;
      });
  }
}
