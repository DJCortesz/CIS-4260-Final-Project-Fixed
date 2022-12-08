import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Section } from '../common/section';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  constructor(private httpClient: HttpClient) { }

  addSection(section: number, year: number, semester: string, courseId: number) {
    const newSectionUrl = `http://localhost:8080/api/sections?number=${section}&year=${year}&semester=${semester}&course_id=${courseId}`;
    console.log(newSectionUrl);
    this.httpClient.post(newSectionUrl, null).subscribe((data) => {
      console.log("Successfully created a section.")
    })
  }
}
