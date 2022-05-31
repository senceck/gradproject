import random
import numpy as np
import glob
import cv2
import tensorflow as tf
import re 
import matplotlib.pyplot as plt
#matplotlib inline
np.random.seed(2)
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix
import keras
from keras.utils.np_utils import to_categorical
from keras.models import Sequential
from keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.optimizers import Adam
from keras.callbacks import EarlyStopping
from keras.callbacks import EarlyStopping, ReduceLROnPlateau
from keras.layers import Dense, Dropout, Flatten, Conv2D, MaxPooling2D
from keras.layers import LSTM, Input, TimeDistributed
from keras.models import Model
import pandas as pd
from PIL import Image, ImageChops, ImageEnhance
import os
import itertools


def convert_to_ela_image(path, quality):
    temp_filename = 'temp_file_name.jpg'
    ela_filename = 'temp_ela.png'

    image = Image.open(path).convert('RGB')
    image.save(temp_filename, 'JPEG', quality = quality)
    temp_image = Image.open(temp_filename)

    ela_image = ImageChops.difference(image, temp_image)

    extrema = ela_image.getextrema()
    max_diff = max([ex[1] for ex in extrema])
    if max_diff == 0:
        max_diff = 1
    scale = 255.0 / max_diff

    ela_image = ImageEnhance.Brightness(ela_image).enhance(scale)

    return ela_image

#print(os.listdir("../input/casia-dataset")) # Print all folders available in the input directory.

ELA_images= [] 
ELA_labels = [] 
count_real=0;
count_fake=0;

for dirname, subdirect, files in os.walk('/home/senceck/CASIA2dataset/CASIA2/Au'):
    for filename in files:
        if filename.endswith('jpg') or filename.endswith('png'):
            image_path = os.path.join(dirname, filename)
            ela_image=convert_to_ela_image(image_path, 90) 
            ela_image=ela_image.resize((120,120))           
            ela_image=np.array(ela_image)/255.0        
            ELA_images.append(ela_image)
            ELA_labels.append(1)
            count_real=count_real+1


for dirname, subdirect, files in os.walk('/home/senceck/CASIA2dataset/CASIA2/Tp'):
    for filename in files:
        if filename.endswith('jpg') or filename.endswith('png'):
            image_path = os.path.join(dirname, filename)
            ela_image=convert_to_ela_image(image_path, 90) 
            ela_image=ela_image.resize((120,120))           
            ela_image=np.array(ela_image)/255.0              
            ELA_images.append(ela_image)
            ELA_labels.append(0)
            count_fake=count_fake+1
            
ELA_images = np.array(ELA_images)
ELA_labels = np.array(ELA_labels)

earlystop = EarlyStopping(patience=10)

learning_rate_reduction = ReduceLROnPlateau(monitor='val_accuracy', 
                                            patience=2, 
                                            verbose=1, 
                                            factor=0.5, 
                                            min_lr=0.00001)
callbacks = [earlystop, learning_rate_reduction]

ELA_labels = to_categorical(ELA_labels, 2) #Inform the model we have two outputs
X_train, X_val, Y_train, Y_val = train_test_split(ELA_images, ELA_labels, test_size = 0.35, random_state=5)


def create_model():
    model_cnn = Sequential()
    model_cnn.add(Conv2D(32, kernel_size=(3, 3), #input
                 activation='relu',
                 input_shape=(120, 120, 3)))
    model_cnn.add(Conv2D(32, (3, 3), activation='relu'))
    model_cnn.add(Conv2D(32, (3, 3), activation='relu'))
    model_cnn.add(MaxPooling2D(pool_size=(2, 2)))
    model_cnn.add(Dropout(0.2)) #20% of the nodes are deactivated
    model_cnn.add(Flatten())
    model_cnn.add(Dense(128, activation='relu'))                #hidden layers
    model_cnn.add(Dropout(0.3))
    model_cnn.add(Dense(2, activation='softmax')) # Percentage output is converted so that their sum = 1  #output layers
    opt = Adam(learning_rate = 1e-4, decay = 1e-4/30)
    model_cnn.compile(loss=tf.keras.losses.categorical_crossentropy, # Loss is depending on category not on value such as 2 != 1    
              optimizer=opt,
              metrics=['accuracy'])    
    return model_cnn



model = create_model()

history=model.fit(X_train,
          Y_train,
          batch_size =  32,
          epochs = 30,
          validation_data = (X_val, Y_val),
           callbacks = callbacks)





save_path = './modelNEWCASSIA2_server.h5'
model.save(save_path)