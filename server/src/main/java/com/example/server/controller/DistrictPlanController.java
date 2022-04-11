package com.example.server.controller;

import com.example.server.service.DistrictPlanService;
import com.example.server.model.DistrictPlan;
import com.example.server.enumeration.StateCode;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
public class DistrictPlanController {
    DistrictPlanService dpService; // DistrictPlanService
    public DistrictPlanController (DistrictPlanService dpService) {this.dpService = dpService; }

    // Test
    @GetMapping("/api/districtPlans")
    List<DistrictPlan> getDistrictPlan() {
        return dpService.findAll();
    }

    @GetMapping("/api/states/{state_id}/districtPlans")
    CollectionModel<EntityModel<DistrictPlan>> getDistrictPlanByStateId(@PathVariable("state_id") StateCode stateId) {
//        List<EntityModel<DistrictPlan>> districtPlan = dpService.getDistrictPlanByStateId(stateId).stream().map(EntityModel::of).collect(Collectors.toList());
//        return CollectionModel.of(districtPlan);

        // With return links
        List<EntityModel<DistrictPlan>> districtPlans = dpService.getDistrictPlanByStateId(stateId).stream().map(dp ->
                EntityModel.of(dp,
                linkTo(methodOn(DistrictPlanController.class).getDistrictPlanById(dp.getStateId(), dp.getId())).withSelfRel(),
                linkTo(methodOn(DistrictPlanController.class).getDistrictPlanByStateId(dp.getStateId())).withRel("districtPlans")))
            .collect(Collectors.toList());
        return CollectionModel.of(districtPlans,
                linkTo(methodOn(StateController.class).getStates()).withSelfRel());
    }

    @GetMapping("/api/states/{state_id}/districtPlans/{id}")
    EntityModel<DistrictPlan> getDistrictPlanById(@PathVariable("state_id") StateCode stateId, @PathVariable("id") int id) {
//        DistrictPlan dp = dpService.getDistrictPlanById(stateId, id);
//        return EntityModel.of(dp);

        // With return links
        DistrictPlan dp = dpService.getDistrictPlanById(stateId, id);
        return EntityModel.of(dp,
                linkTo(methodOn(DistrictPlanController.class).getDistrictPlanById(dp.getStateId(), dp.getId())).withSelfRel(),
                linkTo(methodOn(DistrictPlanController.class).getDistrictPlanByStateId(dp.getStateId())).withRel("districtPlans"));
    }
}
