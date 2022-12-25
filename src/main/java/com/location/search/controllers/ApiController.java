package com.location.search.controllers;

import com.location.search.entity.Location;
import com.location.search.service.LocationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/")
@Slf4j
public class ApiController {

    @Autowired
    LocationService locationService;

    @GetMapping
    public List<Location> getAllUsers() {
        return locationService.listAll();
    }

    @GetMapping(path = "/search")
    public List<String> searchLoacations(@RequestParam String query) {
        log.info("Search query : "+query);
        return locationService.search(query);
    }

    @GetMapping(path = "/add")
    public Location addLocations(@RequestParam String query) {
        log.info("Add query : "+query);
        Location location = new Location();
        location.setLocation(query);
        location.setId(UUID.randomUUID().toString());
        return locationService.save(location);
    }

}
