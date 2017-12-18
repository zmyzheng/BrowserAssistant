import re
from db_helpers import get_page_collections
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import os, shutil

stopWords = set(stopwords.words('english'))
stopWords.add('...')
reg_int = re.compile("^\d*$")
reg_float = re.compile("^\d*.\d*$")


def dum_history(uid):
    # remove previous data
    count_dir = './{}.count.txt'.format(uid)
    if os.path.exists(count_dir):
        shutil.rmtree(count_dir)

    # link to database
    coll = get_page_collections()
    with open(uid+'.history.txt', 'w+') as fp:
        for doc in coll.find({'uid': uid}).sort([('time', -1)]).limit(300):
            words = word_tokenize(doc['content'])
            words_filtered = []
            for word in words:
                if word not in stopWords and not reg_int.match(word) and not reg_float.match(word):
                    words_filtered.append(word.lower())
            fp.write(' '.join(words_filtered))
            fp.write('\n')


def dum_content_with_id(uid):
    # remove previous data
    count_dir = '{}.recommend.txt'.format(uid)
    if os.path.exists(count_dir):
        shutil.rmtree(count_dir)
    uid = str(uid)
    # link to database
    coll = get_page_collections()
    with open(uid+'.history_id.txt', 'w+') as fp:
        for doc in coll.find({'uid': uid}).sort([('time', -1)]).limit(300):
            fp.write(str(doc['content'].encode()))
            fp.write('\t')
            fp.write(str(doc['_id']))
            fp.write('\n')


if __name__ == '__main__':
    for i in range(3):
        dum_content_with_id(i)
