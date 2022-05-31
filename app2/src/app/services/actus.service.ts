import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActusService {

  private rss2json = 'https://rss2json.com/api.json?rss_url=';
  private actu = 'https://www.ville-saint-malo.fr/feed/?post_type=post';
  private agenda = 'https://www.ville-saint-malo.fr/feed/?post_type=agenda';

  constructor(private http: HttpClient) { }

  getActualite() {
    const u = this.rss2json + this.actu ;
    return this.http.get<any>( u  );
  }

  getAgenda( ) {
    const u = this.rss2json + this.agenda ;
    return this.http.get<any>( u  );
  }


}
