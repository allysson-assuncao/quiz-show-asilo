package org.example.backend.controller;

import jakarta.validation.Valid;
import org.example.backend.dto.AuthResponseDTO;
import org.example.backend.dto.User.UserLoginDTO;
import org.example.backend.dto.User.UserRegisterDTO;
import org.example.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/app/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid UserLoginDTO loginRequestDTO) {
        Optional<AuthResponseDTO> optionalAuthResponseDTO = this.authService.login(loginRequestDTO);
        return optionalAuthResponseDTO.isPresent() ?
                ResponseEntity.status(HttpStatus.OK).body(optionalAuthResponseDTO.get()) :
                ResponseEntity.badRequest().body(Map.of("message", "Credenciais inválidas!"));
    }

    @PostMapping(value = "/register", consumes = {"multipart/form-data"})
    public ResponseEntity<AuthResponseDTO> register(
            @RequestPart("user") @Valid UserRegisterDTO userRegisterDTO,
            @RequestPart(value = "image", required = false) MultipartFile image) {

        AuthResponseDTO authResponseDTO = this.authService.register(userRegisterDTO, image);
        return ResponseEntity.status(HttpStatus.CREATED).body(authResponseDTO);
    }

}
