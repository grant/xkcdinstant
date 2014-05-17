import os
import json

# Trailing backslash required
datalocation = 'data/'

newjson = dict()
for filename in os.listdir(datalocation):
  fname = filename.split('.')[0]
  f = open(datalocation + filename, 'r')
  newjson[fname] = (f.readlines()[0])

outfile = open('out.json', 'w')
outfile.write(json.dumps(newjson))
outfile.close()