import os
import json

# Trailing backslash required
datalocation = 'data/'

newjson = dict()
for filename in os.listdir(datalocation):
  fname = filename.split('.')[0]
  f = open(datalocation + filename, 'r')
  loadedline = f.readlines()[0]
  if loadedline[0:1] == '{': # Making sure the line is valid json
  	newjson[fname] = json.loads(loadedline)

outfile = open('out.json', 'w')
outfile.write(json.dumps(newjson))
outfile.close()