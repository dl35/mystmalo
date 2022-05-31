import { WebcamManageComponent } from './webcam-manage/webcam-manage.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {YouTubePlayerModule} from '@angular/youtube-player';
import { MaterialModule } from './material/material.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MeteoComponent } from './meteo/meteo.component';
import { MareeComponent } from './maree/maree.component';
import { PortComponent } from './port/port.component';
import { ActualitesComponent } from './actualites/actualites.component';
import { AgendaComponent } from './agenda/agenda.component';
import { MenuComponent } from './menu/menu.component';
import { WebcamComponent } from './webcam/webcam.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { DescPipe } from './pipe/desc.pipe';
import { DirectionPipe } from './pipe/direction.pipe';



@NgModule({
  declarations: [
    AppComponent,
    MeteoComponent,
    MareeComponent,
    PortComponent,
    ActualitesComponent,
    AgendaComponent,
    MenuComponent,
    WebcamComponent,
    WebcamManageComponent,
    HomeComponent,
    DescPipe,
    DirectionPipe
    
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    YouTubePlayerModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }