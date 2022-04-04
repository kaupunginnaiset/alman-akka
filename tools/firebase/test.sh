#!/bin/bash

set -e

export FIRESTORE_EMULATOR_HOST="localhost:8080"
jest -c tools/firebase/jest.config.js --coverage
