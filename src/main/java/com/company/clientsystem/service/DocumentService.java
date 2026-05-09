package com.company.clientsystem.service;

import com.company.clientsystem.model.Document;
import com.company.clientsystem.model.Person;
import com.company.clientsystem.repository.DocumentRepository;
import com.company.clientsystem.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.List;

@Service
public class DocumentService {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private DocumentRepository documentRepository;

    // Save document
    public Document saveDocument(Long personId, Document doc) {
        Person person = personRepository.findById(personId).orElse(null);
        doc.setPerson(person);
        return documentRepository.save(doc);
    }

    // Get all documents
    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    // Get document by id
    public Document getDocumentById(Long id) {
        return documentRepository.findById(id).orElse(null);
    }

    // Delete document
    public void deleteDocument(Long id) {
        documentRepository.deleteById(id);
    }

    public List<Document> getDocumentsByPersonId(Long personId) {
        return documentRepository.findByPersonId(personId);
    }

    public Document updateDocument(Long id, Document newDoc) {

        Document existing = documentRepository.findById(id).orElse(null);

        if (existing != null) {
            existing.setDocumentType(newDoc.getDocumentType());
            existing.setDocumentName(newDoc.getDocumentName());
            existing.setFilePath(newDoc.getFilePath());

            return documentRepository.save(existing);
        }

        return null;
    }

    public Document replaceDocument(Long id, MultipartFile file) throws IOException {

        Document doc = documentRepository.findById(id).orElse(null);

        if (doc == null) {
            return null;
        }

        String uploadDir = "uploads/";

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        Path filePath = Paths.get(uploadDir + fileName);

        Files.write(filePath, file.getBytes());

        doc.setDocumentName(file.getOriginalFilename());
        doc.setFilePath(filePath.toString());

        return documentRepository.save(doc);
    }
}