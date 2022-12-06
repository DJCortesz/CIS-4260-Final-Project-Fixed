import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Department } from 'src/app/common/department';
@Component({
  selector: 'app-department-menu',
  templateUrl: './department-menu.component.html',
  styleUrls: ['./department-menu.component.css']
})
export class DepartmentMenuComponent implements OnInit {
  // define an array to contain Department objects 
  courseDepartments: Department[]; // available in component template file by {{ }} 

  // inject ProductService into this component 
  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.listCourseDepartments(); // populates courseDepartments with Department objects 
  }

  listCourseDepartments() {
    // JSON.stringify() method converts a JavaScript object or value to a JSON string 
    this.courseService.getCourseDepartments().subscribe(
      data => {
        console.log('Course Departments =' + JSON.stringify(data)); // write JSON data to console 
        this.courseDepartments = data;
      });
  }    // end of listCourseDepartments() 
} // end of DepartmentMenuComponent 