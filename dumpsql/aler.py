import os
import subprocess
import mysql.connector


host = "localhost"
database = "test"
username = "root"
password = "1248488517hQ."
output_file = f"{database}_dump.sql"
mysqldump_path = r"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump.exe"

try:
    db = mysql.connector.connect(
        host=host,
        user=username,
        passwd=password,
        database=database
    )
    db.close()  # Close the connection as it's no longer needed
    print(f"Connected to the database on {host}")
except mysql.connector.Error as e:
    print("Failed to connect to the database:")
    print(e)
    exit()


output_file_path = os.path.join(os.getcwd(), output_file)


dump_command = [
    mysqldump_path,
    "-h", host,
    "-u", username,
    f"--password={password}",
    database
]

def dump_database(output_file_path, dump_command):
    print(f"Dumping database to '{output_file_path}'")
    try:
        with open(output_file_path, 'w') as file:
            subprocess.run(dump_command, stdout=file, check=True)
        print(f"Database dump created successfully and saved to {output_file_path}")
    except subprocess.CalledProcessError as e:
        print("An error occurred while creating the database dump:")
        print(e)


output_file_path = "path/to/output_file.sql"
dump_command = ["command", "to", "dump", "database"]
dump_database(output_file_path, dump_command)
