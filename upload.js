document.getElementById('uploadForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    let formData = new FormData();
    let fileInput = document.getElementById('imageFile');
    
    if (fileInput.files.length === 0) {
        alert('Please select a file to upload.');
        return;
    }
    
    formData.append('file', fileInput.files[0]);

    try {
        let response = await fetch('http://localhost:8000/upload_image', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            let result = await response.json();
            document.getElementById('response').innerHTML = `
                <div class="alert alert-success">
                    File uploaded successfully!<br>
                    Filename: ${result.filename}<br>
                    Filepath: ${result.filepath}
                </div>
            `;
        } else {
            let error = await response.json();
            document.getElementById('response').innerHTML = `
                <div class="alert alert-danger">
                    Error: ${error.detail}
                </div>
            `;
        }
    } catch (error) {
        document.getElementById('response').innerHTML = `
            <div class="alert alert-danger">
                Error: ${error.message}
            </div>
        `;
    }
});
