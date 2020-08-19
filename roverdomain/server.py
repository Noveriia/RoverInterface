import flask
from flask import request, jsonify, send_file

app = flask.Flask(__name__)
app.config["DEBUG"] = True
global perfVal
global perfValDiff
global perfValDpp
global rewardType
global generation

#set initial temporary values to prevent "undefined errors"
perfVal = 0
perfValDiff = 0
rewardType = 0
generation = 0

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
    global perfValDiff

    data = [
    {
        'performance': perfVal,
        'performanceDiff': perfValDiff,
        'reward': rewardType, 
        'generation': generation     
    }
    ]
   
    return jsonify(data)

@app.route('/api/performance', methods=['GET'])
def api_setPerformance():
    data = request.data
    datastring = data.decode("utf-8")

    global perfVal 
    perfVal = data.decode("utf-8")

    return 'Performance has been set'

@app.route('/api/performance/difference', methods=['GET'])
def api_setPerformanceDiff():
    data = request.data
    datastring = data.decode("utf-8")

    global perfValDiff
    #perfValDiff = data.decode("utf-8")

    perfValDiff = 1
    return 'Performance has been set'

@app.route('/api/reward', methods=['GET'])
def api_setRewardType():
    data = request.data
    datastring = data.decode("utf-8")

    global rewardType 
    rewardType = data.decode("utf-8")

    return 'Reward type has been set'

@app.route('/api/generation', methods=['GET'])
def api_setGeneration():
    data = request.data
    datastring = data.decode("utf-8")
    
    global generation
    generation = data.decode("utf-8")

    return 'Generation has been set'

@app.route('/api/image.jpg')
def api_getImage():
    return send_file('Screenshot_SR0.jpg', mimetype='image/gif')

@app.route('/api/icon')
def api_getIcon():
    return send_file('icon.png', mimetype='image/gif')

app.run() 