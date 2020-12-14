# -*- coding: utf-8 -*-

import os.path
import os
import cv2

import sys

import pygame
import pygame.camera

from Face_Site import Predict
from flask import Flask, request, render_template, send_from_directory

pygame.camera.init()
pygame.camera.list_cameras()
cam = pygame.camera.Camera("/dev/video0",(640,480))
cam.start()

app = Flask(__name__)

APP_ROOT = os.path.dirname(os.path.abspath(__file__))

@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/upload", methods=["POST"])
def upload():
    target = os.path.join(APP_ROOT, 'images/')
    if not os.path.isdir(target):
            os.mkdir(target)
    else:
        print("Couldn't create upload directory: {}".format(target))
    for upload in request.files.getlist("file"):
        filename = upload.filename
        destination = "/".join([target, filename])
        upload.save(destination)
    execution_path = target
    image = Predict(os.path.join(execution_path, filename))
    out_image = cv2.imwrite(os.path.join(execution_path,  "flask"+filename), image)
    return render_template("Flask_FacialRecognition_WebService.html", image_name="flask"+filename)


@app.route("/takeScreen", methods=["POST"])
def takeScreen():
    target = os.path.join(APP_ROOT, 'images/')
    img = cam.get_image()
    try:
        os.remove("./images/filename.jpg")
        os.remove("./images/flaskfilename.jpg")
        os.remove("./static/flaskfilename.jpg")
    except:
        pass
    filename = "filename.jpg"
    pygame.image.save(img,os.path.join(APP_ROOT, 'images') + "/filename.jpg")
    
    # for upload in request.files.getlist("file"):
    #     filename = upload.filename
    #     destination = "/".join([target, filename])
    #     upload.save(destination)
    #     print("Save it to:", destination)

    execution_path = target
    image = Predict("./images/filename.jpg")
    out_image = cv2.imwrite("./static/flaskfilename.jpg", image)
    print('wrote out the image')
    print('flask'+filename, file=sys.stderr)
    return render_template("hard.html", image_name="flask"+filename)


@app.route('/upload/<filename>')
def send_image(filename):
    return send_from_directory("images", filename)


if __name__ == "__main__":
    app.run()