<!DOCTYPE html>
<html>
<head>
    <style>
        /* Define the knife cursor using a URL to the image */
        body {
            cursor: url('knife.png'), auto;
        }

        /* Define the rectangle */
        .rectangle {
            width: 200px;
            height: 100px;
            background: red;
        }

        /* Change the color of the rectangle when the knife cursor is over it */
        .rectangle:hover {
            background: green;
        }
    </style>
</head>
<body>
    <div class="rectangle"></div>
</body>
</html>
