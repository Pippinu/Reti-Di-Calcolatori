from socket import *

serverName = "servername"
serverPort = 12000

clientSocket = socket(AF_INET, SOCK_STREAM)
# open the TCP connection
clientSocket.connect((serverName,serverPort))

sentence = input("Input lowercase sentence: ")
# send the user's line over the TCP connection
# No need to specify server name, port
# sentence casted to bytes for Python 3  Amer 4-2013
clientSocket.send(bytes(sentence, "utf-8"))

#output to console what is sent to the server
print ("Sent to Make Upper Case Server: ", sentence)

# get user's line back from server having been modified by the server
modifiedSentence = clientSocket.recv(1024)

# output the modified user's line 
print ("Received from Make Upper Case Server: ", modifiedSentence)

# close the TCP connection
clientSocket.close()