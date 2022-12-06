import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../common/course';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Department } from '../common/department';

// @Injectable(): our service can be injected into other classes
/* The metadata, providedIn: 'root' , means that the CourseService is visible throughout 
the application. */
@Injectable({
  providedIn: 'root',
})
export class CourseService {
  // URL to REST API endpoint from the prior Spring Boot backend project
  private baseUrl = 'http://localhost:8080/api/courses';

  private departmentUrl = 'http://localhost:8080/api/departments';

  // dependency injection: Inject httpClient which is part of HttpClientModule
  constructor(private httpClient: HttpClient) { }

  getCourse(courseId: number): Observable<Course> {
    // build URL based on courseId 
    const courseUrl = `${this.baseUrl}/${courseId}`;
    return this.httpClient.get<Course>(courseUrl);
  }

  // This method, with two more parameters, gets courses with pagination 
  getCourseListPaginate(
    thePage: number,
    thePageSize: number,
    theDepartmentId: number): Observable<GetResponseCourses> {
    const url = `${this.baseUrl}/search/findByDepartmentId` + `?id=${theDepartmentId}&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseCourses>(url);
  }

  getCourseDepartments(): Observable<Department[]> {
    return this.httpClient.get<GetResponseCourseDepartments>(this.departmentUrl).pipe(
      map(response => response._embedded.department));
  }

  // searchCourses(keyword: string): Observable<Course[]> {
  //   // need to build URL based on the keyword 
  //   const searchUrl = `${this.baseUrl}/search/findByTitleContaining?title=${keyword}`;

  //   return this.httpClient.get<GetResponseCourses>(searchUrl).pipe(
  //     map(response => response._embedded.courses));
  // }

  searchCoursesPaginate(
    thePage: number,
    thePageSize: number,
    theKeyword: string): Observable<GetResponseCourses> {
    const searchUrl =
      `${this.baseUrl}/search/findByTitleContaining?title=${theKeyword}&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseCourses>(searchUrl);
  } // end of searchCoursesPaginate() 

} // end of CourseService 

interface GetResponseCourses {
  _embedded: {
    courses: Course[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseCourseDepartments {
  _embedded: {
    department: Department[];
  }

}//end of GetResponseCourseDepartments