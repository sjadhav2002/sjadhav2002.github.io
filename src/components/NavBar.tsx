import React, { useEffect, useState } from "react";
import "../Pages/home.css"
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import MenuIcon from '@mui/icons-material/Menu';

interface NavBarProps {
    scroll: (to: string) => void;
  }

  const NavBar: React.FC<NavBarProps> = ({ scroll }) => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [openMenu, setOpenMenu] = useState(false)

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
      };
    useEffect(()=>{
        if(isMobile){
            setIsMobile(true);
        }
  },[])

    return (
        <div className="navBar" style={{zIndex:'9999'}}>
            {!isMobile &&(
                <div className="navBase">
                        <div onClick={()=> scroll("Home")} className="navItem">
                            <HomeIcon className="white"/>
                            <p className="m-0 white">Home</p>
                        </div>
                        <div onClick={()=> scroll("AboutMe")} className="navItem">
                            <PersonIcon className="white"/>
                            <p className="m-0 white" style={{width:'max-content'}}>About Me</p>
                        </div>
                        {/* <div onClick={()=> scroll("Education")} className="navItem">
                            <SchoolIcon className="white"/>
                            <p className="m-0 white">Education</p>
                        </div> */}
                        <div onClick={()=> scroll("Experience")} className="navItem">
                            <CorporateFareIcon className="white"/>
                            <p className="m-0 white">Experience</p>
                        </div>
                        <div onClick={()=> scroll("Projects")} className="navItem">
                            <LightbulbIcon className="white" />
                            <p className="m-0 white">Projects</p>
                        </div>
                        <div onClick={()=> scroll("Contact")} className="navItem">
                            <ContactMailIcon className="white" />
                            <p className="m-0 white" style={{width:'max-content'}}>Contact Me</p>
                        </div>
                </div>
            )}
            {isMobile &&(
                <div style={{width:'100%'}}>
                    <button onClick={toggleMenu} style={{border:'none', background:'black'}}> <MenuIcon className="white"/> </button>
                    {openMenu&&(
                        <div style={{width:'100vw', height:'fit-content', display:'flex', flexDirection:'column', alignItems:'center',backgroundColor:'black'}}>
                            <div onClick={()=>{toggleMenu();"Home"}} className="navItem-mob">
                                <HomeIcon className="white"/>
                                <p className="m-0 white">&nbsp;Home</p>
                            </div>
                            <div onClick={()=>{toggleMenu();"AboutMe"}} className="navItem-mob">
                                <PersonIcon className="white"/>
                                <p className="m-0 white" style={{width:'max-content'}}> &nbsp;About Me</p>
                            </div>
                            {/* <div onClick={()=>{toggleMenu();"Education"}} className="navItem-mob">
                                <SchoolIcon className="white"/>
                                <p className="m-0 white">&nbsp;Education</p>
                            </div> */}
                            <div onClick={()=>{toggleMenu();"Experience"}} className="navItem-mob">
                                <CorporateFareIcon className="white"/>
                                <p className="m-0 white">&nbsp;Experience</p>
                            </div>
                            <div onClick={()=>{toggleMenu();"Projects"}} className="navItem-mob">
                                <LightbulbIcon className="white" />
                                <p className="m-0 white">&nbsp;Projects</p>
                            </div>
                            <div onClick={()=>{toggleMenu();"Contact"}} className="navItem-mob">
                                <ContactMailIcon className="white" />
                                <p className="m-0 white" style={{width:'max-content'}}>&nbsp;Contact Me</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
            
        </div>
        
    );

}

export default NavBar;