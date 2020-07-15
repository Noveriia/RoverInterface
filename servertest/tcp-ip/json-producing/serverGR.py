import socket
import sys
import json

#Json file path
with open('Global_Reward.json') as json_data:
    temp = json.load(json_data)
    json_data.close()

data = json.dumps(temp)

#Create a TCP/IP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

#Bind the socket to the port
server_address = ('localhost', 10000)
print(sys.stderr, 'starting up on %s port %s' % server_address)
sock.bind(server_address)

#Listen for incoming connections
sock.listen(1)

while True:
    #Wait for a connection
    print(sys.stderr, 'waiting for a connection')
    connection, client_address = sock.accept()

    try:
        print(sys.stderr, 'connection from', client_address)
        print('Sending json...')
        connection.sendall(data.encode('utf-8'))
        print('Json sent...')
        
    finally:
        #Clean up the connection
        print('closing connection...')
        connection.close()

print("Sent:     {}".format(data))