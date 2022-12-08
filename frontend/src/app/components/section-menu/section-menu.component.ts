import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute } from '@angular/router';
import { Section } from 'src/app/common/section';
import { SectionService } from 'src/app/services/section.service';


@Component({
  selector: 'app-section-menu',
  templateUrl: './section-menu.component.html',
  styleUrls: ['./section-menu.component.css']
})
export class SectionMenuComponent implements OnInit {
  section: Section = new Section();
  sections: Section[];

  constructor(private courseService: CourseService,
    private sectionService: SectionService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      () => { this.listCourseSections(); }
    );
  }

  addSection() {
    this.sectionService.addSection(2, 2022, "Fall", 1);
    this.listCourseSections();
  }

  listCourseSections() {
    this.sectionService.getSections().subscribe(
      data => {
        console.log('Current Sections =' + JSON.stringify(data)); // write JSON data to console 
        this.sections = data;
      });
  }

}