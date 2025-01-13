import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import profilePicture from '../../assets/svg/man-with-computer-and-headset-svgrepo-com.svg';
import downloadIcon from '../../assets/svg/download-minimalistic-svgrepo-com.svg';

const Introduction = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(50);

    const toRotate = ['Larry', 'Web Developer', 'Frontend Developer', 'Backend Developer', 'Fullstack Developer', 'Software Engineer', 'Tech Enthusiast', 'Learner'];
    const period = 1000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, typingSpeed);

        return () => { clearInterval(ticker) };
    }, [text, typingSpeed]);

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];

        // Fix substring logic - was reversed
        let updatedText = isDeleting 
            ? fullText.substring(0, text.length - 1)  // Remove last character when deleting
            : fullText.substring(0, text.length + 1); // Add next character when typing

        setText(updatedText);

        if(isDeleting) {
            setTypingSpeed(25);
        }

        if(!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setTypingSpeed(period);
        } else if(isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setTypingSpeed(150);
        }
    };

    const handleDownloadResume = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/download/resume');
            if(!response.ok) {
                throw new Error('Something went wrong!');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.download = 'resume.pdf';
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading resume: ", error);
        }
    }
    
    return (
        <div className='p-2 flex justify-between items-center max-w-7xl mx-auto
                        md: flex-col md:flex-row md:gap-4 md:items-center'>
            <div className='flex flex-col gap-4 w-1/2 min-h-[168px]
                            min-w-[350px] md:min-w-[400px]'>
               <div className='font-bold text-4xl bg-gradient-to-r from-blue-600 to-purple-600
                    dark:from-orange-600 dark:to-yellow-300 text-transparent bg-clip-text'>
                    Hello, I'm
                </div>

                <div className='font-bold text-4xl min-h-[40px] bg-gradient-to-r from-blue-600 to-purple-600
                    dark:from-orange-600 dark:to-yellow-300 text-transparent bg-clip-text'>
                    {text}
                </div>

                <div className='h-[45px] w-[150px] flex gap-[10px] text-xl 
                    bg-gradient-to-r from-blue-600 to-purple-600
                    dark:from-orange-600 dark:to-yellow-300
                    rounded-xl pl-[5px] justify-center items-center cursor-pointer' 

                    onClick={handleDownloadResume}>
                    <div
                        className='text-white'>
                        Resume
                    </div>
                    <img 
                        src={downloadIcon} 
                        alt="download icon" 
                        className='w-[25px] h-[25px] cursor-pointer
                            [filter:invert(100%)_sepia(0%)_saturate(0%)_hue-rotate(0deg)_brightness(1000%)_contrast(100%)]
                            transition-all duration-300'
                    />
                </div>
            </div>


            <div className='flex md:justify-end w-1/2'>
                <img 
                    src={profilePicture} 
                    alt="profile picture" 
                    className='w-40 h-40'
                />
            </div>
        </div>
    );
};

export default Introduction;