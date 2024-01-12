#!/bin/bash

export NODE_ENV=test

mkdir -p logs
date=$(date '+%Y-%m-%d-%H-%M-%S')

lab_options="test/"

lab_options="$lab_options $@"

echo "Running lab $lab_options"
 
tap $lab_options -o logs/test_$date.log || exit 1