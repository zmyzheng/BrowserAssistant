from db_helpers import get_user_collections
from pprint import pprint as print


def insert():
    user_collection = get_user_collections()
    user_collection.insert_one(
        {
            "name": "Huafeng Shi",
            "email": "hs2917@columbia.edu",
            "userId": "0",
            "plugin-key": "vooEfX6FPnYXQgqmA2Igy2oVKBfFthDw",
        }
    )
    user_collection.insert_one(
        {
            "name": "Mingyang Zheng",
            "email": "mz2594@columbia.edu",
            "userId": "1",
            "plugin-key": "0LpJv0suPPfD4wzSdl6gaFfx4XkLULeW",
        }
    )
    user_collection.insert_one(
        {
            "name": "Ang Li",
            "email": "al3699@columbia.edu",
            "userId": "2",
            "plugin-key": "Vsv4nz7SUUVx65DWZrSwbfNAVFDRltlS",
        }
    )


def print_users():
    for doc in get_user_collections().find():
        print(doc)


def valid_plugin_key(key, uid):
    """
    :param uid:
    :param key:
    :return:
    """
    user_collection = get_user_collections()
    doc = user_collection.find_one({
        "plugin-key": key,
    })
    return doc['userId'] == str(uid)


if __name__ == '__main__':
    print(valid_plugin_key('0LpJv0suPPfD4wzSdl6gaFfx4XkLULeW', '1'))
