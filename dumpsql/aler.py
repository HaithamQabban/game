import os
import subprocess
import mysql.connector

host = input("Enter the host name: ")
database_name = input("Enter the database name: ")
username = input("Enter the username: ")
password = input("Enter your password: ")

try:
    db = mysql.connector.connect(
        host=host,
        user=username,
        password=password,
        database=database_name
    )
except mysql.connector.Error as e:
    print("Failed to connect to the database:")
    print(e)
    exit()

print(f"Connected to the database on {host}")

output_file = f"{database_name}_dump.sql"
mysqldump_path = r"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump.exe"

dump_command = f'"{mysqldump_path}" -h {host} -u {username} --password="{password}" {database_name} > {output_file}'

try:
    subprocess.check_call(dump_command, shell=True)
    print(f"Database dump created successfully and saved to {output_file}")
except subprocess.CalledProcessError as e:
    print("An error occurred while creating the database dump:")
    print(e)
