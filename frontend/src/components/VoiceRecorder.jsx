import React, { useState, useRef } from "react";

const VoiceRecorder = ({ onRecordingComplete }) => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);

        if (onRecordingComplete) {
          onRecordingComplete(audioBlob); // You can send blob here
        }
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error("Error accessing mic:", err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <div className="space-y-2 p-3 border rounded-lg w-fit bg-white shadow">
      <button
        onClick={recording ? stopRecording : startRecording}
        className={`px-4 py-2 rounded text-white ${
          recording ? "bg-red-600" : "bg-green-600"
        }`}
      >
        {recording ? "Stop Recording" : "Start Recording"}
      </button>

      {audioURL && (
        <div>
          <p className="mt-2 text-sm text-gray-600">Preview:</p>
          <audio controls src={audioURL} className="w-full" />
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
