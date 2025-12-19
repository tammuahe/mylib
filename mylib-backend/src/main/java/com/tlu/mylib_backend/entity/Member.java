package com.tlu.mylib_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "members", indexes = { @Index(columnList = "search_name", name = "idx_members_search_name") })
@NoArgsConstructor
@Getter
@Setter
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String phone;
    private String city;
    private String email;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "search_name")
    @JsonIgnore
    private String searchName;

    @PrePersist
    @PreUpdate
    private void buildSearchName() {
        String fn = firstName == null ? "" : firstName.toLowerCase();
        String ln = lastName == null ? "" : lastName.toLowerCase();
        this.searchName = (fn + " " + ln + " " + ln + " " + fn).trim();
    }
}
