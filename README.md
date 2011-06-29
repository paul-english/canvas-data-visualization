## Canvas Data Visualization

A simple app that transforms a csv file into a visualization using the canvas API

## Setup server

    sudo apt-get update && sudo apt-get upgrade -y && sudo apt-get install git libssl-dev -y

## Install Node.js

    git clone https://github.com/joyent/node.git
    cd node
    ./configure
    make
    sudo make install
    cd ..

## Install NPM

    git clone https://github.com/isaacs/npm.git
    cd npm
    sudo make
    cd ..

# Install supporting libraries

    npm install express ejs formidable