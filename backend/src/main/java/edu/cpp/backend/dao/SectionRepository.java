package edu.cpp.backend.dao;
import edu.cpp.backend.entity.Section;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "section", path = "sections")
public interface SectionRepository extends JpaRepository<Section, Long>{
    Page<Section> findByCourseId(@RequestParam("courseId") Long courseId, Pageable pageable);
}
