import { NgModule } from "@angular/core";
import { appRoutes } from "./appRoutes";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
