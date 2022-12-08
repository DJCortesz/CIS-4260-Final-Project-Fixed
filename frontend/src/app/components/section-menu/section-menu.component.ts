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
export class SectionMenuComponent implements OnInit{
  section: Section = new Section();

  constructor(private courseService: CourseService,
    private sectionService: SectionService,
    private route: ActivatedRoute) { }

  ngOnInit():void {}
    
  addSection(){
    this.sectionService.addSection(1, 2022, "Fall", 1);
  }
  // getSectionList(){
  //   this.route.paramMap.subscribe(
  //     () => { }
  //       );
  // }
  
}
