FROM python:3.8.3-alpine

WORKDIR /usr/src/app

RUN python3 -m pip install django requests
RUN apk add curl
COPY . .
EXPOSE 8000

CMD python manage.py runserver 0.0.0.0:8000