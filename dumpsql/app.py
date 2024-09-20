from flask import Flask
import subprocess
import os

app = Flask(__name__)

@app.route('/')
def index():
    return "Welcome to the Database Dump Web App! Go to /dump to create a database dump."

@app.route('/dump')
def dump():
    host = "localhost"
    database = "test"
    username = "root"
    password = "1248488517hQ."  
    output_file = f"{database}_dump.sql"
    mysqldump_path = r"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump.exe"

    output_file_path = os.path.join(os.getcwd(), output_file)
    dump_command = [
        mysqldump_path,
        "-h", host,
        "-u", username,
        f"--password={password}",
        database
    ]

    try:
        with open(output_file_path, 'w') as file:
            subprocess.run(dump_command, stdout=file, check=True)
        return f'<span style="color: green;">Database dump created successfully and saved to {output_file_path}</span>'
    except subprocess.CalledProcessError as e:
        return f'<span style="color: red;">An error occurred while creating the database dump:\n{e}</span>'


if __name__ == '__main__':
    app.run(debug=True) 

