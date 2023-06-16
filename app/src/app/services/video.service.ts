import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private uwebcam = 'datas/webcams.json';
  private swebcam = 'datas/savewebcams.php';

  constructor(private http: HttpClient) { }

  getWebcam() {
    const salt = (new Date()).getTime();
    return this.http.get<any>( `${this.uwebcam}?${salt}`  );
  }

  saveWebcam(datas: Array<any>) {
    let p = "";
    const n = datas.length;
    let i = 0;
    for (var val of datas) {
      val = val.trim();
      if( val.length == 0 ) {
        continue;
      }
      p+="params[]="+val
      i++;
      if( i < n ) {
         p+="&"; 
      }

    }
    let surl = this.swebcam+"?"+p;
    return this.http.get<any>( surl );
  }
}
