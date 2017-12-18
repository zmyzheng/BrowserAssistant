from flask import Flask, request, jsonify
from flask_cors import CORS

from generate_digest import get_top_keywords, get_title_by_id, get_recommendations

app = Flask(__name__)
CORS(app)


@app.route("/title/<tid>", methods=['GET'])
def title(tid):
    return jsonify({
        'title': get_title_by_id(tid)
    })


@app.route("/summary/<uid>", methods=['GET'])
def summary(uid):
    res = []
    for record in get_top_keywords(uid):
        res.append({
            'keyword': record[0],
            'frequency': record[1],
        })
    return jsonify(res)


@app.route("/recommendation/<uid>", methods=['GET'])
def recommendation(uid):
    return jsonify(get_recommendations(uid))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8899, processes=4)

