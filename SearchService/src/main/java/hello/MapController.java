package hello;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MapController {

    @Autowired
    ElasticSearchService elasticSearchService;

    @CrossOrigin(origins = "*")
    @RequestMapping("/search")
    public List<Page> search(@RequestParam(value = "query", defaultValue = "all") String query, @RequestParam(value = "uid", defaultValue = "0") String uid) {
        List<Page> pages = null;

        pages = elasticSearchService.searchDocument(query, uid);

//
        return pages;
    }


}
