package org.example.backend.service;

import org.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String getProfilePicturePathByEmail(String email) {
        return this.userRepository.findProfilePicturePathByEmail(email);
    }
}
