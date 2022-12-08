package edu.cpp.backend.rest;
import edu.cpp.backend.dao.CourseRepository;
import edu.cpp.backend.dao.SectionRepository;
import edu.cpp.backend.entity.Course;
import edu.cpp.backend.entity.Section;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/sections")
public class SectionController {
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private SectionRepository sectionRepository;

    // insert a Section record into the section table
    @PostMapping
    public void createSection(@RequestParam("number") Long number, @RequestParam("year") Long year, @RequestParam("semester") String semester, @RequestParam("course_id") Long course_id){
        Section section = new Section();
        section.setNumber(number);
        section.setYear(year);
        section.setSemester(semester);

        Course course = new Course();
        course.setId(course_id);

        section.setCourse(course);

        sectionRepository.save(section);
    }

//    @GetMapping
//    public void getAllSections(){
//        sectionRepository.findAll();
//    }


    // delete a Section record by course id and section number
    @DeleteMapping("/courses/{courseId}/sections/{number}")
    public ResponseEntity < ? > deleteCourse(@PathVariable(value = "courseId") int courseId,
                                             @PathVariable(value = "number") int number) throws ResourceNotFoundException {
        return sectionRepository.findByNumberAndCourseId(number, courseId).map(sec -> {
            sectionRepository.delete(sec);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("Course not found with id " + courseId + " and section number " + number));
    }
}
