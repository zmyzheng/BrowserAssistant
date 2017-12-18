from db_helpers import get_page_collections
import pprint

def clean(data):
    c = data['content']
    data['content'] = c.replace('\n', '').replace('\t', '').replace('\r', '').replace('\xa0', '')
    return data
    pass


def valid_content(data):
    return len(data['content']) != 0


def save_one(data):
    coll = get_page_collections()
    coll.insert_one(data)


def count_one(uid):
    coll = get_page_collections()
    print(coll.count({'uid':uid}))

def show_one(uid):
    coll = get_page_collections()
    for doc in coll.find({'uid':uid}):
        pprint.pprint(doc)


if __name__ == '__main__':
    count_one('2')