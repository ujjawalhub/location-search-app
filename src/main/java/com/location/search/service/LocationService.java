package com.location.search.service;

import com.location.search.dao.LocationRepository;
import com.location.search.entity.Location;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LocationService {

    @Autowired
    LocationRepository locationRepository;

//     List with limit 10
    public List<Location> listAll() {
        List<Location> result = new ArrayList<>();
         Pageable pageable = PageRequest.of(0, 10);
        for (Location location : locationRepository.findAll(pageable)) {
            result.add(location);
        }
        return result;
    }

    public Location save(Location query) {
        query.setLocation((query.getLocation()));
        return locationRepository.save(query);
    }

    public List<String> search(String query) {
        List<Location> locations;
        locations = locationRepository.findMultiStringLocation(query);
        if(locations == null || locations.isEmpty())
            return new ArrayList<>();
        return locations.stream().map(x-> (x.getLocation())).collect(Collectors.toList());
    }

    private String decodeString(String string) {
        try {
            return URLDecoder.decode(string, "UTF-8");
        } catch (UnsupportedEncodingException exception) {
            return string;
        }
    }

    private String encodeString(String string) {
        try {
            return URLEncoder.encode(string, "UTF-8");
        } catch (UnsupportedEncodingException exception) {
            return string;
        }
    }
}
