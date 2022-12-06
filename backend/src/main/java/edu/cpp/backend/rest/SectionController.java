//package edu.cpp.backend.rest;
//import edu.cpp.backend.dao.CourseRepository;
//import edu.cpp.backend.dao.SectionRepository;
//import edu.cpp.backend.entity.Section;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@CrossOrigin(origins = "http://localhost:4200")
//@RequestMapping("/api")
//public class SectionController {
//    @Autowired
//    private CourseRepository courseRepository;
//
//    @Autowired
//    private SectionRepository sectionRepository;
//
//    // insert a Section record into the section table
//    @PostMapping("/c/{courseId}/s")
//    public ResponseEntity<Section> createSection(@PathVariable int courseId, @RequestBody Section sectionRequest) throws ResourceNotFoundException {
//        Section section = courseRepository.findById(courseId).map(co -> {
//            sectionRequest.setCourse(co);
//            return sectionRepository.save(sectionRequest);
//        }).orElseThrow(() -> new ResourceNotFoundException("Course not found with id = " + courseId));
//        return new ResponseEntity<>(section, HttpStatus.CREATED);
//    }
//
//
//    // delete a Section record by course id and section number
//    @DeleteMapping("/c/{courseId}/s/{number}")
//    public ResponseEntity < ? > deleteCourse(@PathVariable(value = "courseId") int courseId,
//                                             @PathVariable(value = "number") int number) throws ResourceNotFoundException {
//        return sectionRepository.findByNumberAndCourseId(number, courseId).map(sec -> {
//            sectionRepository.delete(sec);
//            return ResponseEntity.ok().build();
//        }).orElseThrow(() -> new ResourceNotFoundException("Course not found with id " + courseId + " and section number " + number));
//    }
//}
