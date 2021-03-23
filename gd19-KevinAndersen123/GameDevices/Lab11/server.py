from tornado import websocket, web, ioloop, httpserver
import tornado, json

session = {}

class WSHandler(tornado.websocket.WebSocketHandler):
    def check_origin(self, origin):
        return True
    
    #think of self as the equivalent of ‘*this’ in C++                	
    def open(self, *args): 
        self.id = self.get_argument("Id")
        player_address = str(self.request.remote_ip)+ ": " + str(self.id)
        session[player_address] = self
        print("UUID Received from client " + self.id)
        print("connection opened")
        for key in session:
            print(key)
        pass
 
    def on_message(self, message):
        msg = json.loads(message)
        if msg["type"] == "updateState" :
            self.send_to_player(message)
        else: 
            self.send_to_player(message)
        pass

    def on_close(self):
        player_address = str(self.request.remote_ip)+ ": " + str(self.get_argument("Id"))
        print(str(player_address)+ "Disconnected")
        del session[player_address]
        pass

    def send_to_player(self,message):
        for key in session:
            if(key != str(self.request.remote_ip)+ ": " + str(self.get_argument("Id"))):
                session[key].write_message(message)
        pass

app= tornado.web.Application([
    #map the handler to the URI named "wstest"
    (r'/wstest', WSHandler),
])
 
if __name__ == '__main__':
    server_port=8080
    app.listen(server_port)
    ioloop.IOLoop.instance().start()
