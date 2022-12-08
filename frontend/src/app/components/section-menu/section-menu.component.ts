import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute } from '@angular/router';
import { Section } from 'src/app/common/section';
import { SectionService } from 'src/app/services/section.service';
import { Router } from '@angular/router';

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
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      () => { this.listCourseSections(); }
    );
    console.log(this.sections[0]);
  }

  addSection() {
    const sectionNumber: number = parseInt((<HTMLSelectElement>document.getElementById('section')).value);
    const year: number = parseInt((<HTMLSelectElement>document.getElementById('year')).value);
    const semester: string = (<HTMLSelectElement>document.getElementById('semester')).value;
    this.sectionService.addSection(sectionNumber, year, semester, 1);
    console.log(sectionNumber + ", " + year + ", " + semester + ", ");
  }

  deleteSection(section: number) {
    this.sectionService.deleteSection(section);
  }

  listCourseSections() {
    this.sectionService.getSections().subscribe(
      data => {
        console.log('Current Sections =' + JSON.stringify(data)); // write JSON data to console 
        this.sections = data;
      });
  }

}