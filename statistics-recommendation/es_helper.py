import certifi, json
from elasticsearch import Elasticsearch


aws_es = 'https://search-mycces-np6ljc5pr7gnzpeiug2blwmrxe.us-east-1.es.amazonaws.com'


def get_es():
    return Elasticsearch(aws_es, use_ssl=True, ca_certs=certifi.where())


def create_index():
    es = get_es()
    es.indices.create(
        index='pages',
        body = load_mapping_config()
    )


def load_mapping_config():
    with open('mapping.json') as f:
        mapping_config = json.dumps(json.load(f))
    return mapping_config


def upload_one(data):
    _id = data.pop('_id')
    data.pop('key')
    es = get_es()
    es.create(index='pages', doc_type='page',id=str(_id), body=json.dumps(data))


if __name__ == '__main__':
    create_index()
