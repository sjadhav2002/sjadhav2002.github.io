import React, { useState, useEffect } from 'react';
import '../Pages/home.css';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import Typewriter from './type-writer';

interface ParallaxDiv {
  sentences: string[];
}

const Parallax: React.FC<ParallaxDiv> = ({ sentences }) => {
  const [background, setBackground] = useState(0);

  function scroll(elementId: string) {
    var ele = document.getElementById(elementId);
    ele?.scrollIntoView({
      behavior: 'smooth'
    });;
  }

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setBackground(window.scrollY*-0.2);
        } else {
            setBackground(0);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

  return (
    <div id='Home' className="Intro" style={{position:'relative'}}>
                    <img className='intro_image' style={{transform: `translateY(${background}px)`, zIndex:'0'}} src="bg.jpg" alt="" />
                    <div style={{position:'relative',zIndex:'1', width: '100%', height: '75vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h1 className="xxl-text"> <span className='xl-text'>Hi, this is</span> <br />Shubham Jadhav</h1>
                        <Typewriter sentences={sentences} />
                    </div>
                    <div style={{position:'relative',zIndex:'1'}}>
                        <h2 style={{textAlign:'center'}}>
                            <button onClick={()=>{scroll("AboutMe")}} style={{ background: 'transparent', border: 'none', color:'white' }}><ArrowCircleDownIcon style={{fontSize:'50px'}} /> Know More About Me.</button>
                        </h2>
                    </div>
                </div> 
  );
};

export default Parallax;
