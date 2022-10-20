import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import postscribe from 'postscribe'

declare let width :any ;         // width in pixels or percentage
declare let height :any ;
declare let latitude :any ;    // center latitude (decimal degrees)
declare let longitude :any ;    // center longitude (decimal degrees)
declare let zoom :any ;

 

@Component({
  selector: 'app-port',
  templateUrl: './port.component.html',
  styleUrls: ['./port.component.css']
})
export class PortComponent implements OnInit  {
 
  
  url ="https://www.vesselfinder.com/aismap.js";

  constructor(private sanitizer: DomSanitizer, private http: HttpClient,  private renderer: Renderer2) { }


  ngOnInit(): void { 
 
    let s = this.variableScript();
    postscribe( '#divvesselfinder' , s  );
    postscribe( '#divvesselfinder' , "<script type='text/javascript'   src='https://www.vesselfinder.com/aismap.js'  ></script>") ;
 

    const div  = document.getElementById("divvesselfinder");

    div.innerText  = "";

  }
  
  /*
  renderExternalScript(src: string): HTMLElement {

      const div  = document.getElementById("divvesselfinder");
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.async = true ;
      script.defer = true;
   
      this.renderer.appendChild(div, script);
      return div;
    }*/


    variableScript() {


      let txt  = "" ;
      txt += 'var width = "100%" ;' ;
      txt += 'var height = 800 ;';
      txt += 'var latitude= 48.64435  ;';    
      txt += 'var longitude= -2.02558 ;';   
      txt += 'var zoom= 14 ; ';
    

      const div  = document.getElementById("divvesselfinder");
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML= txt ;
   
      this.renderer.appendChild(div, script);
     
       

    }



}






