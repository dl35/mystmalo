import { Component, OnInit, ViewChild , ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-port',
  templateUrl: './port.component.html',
  styleUrls: ['./port.component.css']
})
export class PortComponent implements OnInit {

 

  trustedHTML: any;
  constructor(private sanitizer: DomSanitizer, private http: HttpClient) { }

  ngOnInit(): void { 
    const headers = new HttpHeaders({
      Accept: 'text/html',
      XFF: 'testing123'
    });
  
  //  this.http.get('assets/wessel.html' , { headers , responseType: 'text'} ).subscribe(( v ) => {

  //  this.trustedHTML = this.sanitizer.bypassSecurityTrustHtml(v );

   /* setTimeout(() => { //wait for DOM rendering
      const scripts = this.container.nativeElement.getElementsByTagName('script');
      for (const script of scripts) {
     
        eval(script.text);
      }
    });

  });*/



}






}