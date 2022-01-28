from socket import *

serverPort = 12000
# Socket UPD, socket.AF_INET specifica che si usa ipv4, socket.SOCK_DGRAM che si usa UPD e non TCP
serverSocket = socket(AF_INET, SOCK_DGRAM)
# Assegna al serverSocket la porta 12000, le virgolette vuote indicano che ogni pacchetto indirizzato alla porta 12000 viene reindirizzato al serverSocket
serverSocket.bind(('127.0.0.1',serverPort))
# Dal pacchetto ricevuto da serverSocket, il contenuto viene messo in message e l'indirizzo del mittente viene messo in clientAddress, , tale indirizzo verra utilizzato
# per rimandare indietro il messaggio modificato
# il metodo .recvfrom(2048) setta il buffer size dell'input a 2048 Bytes
# L'istruzione seguente fa entrare il programma in un while-loop da cui si esce solo arrestando forzatamente il server
while 1:
    message, clientAddress = serverSocket.recvfrom(2048)
    # message viene reso Maiuscolo con il metodo .upper()
    modifiedMsg = message.upper()
    # Il messaggio modificato, cioe message ma in Maiuscolo, viene reinviato al client usando l'indirizzo del mittente del messaggio originale
    serverSocket.sendto(modifiedMsg, clientAddress)