import Logo from "../Logo.jsx";
import './SelectPage.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";
const SelectPage = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate()

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if(file) {
            setSelectedFile(file);
            navigate('/uploading', {state: {file}});
        }
    }

    return(
        <div className='SelectPage Welcome'>
            <Logo classname='Small' />
            <p>Select a video to upload.</p>
            <input type="file" accept='video/' name='video-upload' id='video-upload' onChange={handleFileChange}/>
            <label className='btn' htmlFor='video-upload'>Select Video</label>
        </div>
    )
}

export default SelectPage;