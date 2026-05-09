package com.company.clientsystem.repository;

import com.company.clientsystem.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByPersonId(Long personId);
}