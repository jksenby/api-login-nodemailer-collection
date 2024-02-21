import { Routes } from "@angular/router";
import { TodolistComponent } from "./components/todolist/todolist.component";
import { MapComponent } from "./components/map/map.component";
import { WeatherComponent } from "./components/weather/weather.component";
import { FlightsComponent } from "./components/flights/flights.component";
import { LoginComponent } from "./components/login/login.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { ProfileComponent } from "./components/profile/profile.component";

export const appRoutes: Routes = [
  { path: "todolist", component: TodolistComponent },
  { path: "map", component: MapComponent },
  { path: "weather", component: WeatherComponent },
  { path: "flights", component: FlightsComponent },
  {
    path: "authorization",
    children: [
      { path: "registration", component: RegistrationComponent },
      { path: "login", component: LoginComponent },
    ],
  },
  { path: "profile/:username", component: ProfileComponent },
  { path: "**", component: FlightsComponent },
];
