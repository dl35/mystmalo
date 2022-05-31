import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MeteoService {

  private umeteo = 'datas/meteo_stmalo.json';
  // private umeteo2 = 'https://meteofrance.com';

  private umeteo2 = 'datas/forecast.json'; 

  constructor(private http: HttpClient) { }

  getMeteo() {
    return this.http.get<any>( this.umeteo  );
  }



  getMeteo2() {

    let headers = new HttpHeaders();
    //.set('Content-Type', 'text/plain; charset=utf-8');
 /*   headers = headers.append('Content-Type','text/plain; charset=utf-8');
    headers = headers.append('Accept','*');
    headers = headers.append('Access-Control-Allow-Origin','https://www.google.fr');*/
 //   headers = headers.append('Accept-Encoding','gzip, deflate, br');
  //  headers = headers.append('Accept-Language','fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7');

/*    headers = headers.append('Host','meteofrance.com');
    headers = headers.append('Pragma','no-cache');
    headers = headers.append('Sec-Fetch-Dest','document');
    headers = headers.append('Sec-Fetch-Site','same-origin');
    headers = headers.append('Sec-Fetch-User','?1');
    headers = headers.append('Upgrade-Insecure-Requests','1');
    headers = headers.append('user-agent','Mozilla/5.0 (X11; Fedora; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36');
*/

    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    }


     return this.http.get<any>( this.umeteo2   );
  }


}
