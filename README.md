# pay-assessment

# url shortner


input: https://www.markdownguide.org/cheat-sheet/
output: https://www.short.com/aksuudgaskj

deterministic consideration: 
-scaling

random:
-collision checking/latency

For deterministic, check if input url in hashmap. If in hashmap, return short. If not, run though hashing algo, return short. 

key:value
long: short
short: long


# endpoints
(POST)/longUrl

if in hashmap, return short
##
else run though hash algo, return short
update db
##
return shortUrl

(GET)/shortUrl
lookup short in db (key), return longUrl (value)
return longUrl (redirect to longUrl)


