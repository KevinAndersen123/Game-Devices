from tornado import websocket, web, ioloop, httpserver
import tornado, json, time

session = {}
WAITING_FOR_PLAYERS = 0
GAME_IN_PROGRESS = 1
game_state = WAITING_FOR_PLAYERS

class WSHandler(tornado.websocket.WebSocketHandler):
    def check_origin(self, origin):
        return True
    
    #think of self as the equivalent of "*this" in C++                	
    def open(self, *args):     
        player_address = str(self.request.remote_ip) + ":" + str(self.get_argument("Id"))
        print("Connection Opened by : " + player_address)
        pass

    def send_to_other_player(self, message):
        for key in session:
            if key != str(self.request.remote_ip) + ":" + str(self.get_argument("Id")):
                session[key].write_message(message)
        pass
 
    def on_message(self, message):
        msg = json.loads(message)
        if msg["type"] == "Server Update":
            if msg["info"] == "Join":
                print("joining")
                self.join()
            elif msg["type"] == "Connected":
                pass
        elif msg["type"] == "Game Update":
            if msg["info"] == "Game Over":
                self.on_game_over()
            else:
                self.send_to_other_player(message)
        pass
    
    def on_game_over(self):
        server_obj = {}
        server_obj["type"] = "Server Message"
        server_obj["info"] = "Game Over"
        object_to_send = self.format_message(server_obj)
        for key in session:
                session[key].write_message(object_to_send)
        time.sleep(2)
        server_obj["type"] = "Server Message"
        server_obj["info"] = "Waiting To Join"
        object_to_send = self.format_message(server_obj)
        for key in session:
            session[key].write_message(object_to_send)
        if len(session.keys()) != 0:      
            session.clear()
        global game_state
        game_state = WAITING_FOR_PLAYERS
        pass

    def on_close(self):
        global game_state
        player_address = str(self.request.remote_ip) + ":" + str(self.get_argument("Id"))
        print(str(player_address) + " Disconnected")
        if player_address in session.keys():
            del session[player_address]
            game_state = WAITING_FOR_PLAYERS
            server_obj = {}
            server_obj["type"] = "Server Message"
            server_obj["info"] = "Game Over"
            object_to_send = self.format_message(server_obj)
            for key in session:
                session[key].write_message(object_to_send)
        pass

    def join(self):
        global game_state
        if game_state == WAITING_FOR_PLAYERS:
            self.id = self.get_argument("Id")
            player_address = str(self.request.remote_ip) + ":" + str(self.id)
            session[player_address] = self
            if len(session) == 2: 
                game_state = GAME_IN_PROGRESS
                server_obj = {}
                server_obj["type"] = "Server Message"
                server_obj["info"] = "Game Has Started"
                object_to_send = self.format_message(server_obj)
                for key in session:
                    session[key].write_message(object_to_send)
            else:
                server_obj = {}
                server_obj["type"] = "Server Message"
                server_obj["info"] = "Waiting For Game"
                object_to_send = self.format_message(server_obj)
                self.write_message(object_to_send)
        else:
            server_obj = {}
            server_obj["type"] = "Server Message"
            server_obj["info"] = "Game Is Full"
            object_to_send = self.format_message(server_obj)
            self.write_message(object_to_send)
        pass

    def format_message(self, data):
        return json.dumps(data)

app= tornado.web.Application([
    #map the handler to the URI named "wstest"
    (r'/wstest', WSHandler),
])
 
if __name__ == '__main__':
    server_port=8080
    app.listen(server_port)
    ioloop.IOLoop.instance().start()