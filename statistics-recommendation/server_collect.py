
from flask import Flask, request
from flask_cors import CORS

import users_helper
import content_helper
import es_helper

app = Flask(__name__)
CORS(app)


@app.route("/", methods=['GET'])
def hello():
    return "Hello World!"


@app.route("/upload", methods=['POST'])
def upload():
    data = request.json
    if users_helper.valid_plugin_key(key=data['key'], uid=data['uid']):
        data = content_helper.clean(data)
        if content_helper.valid_content(data):
            content_helper.save_one(data)
            es_helper.upload_one(data)
    return "Done!"


if __name__ == '__main__':
    app.run(host='0.0.0.0', processes=4)

