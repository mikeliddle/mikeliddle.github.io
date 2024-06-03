#!/bin/bash

# Check if the sips command-line tool is available
if ! command -v sips &> /dev/null; then
    echo "sips command not found. Please install the 'sips' command-line tool."
    exit 1
fi

# Check if the input file is provided
if [ -z "$1" ]; then
    echo "Please provide the path to the HEIC file."
    exit 1
fi

# Check if the input file exists
if [ ! -f "$1" ]; then
    echo "Input file not found."
    exit 1
fi

# Get the input file name and extension
input_file="$1"
file_name=$(basename "$input_file")
file_extension="${file_name##*.}"

# Check if the input file is a HEIC image
if [ "$file_extension" != "heic" ]; then
    echo "Input file is not a HEIC image."
    exit 1
fi

# Convert the HEIC image to JPG
output_file="${file_name%.*}.jpg"
sips -s format jpeg "$input_file" --out "$output_file"

echo "Conversion complete. Output file: $output_file"