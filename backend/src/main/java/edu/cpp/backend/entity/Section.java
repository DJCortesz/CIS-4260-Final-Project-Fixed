package edu.cpp.backend.entity;

import lombok.Getter;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="section")
// @Data -- known bug
@Getter
@Setter

public class Section {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "number")
    private Long number;

    @Column(name = "year")
    private Long year;

    @Column(name = "semester")
    private String semester;

    @ManyToOne
    @JoinColumn(name="course_id", nullable = false)
    @JsonIgnore
    private Course course;
}
