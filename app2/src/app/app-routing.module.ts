import { WebcamManageComponent } from './webcam-manage/webcam-manage.component';
import { WebcamComponent } from './webcam/webcam.component';
import { NgModule, LOCALE_ID } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActualitesComponent } from './actualites/actualites.component';
import { AgendaComponent } from './agenda/agenda.component';
import { MareeComponent } from './maree/maree.component';
import { MeteoComponent } from './meteo/meteo.component';
import { PortComponent } from './port/port.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');
export const routes: Routes = [

  {
    path: '', component: MenuComponent,  children:
      [
        { path: 'actualites',  component: ActualitesComponent },
        { path: 'agenda',  component: AgendaComponent },
        { path: 'maree',  component: MareeComponent },
        { path: 'meteo',  component: MeteoComponent },
        { path: 'port',  component: PortComponent },
        { path: 'webcam', component: WebcamComponent , children:[
        { path: 'm',  component: WebcamManageComponent }
        ]},
    
        { path: '', component: HomeComponent }
      ] ,
  },

  { path: '**', redirectTo: '/', pathMatch: 'full' } ,

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  providers: [ { provide: LOCALE_ID, useValue: 'fr-FR' }],
  exports: [RouterModule]
})
export class AppRoutingModule { }
