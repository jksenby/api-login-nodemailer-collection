import { Component, OnInit } from "@angular/core";
import { MusicService } from "src/app/services/music.service";

@Component({
  selector: "app-music",
  templateUrl: "music.component.html",
  styleUrl: "music.component.scss",
})
export class MusicComponent implements OnInit {
  searchInput: string = "";
  loading: boolean = false;
  result: any;
  constructor(private musicService: MusicService) {}

  ngOnInit() {}

  onSubmit() {
    this.loading = true;
    this.musicService.searchFor(this.searchInput).subscribe((result: any) => {
      console.log(result);
      this.loading = false;
      this.result = result.hits;
    });
  }
}
