import { from, Observable, of } from 'rxjs';
import { VideoService } from './../services/video.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit {

    datas$ :Observable<any>;
    skaping$ :Observable<any>;

    width = 200 ;
    height = 200;


    skaping : any[] = [
     "https://www.skaping.com/saint-malo/intra-muros/panoramique/video" ,
     "https://www.skaping.com/saint-malo/intra-muros/baie/video",
     "https://www.skaping.com/saint-malo/port-des-sablons/video",
     "https://www.skaping.com/saint-malo/port-des-sablons",
     "https://www.skaping.com/saint-lunaire/pointe-du-decolle"] ;

     

  constructor(breakpointObserver: BreakpointObserver,private vserv: VideoService,private sanitizer: DomSanitizer) {

    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
  ]).subscribe((state: BreakpointState) => {
    if (state.breakpoints[Breakpoints.XSmall]) {
      this.width = 320 ; this.height = 320 ;
    }
    if (state.breakpoints[Breakpoints.Small])  {
      this.width = 350 ; this.height = 350 ;
    }
    if (state.breakpoints[Breakpoints.Medium]) {
      this.width = 400 ; this.height = 400 ;
    }
    if (state.breakpoints[Breakpoints.Large])  {
      this.width = 400 ; this.height = 400 ;
    }
    if (state.breakpoints[Breakpoints.XLarge]) {
      this.width = 400 ; this.height = 400 ;
    }
});

  }


  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    this.datas$=this.vserv.getWebcam();
    this.skaping$ = this.makeUrls() ; 
  }


   makeUrls() {
     let r = [] ; 
     for (let s of this.skaping  ) {
        let d = this.sanitizer.bypassSecurityTrustResourceUrl( s );
        r.push( d ) ;
      }
      return of( r ) ;
  }




}
