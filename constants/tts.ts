import edge from 'edge-tts';
import fs from 'fs';
import path from 'path';

export const generatePodcastAudioOffline = async (text: string, voice: string) => {
  try {
    // Define the output file path
    const outputPath = path.resolve('public', 'podcast-audio.mp3');
    
    // Initialize the TTS with the provided text and voice
    const ttsStream = edge.createStream({
      text,
      voice: voice || 'en-US-AriaNeural',  // Default voice if none is provided
      rate: '0%',  // Speech rate
      volume: '100%',  // Volume level
      pitch: '0%',  // Pitch of the voice
    });

    // Write the audio stream to a file
    const writeStream = fs.createWriteStream(outputPath);
    ttsStream.pipe(writeStream);

    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => {
        resolve(outputPath);  // Return the path to the generated audio file
      });

      writeStream.on('error', (err) => {
        reject('Error generating audio: ' + err);
      });
    });
  } catch (error) {
    throw new Error('Failed to generate audio: ');
  }
};
