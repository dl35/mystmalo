import { Observable } from 'rxjs';
import { VideoService } from './../services/video.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit {

    datas$ :Observable<any>;
    width = 200 ;
    height = 200;
  constructor(breakpointObserver: BreakpointObserver,private vserv: VideoService) {

    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
  ]).subscribe((state: BreakpointState) => {
    if (state.breakpoints[Breakpoints.XSmall]) {
      this.width = 320 ; this.height = 320 ;
      console.log("xsmall" , Breakpoints.XSmall );
 }
    if (state.breakpoints[Breakpoints.Small]) {
      this.width = 350 ; this.height = 350 ;
      console.log("small"  );
 }
    if (state.breakpoints[Breakpoints.Medium]) {
      this.width = 400 ; this.height = 400 ;
 }
    if (state.breakpoints[Breakpoints.Large]) {
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
  }

}
