import flask
from flask import request, jsonify, send_file

app = flask.Flask(__name__)
app.config["DEBUG"] = True
global perfVal
global rewardType
global generation

@app.route('/', methods=['GET'])
def home():
    return ''' <h1>Roverdomain Data</h1>
    <p>A prototype API for sending roverdomain performance data.</p>
    '''

@app.route('/api/data', methods=['GET'])
def api_all():
    print('Got data from client')
    global perfval
    global rewardType

    #print(rewardType)
    data = [
    {
        'performance': perfVal,
        'reward': rewardType, 
        'generation': generation     
    }
    ]
    #print('Inside data client: ' + rewardType)
    return jsonify(data)

@app.route('/api/performance', methods=['GET'])
def api_setPerformance():
    data = request.data
    datastring = data.decode("utf-8")
    #print('Data: ' + datastring)

    global perfVal 
    perfVal = data.decode("utf-8")

    #print('PerfVal: ' + str(perfVal))
    return 'Performance has been set'

@app.route('/api/reward', methods=['GET'])
def api_setRewardType():
    data = request.data
    datastring = data.decode("utf-8")
    #print('Data: ' + datastring)

    global rewardType 
    rewardType = data.decode("utf-8")

    #print('Reward Type: ' + str(rewardType))
    return 'Reward type has been set'

@app.route('/api/generation', methods=['GET'])
def api_setGeneration():
    data = request.data
    datastring = data.decode("utf-8")
    
    global generation
    generation = data.decode("utf-8")

    return 'Generation has been set'

@app.route('/api/get_image')
def get_image():
    return send_file('Screenshot.jpg', mimetype='image/gif')
app.run() 