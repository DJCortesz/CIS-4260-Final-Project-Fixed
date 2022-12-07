import { Component } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { CourseDetailComponent } from '../course-detail/course-detail.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-section-menu',
  templateUrl: './section-menu.component.html',
  styleUrls: ['./section-menu.component.css']
})
export class SectionMenuComponent {

  constructor(private route: ActivatedRoute, private courseDetail: CourseDetailComponent) { }

  ngOnInit(): void {

  }


}
