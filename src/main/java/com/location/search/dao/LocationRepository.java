package com.location.search.dao;

import com.location.search.entity.Location;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends ElasticsearchRepository<Location, String>  {

    @Query("{\"multi_match\": {\"query\": \"?0\", \"fields\": [\"location\"], \"fuzziness\": \"AUTO\"}}")
    List<Location> findMultiStringLocation(String q);

    Page<Location> findAll(Pageable pageable);

}
