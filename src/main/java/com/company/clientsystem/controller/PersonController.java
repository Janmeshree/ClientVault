package com.company.clientsystem.controller;

import com.company.clientsystem.dto.FamilyTreeDTO;
import com.company.clientsystem.model.Person;
import com.company.clientsystem.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/person")
public class PersonController {

    @Autowired
    private PersonService personService;

    // CREATE PERSON (POST)
    @PostMapping("/add")
    public Person addPerson(@RequestBody Person person) {
        return personService.savePerson(person);
    }

    // GET ALL PERSONS
    @GetMapping("/all")
    public List<Person> getAllPersons() {
        return personService.getAllPersons();
    }

    // GET PERSON BY ID
    @GetMapping("/{id}")
    public Person getPersonById(@PathVariable Long id) {
        return personService.getPersonById(id);
    }

    // DELETE PERSON
    @DeleteMapping("/{id}")
    public String deletePerson(@PathVariable Long id) {
        personService.deletePerson(id);
        return "Person deleted successfully";
    }

    @PostMapping("/assign-parent/{childId}/{parentId}")
    public Person assignParent(@PathVariable Long childId,
                               @PathVariable Long parentId) {
        return personService.assignParent(childId, parentId);
    }

    @GetMapping("/tree/{id}")
    public FamilyTreeDTO getFamilyTree(@PathVariable Long id) {
        return personService.getFamilyTree(id);
    }

    @PutMapping("/update/{id}")
    public Person updatePerson(@PathVariable Long id,
                               @RequestBody Person person) {
        return personService.updatePerson(id, person);
    }

}