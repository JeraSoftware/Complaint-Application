package com.example.complaint.controller;

import com.example.complaint.entity.DepartmentUser;
import com.example.complaint.service.DepartmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin(origins = "*")
public class DepartmentController {

    private final DepartmentService service;

    public DepartmentController(DepartmentService service) {
        this.service = service;
    }

    @GetMapping
    public List<DepartmentUser> getAllDepartments() {
        return service.findAll();
    }

    @PostMapping
    public DepartmentUser createDepartmentUser(@RequestBody DepartmentUser user) {
        return service.save(user);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody DepartmentUser loginRequest) {
        return service.authenticate(loginRequest.getUsername(), loginRequest.getPassword(), loginRequest.getDepartment())
                .map(user -> ResponseEntity.ok("Login successful"))
                .orElseGet(() -> ResponseEntity.status(401).body("Invalid department credentials"));
    }

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("department backend is alive");
    }
}
