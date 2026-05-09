package com.company.clientsystem.dto;

import java.util.List;

public class FamilyTreeDTO {

    private Long id;
    private String firstName;
    private List<FamilyTreeDTO> children;

    public FamilyTreeDTO() {}

    public FamilyTreeDTO(Long id, String firstName, List<FamilyTreeDTO> children) {
        this.id = id;
        this.firstName = firstName;
        this.children = children;
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public List<FamilyTreeDTO> getChildren() {
        return children;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setChildren(List<FamilyTreeDTO> children) {
        this.children = children;
    }
}