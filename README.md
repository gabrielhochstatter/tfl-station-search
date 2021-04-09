# TFL Station Finder

This is a small example project that uses the TFL API to search for and fetch basic data about stations in their network.

### Basic Features:
- Search for a staion/bus stop by name
- View a list of lines that serve each station
- Some overground stations also have a link to fetch predicted arrivals at that station (note: this only seems to work on stations that are _overground  only_, a good one to test this on is Shoreditch High Street)

More info on the TFL Unified API can be found in the docs here: https://api.tfl.gov.uk/

## Running Locally:
The usual steps for something created with `create-react-app`:
- Clone the repo
- From the repo's directory run `npm install` then `npm start`