package com.company.clientsystem.controller;

import com.company.clientsystem.model.Document;
import com.company.clientsystem.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/document")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    // ADD DOCUMENT
    @PostMapping("/add/{personId}")
    public Document addDocument(@PathVariable Long personId,
                                @RequestBody Document document) {

        // create a temporary Person reference using id only
        com.company.clientsystem.model.Person person = new com.company.clientsystem.model.Person();
        person.setId(personId);

        document.setPerson(person);

        return documentService.saveDocument(personId, document);
    }

    // GET ALL DOCUMENTS
    @GetMapping("/all")
    public List<Document> getAllDocuments() {
        return documentService.getAllDocuments();
    }

    @GetMapping("/person/{personId}")
    public List<Document> getDocumentsByPersonId(@PathVariable Long personId) {
        return documentService.getDocumentsByPersonId(personId);
    }

    // GET DOCUMENT BY ID
    @GetMapping("/{id}")
    public Document getDocumentById(@PathVariable Long id) {
        return documentService.getDocumentById(id);
    }

    // DELETE DOCUMENT
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDocument(@PathVariable Long id) {
        documentService.deleteDocument(id);
        return ResponseEntity.ok("Document deleted successfully");
    }

    @PutMapping("/replace/{id}")
    public Document replaceDocument(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file
    ) throws IOException {

        return documentService.replaceDocument(id, file);
    }

    @PutMapping("/update/{id}")
    public Document updateDocument(@PathVariable Long id,
                                   @RequestBody Document document) {
        return documentService.updateDocument(id, document);
    }


    @PostMapping("/upload/{personId}")
    public Document uploadDocument(
            @PathVariable Long personId,
            @RequestParam("file") MultipartFile file,
            @RequestParam("documentType") String documentType
    ) throws IOException {

        String uploadDir = "uploads/";

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + fileName);

        Files.write(filePath, file.getBytes());

        Document doc = new Document();
        doc.setDocumentType(documentType);
        doc.setDocumentName(file.getOriginalFilename());
        doc.setFilePath(filePath.toString());

        // 👇 IMPORTANT FIX IS HERE
        return documentService.saveDocument(personId, doc);
    }
}