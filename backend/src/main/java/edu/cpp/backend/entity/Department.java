package edu.cpp.backend.entity;
import lombok.Data;
import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="department")
@Data
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @OneToMany
    private Set<Course> courses;
}
