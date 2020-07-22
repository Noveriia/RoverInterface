import flask
from flask import request, jsonify

app = flask.Flask(__name__)
app.config["DEBUG"] = True
global perfVal
perfVal = 0


@app.route('/', methods=['GET'])
def home():
    return ''' <h1>Roverdomain Data</h1>
    <p>A prototype API for sending roverdomain performance data.</p>
    '''

@app.route('/api/v1/resources/domaindata/all', methods=['GET'])
def api_all():
    print('Got data from client')
    global perfval
    data = [
    {
        'performance': perfVal #arbitrary test number
    }
    ]
    print('Inside data client: ' + str(perfVal))
    return jsonify(data)

@app.route('/api/v1/resources/domaindata/change', methods=['GET'])
def api_setPerformance():
    data = request.data
    datastring = data.decode("utf-8")
    print('Data: ' + datastring)

    global perfVal 
    perfVal = data.decode("utf-8")

    print('PerfVal: ' + str(perfVal))
    return 'Finished!'

app.run() 