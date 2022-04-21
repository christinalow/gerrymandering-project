package com.example.server.service;

import com.example.server.model.id.DistrictId;
import com.example.server.model.enumeration.StateCode;
import com.example.server.model.District;
import com.example.server.repository.DistrictRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.Optional;
import java.util.NoSuchElementException;

@Service
public class DistrictService {
    @Autowired
    private final DistrictRepository dRepository;
    // private final PrecinctService pService;
    private final DemographicService dmService;
    public DistrictService(DistrictRepository dRepository, DemographicService dmService) {
        this.dRepository = dRepository;
        // this.pService = pService;
        this.dmService = dmService;
    }

    // public List<District> findAll() {return dRepository.findAll(); }

    public Set<District> getDistrictsByPlanId(StateCode stateId, int planId){
        Set<District> districts = dRepository.findByStateIdAndPlanId(stateId, planId);
        for (District d : districts){
            d.setDemographic(dmService.getDemographicByDistrictId(new DistrictId(stateId, planId, d.getDistrictId())));
            // d.setPrecincts(pService.get(dp.getStateId(), dp.getId()));
        }
        return districts;
    }

    public District getDistrictByPlanIdAndDistrictId(StateCode stateId, int planId, int districtId) {
        try{
            Optional<District> d = dRepository.findByStateIdAndPlanIdAndDistrictId(stateId, planId, districtId);
            if(d.isPresent()){
                d.get().setDemographic(dmService.getDemographicByDistrictId(new DistrictId(stateId, planId, districtId)));
                return d.get();
            } else{
                throw new NoSuchElementException();
            }
        } catch (NoSuchElementException ex){
            return null;
        }
    }

    // measures
    /*
    getCompactnessMeasure(): double
    isMajorityMinorityDistrict(): boolean
    isCompetitiveDistrict(): boolean
    getWastedVotes(): int[]
     */
//
}
