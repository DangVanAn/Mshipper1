package com.example.dangvanan14.mshiper1.model;

import io.realm.RealmList;
import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;

public class Person extends RealmObject {
    @PrimaryKey
    private long id;
    private String name;
    private RealmList<Dog> dogs; // Declare one-to-many relationships

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public RealmList<Dog> getDogs() {
        return dogs;
    }

    public void setDogs(RealmList<Dog> dogs) {
        this.dogs = dogs;
    }
// ... Generated getters and setters ...
}
