import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import profilePicture from '../../assets/svg/man-with-computer-and-headset-svgrepo-com.svg';

const Introduction = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(50);

    const toRotate = ['Larry', 'Web developer', 'React developer', 'Frontend developer', 'Backend developer', 'Fullstack developer', 'Software Engineer', 'Tech Enthusiast', 'Learner'];
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
    
    return (
        <div className='p-2 flex justify-between items-center max-w-7xl mx-auto'>
            <div className='flex flex-col gap-4 w-1/2'> {/* Added w-1/2 for fixed width */}
                <div className='font-bold text-4xl '>
                    <div className='bg-gradient-to-r from-blue-600 to-purple-600 h-1/2
                        dark:from-orange-600 dark:to-yellow-300 text-transparent bg-clip-text'>
                        Hello, I'm a
                    </div>

                    <div className='bg-gradient-to-r from-blue-600 to-purple-600  h-1/2
                        dark:from-orange-600 dark:to-yellow-300 text-transparent bg-clip-text'>
                        {text}
                    </div>
                </div>
            </div>


            <div className='flex justify-end w-1/2'>
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