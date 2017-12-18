from pyspark import SparkConf, SparkContext

sc = SparkContext()

for uid in range(3):
    counts = sc.textFile('{}.history.txt'.format(uid))\
        .flatMap(lambda line: line.split(" "))\
        .map(lambda word: (word, 1))\
        .reduceByKey(lambda a, b: a + b)\
        .map(lambda ab: (ab[1], ab[0])) \
        .sortByKey(ascending=False)\
        .map(lambda ab: (ab[1], ab[0]))
    counts.saveAsTextFile('{}.count.txt'.format(uid))

    lines = sc.textFile('{}.history.txt'.format(uid))
    line_with_linenum = lines.zipWithIndex()
    totallines = line_with_linenum.map(lambda ab: ab[1]).reduce(max)
    worddf = line_with_linenum.map(lambda ab: (ab[1], ab[0])) \
        .flatMapValues(lambda line: line.split(" ")) \
        .distinct().map(lambda ab: (ab[1], 1)) \
        .reduceByKey(lambda a, b: a + b) \
        .mapValues(lambda v: v / 1.0 / totallines)
    tfidf = counts.join(worddf).mapValues(lambda tfidf: tfidf[0] * tfidf[1])
    tfidf.map(lambda ab: (ab[1], ab[0])) \
        .sortByKey(ascending=False) \
        .map(lambda ab: (ab[1], ab[0])).take(1)
    tfidf.saveAsTextFile('{}.tfidf.txt'.format(uid))