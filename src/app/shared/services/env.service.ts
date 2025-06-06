import { Injectable } from '@angular/core';
import { envDetails } from 'src/config/env.utils';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  getMapKey(): string {
    return envDetails.googlemapKey;
  }

  constructor() { }
}
