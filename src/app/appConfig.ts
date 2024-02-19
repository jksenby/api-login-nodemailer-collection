import { provideRouter } from "@angular/router";
import { ApplicationConfig } from "@angular/core";
import { appRoutes } from "./appRoutes";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideAnimations(), provideAnimationsAsync()],
};
