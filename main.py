from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import shutil

app = FastAPI()

@app.post("/upload_image")
async def upload_image(file: UploadFile = File(...)):
    try:
        # Define the file path
        file_path = f"uploaded_images/{file.filename}"
        
        # Save the file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        return JSONResponse(content={"filename": file.filename, "filepath": file_path}, status_code=200)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
