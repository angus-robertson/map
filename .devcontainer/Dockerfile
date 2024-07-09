FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm

# Install tippecanoe
RUN apt-get update \
    && apt-get -y upgrade \
    && apt-get -y install build-essential libsqlite3-dev zlib1g-dev \
    && cd /root \
    && git clone https://github.com/mapbox/tippecanoe.git tippecanoe \
    && cd /root/tippecanoe \
    && make \
    && make install \
    && cd /root \
    && rm -rf /root/tippecanoe \
    && apt-get -y remove build-essential libsqlite3-dev zlib1g-dev

# Install poetry
RUN apt-get update \
    && apt-get -y install python3-poetry

#COPY ./data/pyproject.toml ./workspaces/map/data/
#RUN poetry config virtualenvs.create false && poetry install