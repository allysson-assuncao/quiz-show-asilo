package org.example.backend.model.enums;

import lombok.Getter;

@Getter
public enum UserRole {

    ADMIN("admin"),
    CARETAKER("cuidador"),
    RESIDENT("residente");

    private String role;

    UserRole(String role) {
        this.role = role;
    }

}
