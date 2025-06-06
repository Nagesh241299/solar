import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

 getLocationByZip(zip: string): Observable<any> {
  const url = `${environment.weatherApiBaseUrl}${environment.geoZipEndpoint}?zip=${zip},IN&appid=${environment.weatherApiKey}`;
  return this.http.get(url);
}

}
