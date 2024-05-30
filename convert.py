import csv
import json

def csv_to_json(csv_file_path, json_file_path):
    # Open the CSV file
    with open(csv_file_path, 'r') as csv_file:
        # Read the CSV file
        csv_reader = csv.DictReader(csv_file)
        # Convert CSV to JSON
        json_data = json.dumps([row for row in csv_reader], indent=4)
    
    # Write JSON data to a file
    with open(json_file_path, 'w') as json_file:
        json_file.write(json_data)

# Example usage:
csv_to_json('service_and_parts.csv', 'service_and_parts.json')
