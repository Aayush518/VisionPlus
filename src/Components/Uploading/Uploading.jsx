import Logo from "../Logo.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import './Uploading.css'

const Uploading = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const [uploadProgress, setUploadProgress] = useState(0);
    const [poster, setPoster] = useState(null); // Move poster state here
    const file = location.state?.file;
    const videoRef = useRef(null);

    useEffect(() => {
        if (file) {
            const videoURL = URL.createObjectURL(file);
            const videoElement = videoRef.current;

            // Set the video source
            videoElement.src = videoURL;

            // Capture the first frame as a poster
            videoElement.addEventListener('loadeddata', () => {
                // Ensure the video is ready to play
                if (videoElement.readyState >= 2) {
                    // Set the current time to 0 to capture the first frame
                    videoElement.currentTime = 0;
                }
            });

            // Create a canvas to draw the poster
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            videoElement.addEventListener('seeked', () => {
                // Set canvas size
                canvas.width = 600;  // Set desired width
                canvas.height = 400;  // Set desired height
                // Draw the current frame of the video
                context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                // Set the poster state to the canvas image
                setPoster(canvas.toDataURL('image/jpeg'));
            });

            // Cleanup the video URL when the component unmounts
            return () => {
                URL.revokeObjectURL(videoURL);
            };
        }
    }, [file]);

    useEffect(() => {
        if (file) {
            const interval = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        navigate('/main', { state: { videoFile: file } });
                        return 100; // Stop at 100%
                    }
                    // Generate a random increment between 1 and 12
                    const randomIncrement = Math.floor(Math.random() * 12) + 1;
                    return Math.min(prev + randomIncrement, 100); // Ensure we do not exceed 100
                });
            }, 500); // Simulate every half second

            // Cleanup the interval when component unmounts
            return () => clearInterval(interval);
        }
    }, [file]);

    if (!file) {
        return <h2>No file selected</h2>;
    }

    return (
        <div className='Uploading Welcome'>
            <Logo />
            <div className="uploading">
                <video
                    ref={videoRef}
                    width="600"
                    poster={poster}  // Use the generated poster image
                >
                    <source src={URL.createObjectURL(file)} type={file.type}/>
                </video>
                <div className="overlay" style={{width: (600 - (uploadProgress * 0.01 * 600))}}></div>
            </div>
            <div className='progress-container'>
            <div className='progress-bar'>
                    <div className="progress" style={{width: (uploadProgress * 0.01 * 600)}}></div>
                </div>
                <p>{uploadProgress}% completed</p>
            </div>
        </div>
    );
}

export default Uploading;
