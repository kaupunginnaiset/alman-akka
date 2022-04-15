#!/bin/bash

set -e

export FIRESTORE_EMULATOR_HOST="localhost:8080"
jest -c firestore/jest.config.js --coverage
