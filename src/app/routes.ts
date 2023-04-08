import { Routes } from "@angular/router";
import { HomeComponent } from "./screens/home/home.component";
import { LoginComponent } from "./screens/login/login.component";
import { AuthGuard } from "./_guards/auth.guard";
import { MapComponent } from "./screens/map/map.component";

export const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard], pathMatch: 'full' },
    { path: 'home', component: HomeComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'map', component: MapComponent, pathMatch: 'full' },
    { path: 'map/:uuid', component: MapComponent, pathMatch: 'full' },
    { path: "**", redirectTo: "home" },
];