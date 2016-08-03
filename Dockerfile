FROM ubuntu:16.04

COPY . /src

RUN cd /src && apt-get update && apt-get install -y python-pip && pip install --user -r requirements.txt

CMD cd /src && python server.py
