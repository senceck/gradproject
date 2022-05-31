from email.mime import image
from multiprocessing.connection import wait
from urllib import response
from flask import Flask, render_template , request, jsonify, json
import base64
import joblib
from PIL import Image, ImageChops, ImageEnhance
import sys 
import string
import time
import os
import numpy as np
import keras
from io import BytesIO
from keras.models import load_model
from keras.backend import manual_variable_initialization

image_size = (120, 120)
pathfile = '/etc/baseimage.jpeg'

manual_variable_initialization(True)

def convert_to_ela_image( quality):
    temp_filename = 'temp_file_name.jpg'
    ela_filename = 'temp_ela.png'

    image = Image.open(pathfile).convert('RGB')
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
 
app = Flask(__name__)

@app.route("/", methods = ['GET' , 'POST'])
def test():
    #open data - image - base64 here
    if request.method == 'POST':
        payload = request.json

        prepare_image(payload)
        ela_image = convert_to_ela_image(90)
        preprocessed_image = np.array(ela_image.resize(image_size)).flatten() / 255.0
        preprocessed_image = preprocessed_image.reshape(-1, 120, 120, 3)
        model = load_model('/home/senceck/modelNEWCASSIA2_server.h5')
        class_names = ['0', '1']
        y_pred = model.predict(preprocessed_image)
        y_pred_class = np.argmax(y_pred, axis = 1)[0]
        return jsonify({"Class": f'{class_names[y_pred_class]}', "Confidence": f'{np.amax(y_pred) * 100:0.1f} %'})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")