from socket import *

serverName = '127.0.0.1'
serverPort = 12000
# Socket TCP
# clientSocket = socket(socket.AF_INET, socket.SOCK_STREAM)

# Socket UPD, AF_INET specifica che si usa ipv4, SOCK_DGRAM che si usa UPD e non TCP
clientSocket = socket(AF_INET, SOCK_DGRAM)

message = input('Input lowercase sentence:')
# Aggiunge al messaggio serverName e serverPort e manda il pacchetto generato al socket clientSocket
# need to cast message to bytes for Python 3   Amer 4-2013
clientSocket.sendto(bytes(message,"utf-8"), (serverName, serverPort))
# Dal pacchetto ricevuto da clientSocket, il contenuto viene messo in modifiedMsg e l'indirizzo del mittente viene messo in serverAddress
# Il metodo .recvfrom(2048) setta il buffer size dell'input a 2048 Bytes
# L'istruzione seguente fa entrare il programma in un while-loop da cui si esce quando il socket riceve un pacchetto sulla porta 12000
modifiedMsg, serverAddress = clientSocket.recvfrom(2048)
print(modifiedMsg)
# Chiude connessione UPD con il destinatario
clientSocket.close()