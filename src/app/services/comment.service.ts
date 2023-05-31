import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  public saveComment (comment:any){
    return this.httpClient.post(`${baserUrl}/api/comment/save`, comment);
  }

  public getCommentsFromPublication(commentId:any){
    return this.httpClient.get(`${baserUrl}/api/comment/publication/${commentId}`);
  }

}
