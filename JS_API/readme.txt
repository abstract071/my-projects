Task: Upload files to server with drag and drop.

1) Create 2 blocks: Dropzone and Uploaded files

2) Give feedback to user when drag enters and leaves Dropzone block

3) After files (images only) from desktop are dropped on Dropzone block (all in "drop" event handler)

3.0) Clear Dropzone (remove all previous previews from 3.1)
3.1) Create small previews for each image dragged from desktop and insert them into Dropzone block (use URL)
3.2) Send all files via POST request to '/upload' (use FormData)

Server will return JSON string in format {files: ["uploads/212f6f5877226f7bab49e084ecce1172.jpeg","uploads/b97b00ef8ccb17c76e0a0e10cdabbee8.jpeg"]}

4) Use links from server response to append images to Uploaded files block




Server setup:
1) Download and install Node.js from http://nodejs.org/

2) Open folder with package.json in console

3) Run npm install

4) Run node server.js

5) Open http://localhost:3000/ in browser