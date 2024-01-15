import json
import pickle
import numpy as np


__locations=None
__data_columns=None
__model=None


def get_estimated_price(location,sqft,bhk,bath):
   
   try:
       locindex=__data_columns.index(location.lower())
   except:
       locindex=-1
    
       
   x=np.zeros(len(__data_columns)) #here we create all zeros variable equal to the size of the no of columns
   x[0]=sqft
   x[1]=bath
   x[2]=bhk
   if(locindex>=0):
        x[locindex]=1
   return round(__model.predict([x])[0],2)
   




def load_saved_artifacts():
    print("Loading saved artifacts...start")
    global __data_columns
    global __locations
    global __model

    f=open('./artifacts/columns.json','r')
    __data_columns=json.load(f)['datacolumns']
    __locations=__data_columns[3:]
    f1=open('./artifacts/Realstatepredictpricemodel.pickle','rb')
    __model=pickle.load(f1)
    print("loading saved artifacts...done")



def get_location_names():
   load_saved_artifacts()
   return __locations






if __name__=="__main__":
   load_saved_artifacts()
  # print(get_location_names())
  # print(get_estimated_price("",1000,2,2))
   
    