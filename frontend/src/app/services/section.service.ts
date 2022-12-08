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

  deleteSection(section: number) {
    const newDeleteUrl = `http://localhost:8080/sections?id=${section}`;
    this.httpClient.delete(newDeleteUrl).subscribe((data) => {
      console.log("Successfully deleted a section.")
    });
  }

  getSections(courseId: number): Observable<Section[]> {
    console.log(this.currentSectionsUrl + "/search/findByCourseId?courseId=1");
    return this.httpClient.get<GetResponseCourseSections>(this.currentSectionsUrl + "/search/findByCourseId?courseId=1").pipe(
      map(response => response._embedded.section));
  }

  getSectionId() {
    const test: Observable<any> = this.httpClient.get<getSectionIds>(this.currentSectionsUrl);
    console.log(test);
  }
}

interface getSectionIds {
  _embedded: {
    sections: {
      id: Number;
    }
  }
}
interface GetResponseCourseSections {
  _embedded: {
    section: Section[];
  }
}