import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private httpClient: HttpClient) { }

  public savePublication (publication: any){
    return this.httpClient.post(`${baserUrl}/api/publication/save`, publication);
  }

  public getPublications(){
    return this.httpClient.get(`${baserUrl}/api/publication/`);
  }

  public deletePublication (publicationId: any){
    return this.httpClient.delete(`${baserUrl}/api/publication/${publicationId}`);
  }

  public updatePublication (publication: any){
    return this.httpClient.put(`${baserUrl}/api/publication/`, publication);
  }

}
