import urllib, urllib2
import requests
import os
import base64
import json

def getFBPictures(ids):
    '''
    Downloads all pictures given a list of facebook ids
    get id's from /allIDs
    '''
    for id in ids:
        url = 'https://graph.facebook.com/'+ str(id) +'/picture?type=large'
        urllib.urlretrieve(url, "userPictures/" +str(id)+ ".jpg")
        print "Fetching: "+url

def getAllIDs(username, password):
  base64string = base64.encodestring('%s:%s' % (username, password)).replace('\n', '')
  headers = {
    "Authorization": "Basic %s" % base64string
  }
  req = urllib2.Request("http://collage.hackmit.org/allIds", '', headers)
  response = urllib2.urlopen(req)
  return json.loads(response.read())

if __name__ == '__main__':
  print "Fetching a list of IDs..."
  ids = getAllIDs("admin", os.environ["COLLAGE_PASSWORD"])
  print "Successfully fetched " + str(len(ids)) + " ids."
  getFBPictures(ids)
