package com.example.server.model;

import com.example.server.model.enumeration.RacialCategory;
import com.example.server.model.enumeration.StateCode;

import com.example.server.model.id.DistrictId;
import lombok.*;
import javax.persistence.*;
import java.util.Map;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "district")
@IdClass(DistrictId.class)
public class District {
    @Id
    @Column(name="id", nullable = false)
    private int id;

    @Id
    @Column(name="district_plan_id", nullable = false)
    private int districtPlanId;

    @Id
    @Column(name="state_id", nullable = false)
    private StateCode stateId;

    @Column(name = "incumbent")
    private String incumbent;

    @Column(name = "total_pop") // total population
    private int totalPop;

    @Transient
    @MapKeyEnumerated(EnumType.STRING)
    private Map<RacialCategory, Integer> demographic;

    @Transient
    private Tuple lean;

    @Transient
    private int[] seats;

    @Transient
    private int[] votes;

    @Transient
    private Set<Precinct> precincts;

    // Recently added measures
    // @Transient is temporary for now
    @Transient
    private double compactness;
}
