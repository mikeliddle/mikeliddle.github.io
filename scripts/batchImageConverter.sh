#!/bin/bash

# Check if the input folder is provided
if [ -z "$1" ]; then
    echo "Please provide the path to the folder conaining HEIC files."
    exit 1
fi

# Check if the input folder exists
if [ ! -d "$1" ]; then
    echo "Input folder not found."
    exit 1
fi

# Enumerate all files in the input folder
for file in "$1"/*; do
    # Check if the file is a regular file
    if [ -f "$file" ]; then
        printf "Processing file: %s\n" "$file"
        # Run imageConverter.sh against the file
        ./imageConverter.sh "$file"
    fi
done