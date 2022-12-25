package com.location.search;

import com.location.search.entity.Location;
import com.location.search.service.LocationService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;

import java.util.List;

@SpringBootTest
@Slf4j
class SearchApplicationTests {

	@Autowired
	LocationService locationService;

	@Test
	void contextLoads() {
		log.info("------------FETCHING THE LOCATION WITH LIMIT 10------------");
		List<Location> locations = locationService.listAll();
		log.info("FOUND LOCATION : "+ locations.size());

		log.info("------------SEARCHING LOCATION------------");
		String query = "ran";
		List<String> locs = locationService.search(query);
		log.info("FOUND LOCATIONS FOR : "+query + " -> results :"+ locs.size());

		log.info("------------SEARCHING LOCATION 2------------");
		query = "randomStringSearch";
		locs = locationService.search(query);
		log.info("FOUND LOCATIONS FOR : "+query+ " -> results :"+ locs.size());
	}

}
