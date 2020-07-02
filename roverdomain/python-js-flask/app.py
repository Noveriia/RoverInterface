# app.py
# basic test server with flask

from flask import Flask, jsonify, request, render_template
app = Flask(__name__)

@app.route('/index.html')
@app.route('/hello', methods=['GET', 'POST'])
def hello():

    # POST request
    if request.method == 'POST':
        print('Incoming..')
        print(request.get_json())  # parse as JSON
        return 'OK', 200

    # GET request
    else:
        message = {'greeting':'Hello from Flask!'}
        return jsonify(message)  # serialize and use JSON headers

@app.route('/test')
def test_page():
    # look inside `templates` and serve `index.html`
    return render_template('index.html')

"""
#the comment bomb above is other stuff i was testing

#below is basic flask server code
#run with 'flask run'

from flask import Flask
app = Flask(__name__)

@app.route('/')
@app.route('/index.html')
def say_something():
    return 'I am a server doing server things.'

if __name__== '__main__':
    app.run(host='localhost')
    """