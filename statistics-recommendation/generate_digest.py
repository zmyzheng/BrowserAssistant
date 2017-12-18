from db_helpers import get_page_collections
from hotfix import fixone
from bson.objectid import ObjectId

def get_top_keywords(uid, verbose=False):
    uid = str(uid)
    all_word = []
    all_count = 0
    with open('{}.count.txt/part-00000'.format(uid), 'rb') as fp:
        for line in fp.readlines():
            word, count = line.decode().strip()[1:-1].split(',')
            word = word[1:-1]
            count = int(count)
            all_count+=count
            all_word.append((word, count))
    threshold = all_count*0.0028
    ans = []
    if verbose:
        print(threshold)
    for word, count in all_word:
        if count>threshold:
            ans.append((word, count))
            if verbose:
                print(word, count)
        else:
            break
    return ans


def get_recommends_keywords(uid, verbose=False):
    uid = str(uid)
    all_ids = []
    with open('{}.recommend.txt/part-00000'.format(uid), 'rb') as fp:
        for line in fp.readlines():
            count, theid = line.decode().strip()[1:-1].split(',')
            theid = theid.strip()[1:-1]
            all_ids.append((theid, int(count)))
    ans = all_ids[0:10]
    if verbose:
        print(ans)
    return ans


def get_title_by_id(tid):
    return fixone(tid)


def get_page_by_id(pid):
    coll = get_page_collections()
    for page in coll.find({"_id": ObjectId(pid)}):
        return clean_page(page)


def clean_page(page):
    _id=str(page.pop('_id'))
    page.pop('key')
    page.pop('time')
    page.pop('uid')
    page.pop('ip')
    if 'title' not in page:
        page['title'] = get_title_by_id(_id)
    return page


def get_recommendations(uid):
    res = []
    for rid, _ in get_recommends_keywords(uid):
        res.append(get_page_by_id(rid))
    return res


if __name__ == '__main__':
    print(get_recommendations(0))