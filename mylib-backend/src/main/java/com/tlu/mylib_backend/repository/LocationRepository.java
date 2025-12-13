package com.tlu.mylib_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tlu.mylib_backend.entity.Location;

public interface LocationRepository extends JpaRepository<Location, Integer>{

}
