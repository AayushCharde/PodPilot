from flask import Flask, request, jsonify, send_file
import pyttsx3
import os
from tempfile import NamedTemporaryFile

app = Flask(__name__)

# Initialize pyttsx3 TTS engine
tts_engine = pyttsx3.init()

@app.route('/api/tts', methods=['POST'])
def tts_api():
    data = request.json

    # Validate input
    if not data or 'text' not in data:
        return jsonify({'error': 'Invalid input. Provide "text" in the request body.'}), 400

    text = data['text']
    voice = data.get('voice', None)  # Optional: Set a specific voice if needed

    # Configure voice (if provided)
    if voice:
        voices = tts_engine.getProperty('voices')
        for v in voices:
            if voice.lower() in v.name.lower():
                tts_engine.setProperty('voice', v.id)
                break

    # Generate TTS output
    with NamedTemporaryFile(delete=False, suffix=".mp3") as tmp_audio:
        audio_path = tmp_audio.name
    tts_engine.save_to_file(text, audio_path)
    tts_engine.runAndWait()

    return send_file(audio_path, mimetype='audio/mpeg', as_attachment=True, download_name='output.mp3')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
