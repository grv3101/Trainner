import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Trainner } from '../trainner.model';
import { Observable } from 'rxjs';



const headerOption = {
  headers : new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class TrainnerService {
  _url = 'http://localhost:3000/trainner';

  allTrainner: Trainner[];

  currentTrainner: Trainner = {
    _id: '',
    personal_details: { type: Object,
      name: { type: Object,
          first_name: '',
          last_name: ''
      },
      dob: '',
      about_yourself: '',
      languages_known: [''],
      willingly_to_travel: ''
  },
  technologies: [ Object, {
      type: Object,
          name: '',
          experience: null,
          ratings: null,
          costing: { type: Object,
              freshers: null,
              laterals: null,
              project_specific: null
          },
          work_as_consultant: ''
  }],
  certifications: [Object, {
      title: '',
      Year: null
  }],
};

  constructor( private _http: HttpClient ) { }

  register(trainner: Trainner): Observable<Trainner[]> {
    return this._http.post<any>(this._url, trainner, headerOption);
  }

  getAllTrainner() {
    return this._http.get(this._url).subscribe(
      (data: Trainner[]) => {
        this.allTrainner = data;
        console.table(this.allTrainner);
      });
  }

  getTrainner(_id: String): Observable<Trainner[]>{
    return this._http.get<Trainner[]>(this._url + '/' + _id, headerOption);
  }

  updateTrainner(trainner: Trainner): Observable<Trainner> {
    return this._http.put<Trainner>(this._url + '/' + trainner._id, trainner, headerOption);
  }
}
