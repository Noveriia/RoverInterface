import flask
from flask import request, jsonify

#just a sample flask app to practice with 

app = flask.Flask(__name__)
app.config["DEBUG"] = True

#rover test data
domaindata = [
   {
    'performance': '2' #arbitrary test number
   }
]

@app.route('/', methods=['GET'])
def home():
    return '''<h1>Roverdomain Data</h1>
<p>A prototype API for sending roverdomain performance data.</p>'''

@app.route('/api/v1/resources/domaindata/all', methods=['GET'])
def api_all():
    return jsonify(domaindata)

app.run()