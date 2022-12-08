import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseService } from './services/course.service';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentMenuComponent } from './components/department-menu/department-menu.component';
import { SearchComponent } from './components/search/search.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { SectionMenuComponent } from './components/section-menu/section-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: 'section', component: SectionMenuComponent, outlet: 'sectionDetails' },
  { path: 'courses/:id', component: SectionMenuComponent },
  { path: 'courses/:id', component: CourseDetailComponent, outlet: 'courseDetails' },
  { path: 'search/:keyword', component: CourseListComponent },
  { path: 'department/:id', component: CourseListComponent },
  { path: 'departments', component: CourseListComponent },
  { path: 'courses', component: CourseListComponent },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', redirectTo: '/courses', pathMatch: 'full' },
];

@NgModule({
  declarations: [AppComponent, CourseListComponent, DepartmentMenuComponent, SearchComponent, CourseDetailComponent, SectionMenuComponent],
  imports: [RouterModule.forRoot(routes), BrowserModule, HttpClientModule, NgbModule],
  providers: [CourseService],
  bootstrap: [AppComponent],
})
export class AppModule { }
