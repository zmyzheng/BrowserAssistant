from pyspark import SparkConf, SparkContext
from generate_digest import get_top_keywords

sc = SparkContext()


for uid in range(3):
    kws = set([k for k, v in get_top_keywords(uid)])
    others = [i for i in range(3) if i != uid]
    others_files = ['{}.history_id.txt'.format(i) for i in others]
    lines = sc.textFile(','.join(others_files))
    recommends = lines \
        .map(lambda line: line.split("\t")).map(lambda ab: (ab[1], ab[0])) \
        .mapValues(lambda line: len(set(line.split(' ')) & kws)).map(lambda ab: (ab[1], ab[0])) \
        .sortByKey(ascending=False)
    recommends.saveAsTextFile('{}.recommend.txt'.format(uid))