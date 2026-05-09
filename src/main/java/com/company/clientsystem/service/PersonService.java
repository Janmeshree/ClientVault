package com.company.clientsystem.service;

import com.company.clientsystem.dto.FamilyTreeDTO;
import com.company.clientsystem.model.Person;
import com.company.clientsystem.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;

@Service
public class PersonService {

    public Person assignParent(Long childId, Long parentId) {

        Person child = personRepository.findById(childId).orElse(null);
        Person parent = personRepository.findById(parentId).orElse(null);

        if (child != null && parent != null) {
            child.setParent(parent);
            return personRepository.save(child);
        }

        return null;
    }

    @Autowired
    private PersonRepository personRepository;

    // Save Person
    public Person savePerson(Person person) {
        return personRepository.save(person);
    }

    // Get all Persons
    public List<Person> getAllPersons() {

        List<Person> persons = personRepository.findAll();

        // IMPORTANT: remove recursion for dropdown UI
        for (Person p : persons) {
            p.setChildren(null);
        }

        return persons;
    }

    // Get Person by ID
    public Person getPersonById(Long id) {
        return personRepository.findById(id).orElse(null);
    }

    // Delete Person
    public void deletePerson(Long id) {
        personRepository.deleteById(id);
    }

    public FamilyTreeDTO getFamilyTree(Long id) {

        Person person = personRepository.findById(id).orElse(null);

        if (person == null) {
            return null;
        }

        return buildTree(person);
    }

    private FamilyTreeDTO buildTree(Person person) {

        FamilyTreeDTO dto = new FamilyTreeDTO();

        dto.setId(person.getId());
        dto.setFirstName(person.getFirstName());

        List<FamilyTreeDTO> childrenDTO = new ArrayList<>();

        if (person.getChildren() != null) {
            for (Person child : person.getChildren()) {
                childrenDTO.add(buildTree(child));
            }
        }

        dto.setChildren(childrenDTO);

        return dto;
    }

    public Person updatePerson(Long id, Person person) {

        Person existing = personRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Person not found"));

        existing.setFirstName(person.getFirstName());
        existing.setLastName(person.getLastName());
        existing.setMobileNo(person.getMobileNo());
        existing.setDob(person.getDob());
        existing.setLocation(person.getLocation());

        return personRepository.save(existing);
    }

}