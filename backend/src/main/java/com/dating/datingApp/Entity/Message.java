package com.dating.datingApp.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Message {
    @Id
    private String id;
    private Set<String> items = new HashSet<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Set<String> getItems() {
        return items;
    }
    public void setItems(Set<String> items) {
        this.items = items;
    }
}

