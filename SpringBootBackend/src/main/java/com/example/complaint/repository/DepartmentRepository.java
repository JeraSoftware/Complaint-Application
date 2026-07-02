package com.example.complaint.repository;

import com.example.complaint.entity.DepartmentUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<DepartmentUser, Long> {
    Optional<DepartmentUser> findByUsernameAndPasswordAndDepartment(String username, String password, String department);
}
