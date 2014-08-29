#!/bin/bash

# route port 80 -> 8080
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080

# Install Node Modules
# # # # # # # # # # # # # # # # # #
npm install -g grunt sails bower


# Project Setup
# # # # # # # # # # # # # # # # # #
cd /vagrant
npm install
