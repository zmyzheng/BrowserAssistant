package hello;

import io.searchbox.client.JestClient;
import io.searchbox.client.JestClientFactory;
import io.searchbox.client.JestResult;
import io.searchbox.client.config.HttpClientConfig;
import io.searchbox.core.Index;
import io.searchbox.core.Search;
import io.searchbox.core.search.sort.Sort;
import io.searchbox.params.Parameters;
import org.elasticsearch.common.unit.DistanceUnit;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

import static io.searchbox.core.search.sort.Sort.Sorting.ASC;
import static io.searchbox.core.search.sort.Sort.Sorting.DESC;

@Component
public class ElasticSearchService {

    @Value("${es.index}")
    private String INDEX;

    @Value("${es.type}")
    private String TYPE;

    private JestClient client = null;

    private static long docId = System.currentTimeMillis();


    @Autowired
    public ElasticSearchService(@Value("${es.endpoint}") String endPoint) {
        JestClientFactory factory = new JestClientFactory();
        factory.setHttpClientConfig(new HttpClientConfig
                .Builder(endPoint)
                .multiThreaded(true)
                .build());
        client = factory.getObject();
    }



    public List<Page> searchDocument(String key, String uid) {
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        if (key.equals("all")) {
            searchSourceBuilder.query(QueryBuilders. matchAllQuery());
        }
        else {
            BoolQueryBuilder boolQuery = new BoolQueryBuilder();
            boolQuery.must(QueryBuilders.matchQuery("uid", uid));
            boolQuery.must(QueryBuilders.matchQuery("content", key));


            searchSourceBuilder.query(boolQuery);
//

//            searchSourceBuilder.query(QueryBuilders.matchQuery("content", key));
//            searchSourceBuilder.query(QueryBuilders.matchQuery("uid", "1"));
//            System.out.println(searchSourceBuilder.toString());
        }
        Search search = new Search.Builder(searchSourceBuilder.toString()).addSort(new Sort("time", DESC)).setParameter(Parameters.SIZE, 10)
                .addIndex(INDEX).addType(TYPE).build();
        List<Page> pages = null;
        try {
            JestResult result = client.execute(search);
            pages = result.getSourceAsObjectList(Page.class);

        } catch (IOException e) {
            e.printStackTrace();
        }
        return pages;
    }



}
