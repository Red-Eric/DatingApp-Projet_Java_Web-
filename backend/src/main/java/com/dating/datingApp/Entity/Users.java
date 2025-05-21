package com.dating.datingApp.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String fname;
    private int age;
    private Set<Integer> friends = new HashSet<>();
    private String place;
    private String email;
    private String sexe;
    private String password;
    private String bio;
    private String image;
    private Set<String> hobby = new HashSet<>();
    private String tel;
    private Set<Integer> matchs = new HashSet<>();
    private Set<Integer> visitor = new HashSet<>();
    private Set<Integer> likes = new HashSet<>();
    private Set<Integer> ILikes = new HashSet<>();
    private Set<Integer> IHates = new HashSet<>();
    private Set<String> notif = new HashSet<>();

    public Set<String> getNotif() {
        return notif;
    }
    
    public void setNotif(Set<String> notif) {
        this.notif = notif;
    }

    public Set<Integer> getIHates() {
        return IHates;
    }

    public void setIHates(Set<Integer> iHates) {
        this.IHates = new HashSet<>(iHates);
        this.IHates.removeAll(ILikes); // Assurer qu'aucun élément d'ILikes n'est dans IHates
    }

    public Set<Integer> getILikes() {
        return ILikes;
    }

    public void setILikes(Set<Integer> iLikes) {
        this.ILikes = new HashSet<>(iLikes);
        this.ILikes.removeAll(IHates);
    }

    public void addILike(int id) {
        IHates.remove(id);
        ILikes.add(id);
    }

    public void addIHate(int id) {
        ILikes.remove(id);
        IHates.add(id);
    }

    public Set<Integer> getLikes() {
        return likes;
    }

    public void setLikes(Set<Integer> likes) {
        this.likes = new HashSet<>(likes);
    }

    public Set<Integer> getVisitor() {
        return visitor;
    }

    public void setVisitor(Set<Integer> visitor) {
        this.visitor = new HashSet<>(visitor);
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public Set<String> getHobby() {
        return hobby;
    }

    public void setHobby(Set<String> hobby) {
        this.hobby = new HashSet<>(hobby);
    }

    public Set<Integer> getMatchs() {
        return matchs;
    }

    public void setMatchs(Set<Integer> matchs) {
        this.matchs = new HashSet<>(matchs);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Set<Integer> getFriends() {
        return friends;
    }

    public void setFriends(Set<Integer> friends) {
        this.friends = new HashSet<>(friends);
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSexe() {
        return sexe;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }
}
