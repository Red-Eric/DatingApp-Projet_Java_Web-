package com.dating.datingApp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dating.datingApp.Entity.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer>{
    
}
