from pymongo import MongoClient
from pprint import pprint

def get_collections(name):
    client = MongoClient()
    return client['cc-database'][name]


def get_user_collections():
    return get_collections('user-collection')


def get_page_collections():
    return get_collections('page-collection')

