import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  // inject router to the component 
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  doSearch(keyword: string) {
    // Navigates to a view using a route path. It is equivalent to using routerLink in HTML file 
    this.router.navigateByUrl(`/search/${keyword}`);
  }  // app.module.ts has {path: 'search/:keyword', component: CourseListComponent}, 
} 