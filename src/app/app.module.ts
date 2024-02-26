import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { HttpClientModule } from "@angular/common/http";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatChipsModule } from "@angular/material/chips";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDialogModule } from "@angular/material/dialog";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { AngularYandexMapsModule, YaConfig } from "angular8-yandex-maps";

import { AppComponent } from "./app.component";
import { TodolistComponent } from "src/app/components/todolist/todolist.component";
import { HeaderComponent } from "src/app/components/header/header.component";
import { FooterComponent } from "src/app/components/footer/footer.component";
import { WeatherComponent } from "src/app/components/weather/weather.component";
import { MapComponent } from "src/app/components/map/map.component";
import { FlightsComponent } from "src/app/components/flights/flights.component";
import { LoginComponent } from "src/app/components/login/login.component";
import { RegistrationComponent } from "src/app/components/registration/registration.component";
import { ProfileComponent } from "src/app/components/profile/profile.component";
import { EditDialogComponent } from "src/app/components/edit-dialog/edit-dialog.component";
import { EmailSenderComponent } from "src/app/components/email-sender/email-sender.component";
import { HomeComponent } from "src/app/components/home/home.component";
import { MusicComponent } from "src/app/components/music/music.component";
import { GamesComponent } from "src/app/components/games/games.component";
import { MoviesComponent } from "./components/movies/movies.component";
import { ItemDialogComponent } from "src/app/components/item-dialog/item-dialog.component";

import { TaskService } from "src/app/services/task.service";
import { CityWeatherService } from "src/app/services/city.service";
import { FlightService } from "src/app/services/flight.service";
import { UserService } from "src/app/services/user.service";
import { EmailService } from "src/app/services/email.service";
import { HomeService } from "src/app/services/home.service";
import { MusicService } from "src/app/services/music.service";
import { GamesService } from "src/app/services/games.service";
import { MoviesService } from "src/app/services/movies.service";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material/dialog";

const mapConfig: YaConfig = {
  apikey: "cd3af09d-12bb-4f94-afc1-66f70598c033",
  lang: "en_US",
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularYandexMapsModule.forRoot(mapConfig),
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatChipsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
  ],
  declarations: [
    AppComponent,
    TodolistComponent,
    FooterComponent,
    HeaderComponent,
    WeatherComponent,
    MapComponent,
    FlightsComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    EditDialogComponent,
    EmailSenderComponent,
    HomeComponent,
    MusicComponent,
    GamesComponent,
    MoviesComponent,
    ItemDialogComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    TaskService,
    CityWeatherService,
    FlightService,
    UserService,
    provideNativeDateAdapter(),
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    EmailService,
    HomeService,
    MusicService,
    GamesService,
    MoviesService,
  ],
})
export class AppModule {}
