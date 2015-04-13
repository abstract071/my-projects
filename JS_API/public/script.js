(window.onload = function() {

    var dropzone = document.getElementById('dropzone'),
        serverzone = document.getElementById('serverzone'),
        acceptedTypes = {
            'image/png': true,
            'image/jpeg': true,
            'image/gif': true
        };

    function previewfile(file, zone) {
        if (acceptedTypes[file.type]) {
            var blobURL = URL.createObjectURL(file);
            var img = new Image();
            img.src = blobURL;
            img.onload = function () {
                zone.appendChild(img);
                URL.revokeObjectURL(blobURL);
            };
            return true;
        }  else {
            alert('Uploaded file is not an image');
            //console.log(file);
            return false;
        }
    }

    function readfiles(files) {
        var formData = new FormData();
        dropzone.innerHTML = '';
        //console.log(files);
        for (var i = 0; i < files.length; i++) {
            formData.append('files[]', files[i]);
            var check = previewfile(files[i], dropzone);
        }

        //console.log(formData);
        if (check) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/upload', true);
            xhr.send(formData);

            xhr.addEventListener('load', function () {
                if (this.readyState == 4 && this.status == 200) {
                    var res = JSON.parse(this.response);
                    //console.log(res.files);

                    for (var i = 0; i < res.files.length; i++) {
                        var img = document.createElement('img');
                        img.src = res.files[i];
                        serverzone.appendChild(img);
                    }
                }
            }, false);
        }
    }

    dropzone.addEventListener('dragover', function (event) {
        this.className = 'over';
        event.dataTransfer.dropEffect = 'copy';
        event.preventDefault();
    }, false);
    dropzone.addEventListener('dragleave', function (event) {
        this.className = '';
        event.preventDefault();
    }, false);
    dropzone.addEventListener('drop', function (event) {
        this.className = '';
        event.preventDefault();
        readfiles(event.dataTransfer.files);
    }, false);

    window.addEventListener("dragover",function(e){
        e.preventDefault();
    }, false);
    window.addEventListener("drop",function(e){
        e.preventDefault();
    }, false);
});
