import http.server
import socketserver

#really basic http server
#HAS NO ENCRYPTION SO UNSAFE IN THE LONG RUN

PORT = 9090
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()