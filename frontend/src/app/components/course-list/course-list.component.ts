import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/common/course';
import { Department } from 'src/app/common/department';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  // define a property (Course array) to hold course data fetched from REST API
  courses: Course[] = []; // it is accessible in the component template file by using {{ }}
  currentDepartmentId: number = 1;
  previousDepartmentId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination 
  thePageNumber: number = 1; // page number in ng-bootstrap is 1 based: starting from 1 not 0  
  thePageSize: number = 15;
  theTotalElements: number = 0;

  course: Course = new Course();
  department: Department = new Department();
  previousKeyword: string;
  // dependency injection for CourseService to get the Observable for Course array
  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listCourses(); // call this method to populate Course array with Course objects
    });
  }


  listCourses() {
    // retrieve the value of a router parameter, named keyword, 
    // in doSearch(value: String), this.router.navigateByUrl(`/search/${value}`); 
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) { // route has a parameter named keyword indicating for search 
      this.handleSearchCourses();
    }
    else {  // not search 
      this.handleListCourses();
    }
    this.handleGetDepartment();
  }

  // use keyword to search via REST API, and set values to the Course array, courses 
  handleSearchCourses() {
    // keyword is the parameter defined in router at app.module.ts and is shown at below 
    // {path: ‘search/:keyword’, component: CourseListComponent}, 
    // get()! tells the compiler that the returned value of the get() is not null 
    const term: string = this.route.snapshot.paramMap.get('keyword')!;

    // if the keyword is different from the previous, then set thePageNumber to 1 
    if (this.previousKeyword != term) {
      this.thePageNumber = 1;
    }
    this.previousKeyword = term;
    // now search for the courses using the search term 
    this.courseService.searchCoursesPaginate(this.thePageNumber - 1,
      this.thePageSize,
      term).subscribe(this.processResult());
  } // end of handleSearchCourses() 

  handleListCourses() {
    // check if the route parameter named "id" is available 
    // snapshot is state of route at this given moment 
    // paramMap is a map of all route parameters 
    const hasDepartmentId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasDepartmentId) {
      // get the id value 
      // "+" convert the string value to a number  
      // get()! tells the compiler that the returned value of the get() is not null          
      this.currentDepartmentId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      // not department id available ... default to department id 1 
      this.currentDepartmentId = 1;
    }

    if (this.previousDepartmentId != this.currentDepartmentId) {
      this.thePageNumber = 1;
    }

    this.previousDepartmentId = this.currentDepartmentId;

    // get courses for the given category id 
    this.courseService.getCourseListPaginate(
      this.thePageNumber - 1,
      this.thePageSize,
      this.currentDepartmentId).subscribe(this.processResult());
  }  // end of handleListCourses() 

  handleGetDepartment(){
    this.courseService.getDepartment(this.currentDepartmentId).subscribe(
      data => { this.department = data; }
    );
  }

  private processResult() {
    return (data: any) => {
      this.courses = data._embedded.courses;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  updatePageSize(value: number) {
    this.thePageSize = value;
    this.thePageNumber = 1;
    this.handleListCourses(); // redisplay courses 
  }
} // end of CourseListComponent
