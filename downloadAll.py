import urllib

def getFBPictures(ids):
    '''
    Downloads all pictures given a list of facebook ids
    get id's from /allIDs
    '''
    for id in ids:
        url = 'https://graph.facebook.com/'+ str(id) +'/picture?type=large'
        urllib.urlretrieve(url, "userPictures/" +str(id)+ ".jpg")
        print url

ids = [
"10153081525766725",
"1018565234822538",
"10155743716060296",
"10207658318764442"
]

getFBPictures(ids)
