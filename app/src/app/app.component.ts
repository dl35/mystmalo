import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  private path: string = "assets/pictos";
  constructor(private domSanitizer: DomSanitizer, private matIconRegistry: MatIconRegistry) {  
    this.matIconRegistry.addSvgIcon("E", this.setPath(`${this.path}/E.svg`) ); 
    this.matIconRegistry.addSvgIcon("ENE", this.setPath(`${this.path}/ENE.svg`)); 
    this.matIconRegistry.addSvgIcon("ESE", this.setPath(`${this.path}/ESE.svg`)); 
    this.matIconRegistry.addSvgIcon("N", this.setPath(`${this.path}/N.svg`)); 
    this.matIconRegistry.addSvgIcon("NE", this.setPath(`${this.path}/NE.svg`)); 
    this.matIconRegistry.addSvgIcon("NNE", this.setPath(`${this.path}/NNE.svg`)); 
    this.matIconRegistry.addSvgIcon("NNO", this.setPath(`${this.path}/NNO.svg`)); 
    this.matIconRegistry.addSvgIcon("NO", this.setPath(`${this.path}/NO.svg`)); 
    this.matIconRegistry.addSvgIcon("O", this.setPath(`${this.path}/O.svg`)); 
    this.matIconRegistry.addSvgIcon("ONO", this.setPath(`${this.path}/ONO.svg`)); 
    this.matIconRegistry.addSvgIcon("OSO", this.setPath(`${this.path}/OSO.svg`)); 
    this.matIconRegistry.addSvgIcon("S", this.setPath(`${this.path}/S.svg`)); 
    this.matIconRegistry.addSvgIcon("SE", this.setPath(`${this.path}/SE.svg`)); 
    this.matIconRegistry.addSvgIcon("SO", this.setPath(`${this.path}/SO.svg`)); 
    this.matIconRegistry.addSvgIcon("SSO", this.setPath(`${this.path}/SSO.svg`)); 
    this.matIconRegistry.addSvgIcon("Variable", this.setPath(`${this.path}/Variable.svg`)); 


    } 


  

   private setPath(url: string): SafeResourceUrl { 
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url); 
   }
  ngOnInit() {
    // This code loads the IFrame Player API code asynchronously, according to the instructions at
    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started




    
  }
}
