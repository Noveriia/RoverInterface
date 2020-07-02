import csv, json
import pandas as pd
import numpy as np

csvFilePath = 'Global_Reward_T.csv'
jsonFilePath = 'Global_Reward.json'

#transposes the old csv into a better format
pd.read_csv('../Global_Reward.csv', header=None).T.to_csv('Global_Reward_T.csv', header=False, index=False)

#collects all performance values into an array of floats and adds to json 
with open(csvFilePath) as csvFile:
    csvReader = csv.DictReader(csvFile)
    data = {'name' : 'Rover', 'key' : 'rv', 'performace values' : []}
    temparr = [] 

    for row in csvReader: 
        temparr.append(row['Performance'])
    temparr2 = [float(i) for i in temparr] 
    data['performace values'].append(temparr2)

#create new json file and write data on it
with open(jsonFilePath, 'w') as jsonFile:
    jsonFile.write(json.dumps(data, indent=4)) #for readability