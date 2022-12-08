import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Section } from '../common/section';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private currentSectionsUrl: string = "http://localhost:8080/api/sections";

  constructor(private httpClient: HttpClient) { }

  addSection(section: number, year: number, semester: string, courseId: number) {
    const newSectionUrl = `http://localhost:8080/sections?number=${section}&year=${year}&semester=${semester}&course_id=${courseId}`;
    console.log(newSectionUrl);
    this.httpClient.post(newSectionUrl, null).subscribe((data) => {
      console.log("Successfully created a section.")
    })
  }

  deleteSection(section:number){
    const newDeleteUrl = `http://localhost:8080/sections?number=${section}`;
    this.httpClient.delete(newDeleteUrl, ).subscribe((data) =>{
      console.log("Successfully deleted a section.")
    });
  }

  getSections(): Observable<Section[]> {
    console.log(this.httpClient.get<GetResponseCourseSections>(this.currentSectionsUrl).pipe(
      map(response => response._embedded.sections)));
    return this.httpClient.get<GetResponseCourseSections>(this.currentSectionsUrl).pipe(
      map(response => response._embedded.sections));
  }
}

interface GetResponseCourseSections {
  _embedded: {
    sections: Section[];
  }
}