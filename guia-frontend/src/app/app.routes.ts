import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';  
import { LoginComponent } from './login/login.component';
import { PlacesComponent } from './places/places.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { StadiumsComponent } from './stadiums/stadiums.component';
import { StayComponent } from './stay/stay.component';
import { CitiesComponent } from './cities/cities.component';
import { CityDetailComponent } from './city-detail/city-detail.component';
import { PlacesDetailComponent } from './places-detail/places-detail.component';
import { StadiumDetailComponent } from './stadium-detail/stadium-detail.component';
import { StayDetailComponent } from './stay-detail/stay-detail.component';
import { PostsComponent } from './posts/posts.component';


export const routes: Routes = [
    {
        path:'',
        component: HomeComponent,
    },{
        path:'login',
        component: LoginComponent,
    },{
        path:'places',
        component: PlacesComponent,
    },{
        path:'profile',
        component: ProfileComponent,
    },{
        path:'register',
        component: RegisterComponent,
    },{
        path:'stadiums',
        component: StadiumsComponent,
    },{
        path:'posting',
        component: PostsComponent

    },{
        path:'stay',
        component: StayComponent,
    },{
        path: 'cities',
        component:CitiesComponent,
    },{
        path: 'cities/:id', 
        component: CityDetailComponent
    },{
        path: 'stay/:id', 
        component: StayDetailComponent
    },{
        path:'places/:id',
        component: PlacesDetailComponent
    },{
        path:'stadium/:id',
        component: StadiumDetailComponent
    }
];
