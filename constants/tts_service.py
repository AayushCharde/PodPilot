from fastapi import FastAPI, Form
from fastapi.responses import FileResponse
import pyttsx3

app = FastAPI()

@app.post("/generate-audio/")
async def generate_audio(text: str = Form(...)):
    # Initialize TTS engine
    engine = pyttsx3.init()
    engine.setProperty('rate', 150)
    engine.setProperty('volume', 1.0)

    # Save audio to a file
    output_file = "output.mp3"
    engine.save_to_file(text, output_file)
    engine.runAndWait()

    return FileResponse(output_file, media_type="audio/mpeg", filename="output.mp3")
