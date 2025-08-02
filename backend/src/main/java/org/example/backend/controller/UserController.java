package org.example.backend.controller;

import org.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/app/auth")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/profile-picture-path")
    public ResponseEntity<String> getProfilePicturePathByEmail(@RequestParam String email) {
        String path = userService.getProfilePicturePathByEmail(email);
        return ResponseEntity.ok(path);
    }

}
