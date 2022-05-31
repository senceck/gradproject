import os
import numpy as np
from keras.models import load_model
from keras.backend import manual_variable_initialization
from PIL import Image, ImageChops, ImageEnhance

image_size = (120, 120)

def convert_to_ela_image( path, quality):
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

def prepare_image(image_path):
    return np.array(convert_to_ela_image(image_path, 90).resize(image_size)).flatten() / 255.0


class_names = ['0', '1']
count_Au=0
accumelated_perc=0
correct_Au=0
manual_variable_initialization(True)

loaded_model = load_model('/home/senceck/modelNEWCASSIA2_server.h5')

for dirname, subdirect, files in os.walk('/home/senceck/CASIA1dataset/CASIA1/Au'):
    for filename in files:
        if filename.endswith('jpg') or filename.endswith('png'):
            image_path = os.path.join(dirname, filename)
            image=prepare_image(image_path) #converted to ELA
            image = image.reshape(-1, 120, 120, 3)
            y_pred = loaded_model.predict(image)
            y_pred_class = np.argmax(y_pred, axis = 1)[0]
            accumelated_perc=accumelated_perc + y_pred
            count_Au=count_Au+1
            if y_pred_class == 1:
                correct_Au= correct_Au +1
y_pred_class_B = np.argmax(accumelated_perc/count_Au, axis = 1)[0]

accumelated_perc2=0
count_Sp=0
correct_Sp=0
for dirname, subdirect, files in os.walk('/home/senceck/CASIA1dataset/CASIA1/Sp'):
    for filename in files:
        if filename.endswith('jpg') or filename.endswith('png'):
            image_path = os.path.join(dirname, filename)
            image=prepare_image(image_path) #converted to ELA
            image = image.reshape(-1, 120, 120, 3)
            y_pred = loaded_model.predict(image)
            y_pred_class = np.argmax(y_pred, axis = 1)[0]
            accumelated_perc2=accumelated_perc2 + y_pred
            count_Sp=count_Sp+1
            if y_pred_class == 0:
                correct_Sp= correct_Sp +1
y_pred_class_C = np.argmax(accumelated_perc/count_Au, axis = 1)[0]

print(f'True Positive: {correct_Au} out of {count_Au}')
print(f'True Negative: {correct_Sp} out of {count_Sp}')
print(f'Dataset size: {count_Au + count_Sp}')
#print(f'The number of tampered images: {count_Sp}')

print(f'Final accuracy: {(correct_Au+correct_Sp)/(count_Au+count_Sp)*100} %')