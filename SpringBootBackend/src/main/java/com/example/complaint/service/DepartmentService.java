package com.example.complaint.service;

import com.example.complaint.entity.DepartmentUser;
import com.example.complaint.repository.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {

    private final DepartmentRepository repository;

    public DepartmentService(DepartmentRepository repository) {
        this.repository = repository;
    }

    public List<DepartmentUser> findAll() {
        return repository.findAll();
    }

    public DepartmentUser save(DepartmentUser user) {
        return repository.save(user);
    }

    public Optional<DepartmentUser> authenticate(String username, String password, String department) {
        return repository.findByUsernameAndPasswordAndDepartment(username, password, department);
    }
}
