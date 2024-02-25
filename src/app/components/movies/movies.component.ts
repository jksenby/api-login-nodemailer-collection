import { Component, OnInit } from "@angular/core";
import { MoviesService } from "src/app/services/movies.service";

@Component({
  selector: "app-movies",
  templateUrl: "movies.component.html",
  styleUrl: "movies.component.scss",
})
export class MoviesComponent implements OnInit {
  searchInput: string = "";
  loading: boolean = false;
  result: any;
  constructor(private moviesService: MoviesService) {}

  ngOnInit() {}

  onSubmit() {
    this.loading = true;
    this.moviesService.searchFor(this.searchInput).subscribe((result: any) => {
      this.result = result.contents;
      this.loading = false;
    });
  }
}
