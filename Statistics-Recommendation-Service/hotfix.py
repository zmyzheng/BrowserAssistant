import requests
from lxml.html import fromstring
from db_helpers import get_page_collections
from bson.objectid import ObjectId
import time

def geturltitle(url):
    r = requests.get(url, timeout=0.9)
    tree = fromstring(r.content)
    title = tree.findtext('.//title')
    return title


def fixall():
    coll = get_page_collections()
    i = 0
    for p in coll.find():
        i+=1
        print(i)
        if 'title' not in p:
            try:
                t=geturltitle(p['url'])
            except Exception as e:
                t=''
            coll.update_one({
                '_id': p['_id']
            }, {
                '$set': {
                    'title': t
                }
            })
            time.sleep(1)
    pass


def fixone(pid):
    coll = get_page_collections()
    for p in coll.find({'_id':ObjectId(pid)}):
        if 'title' not in p:
            try:
                t=geturltitle(p['url'])
            except Exception as e:
                t=''
            coll.update_one({
                '_id': p['_id']
            }, {
                '$set': {
                    'title': t
                }
            })
            p['title'] = t
        return p['title']
    return ''

if __name__ == '__main__':
    # print(fixone('5a2f07200e5a2d3ae5985ec9'))
    fixall()