//package com.example.server.repository;
//
//import com.example.server.model.enumeration.StateCode;
//import com.example.server.model.Precinct;
//import com.example.server.model.id.PrecinctId;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.Optional;
//import java.util.Set;
//
//@Repository
//public interface PrecinctRepository extends JpaRepository<Precinct, PrecinctId> {
//
//    Set<Precinct> findByStateId(StateCode state_id);
//
//    Optional<Precinct> findByStateIdAndPrecinctId(StateCode state_id, int id);
//}
