import Logo from "../Logo.jsx";
import { useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from "react";
import './Main.css'

const Main = () => {
    const location = useLocation();
    const videoFile = location.state?.videoFile; // Get the video file from state
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoFile) {
            const videoURL = URL.createObjectURL(videoFile);
            const videoElement = videoRef.current;

            // Set the video source
            videoElement.src = videoURL;

            // Cleanup the video URL when the component unmounts
            return () => {
                URL.revokeObjectURL(videoURL);
            };
        }
    }, [videoFile]);

    if (!videoFile) {
        return <h2>No video available</h2>;
    }

    return (
        <div className='Main'>
            <Logo />
            <div className="container">
                <div className="main-container">
                    <video ref={videoRef} controls width="400" />
                    <div className="main-summary">
                        <h3>Main Summary: </h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet animi aut autem delectus deserunt dolore et, exercitationem laboriosam minus mollitia obcaecati perferendis rem tenetur veniam voluptatibus. Aut delectus dolores excepturi laborum, natus neque, odit praesentium repellat reprehenderit unde voluptate, voluptates!</p>
                    </div>
                </div>
                <div className="sub-container">
                    <div className="frame">
                        <div className="number">Frame 1</div>
                        <video ref={videoRef} controls width="200" />
                        <div className="caption">The man is standing still with the umbrella.</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;