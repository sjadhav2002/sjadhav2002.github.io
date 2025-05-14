import React, {useEffect, useState} from "react";
import "./home.css"
import NavBar from './../components/NavBar';
import { Col, Row } from "react-bootstrap";
import Footer from './../components/footer';
import Preloader from '../components/preloader';
import Parallax from './../components/intro';

  interface Experience {
    Name: string;
    Position: string;
    Period: string;
    Description: string;
    Skills: string[];
  }

  
  interface Project{
    Name: string;
    Description: string;
    Skills: string[];
  }

const Home: React.FC = () =>{
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loaded, setLoaded] = useState<Boolean>(false);

    const sentences =[
        "Full Stack Developer",
    ]
    useEffect(()=>{
        if(isMobile){
            setIsMobile(true);
        }
    },[])

    const url = "https://script.google.com/macros/s/AKfycbzk6FLPpsYWjLYOGjctj3qnn758tVQvXQ6TK2mEJ7qp_kJU0E_dh7925vgtm5CHA3iX/exec"
    function scroll(elementId: string) {
        var ele = document.getElementById(elementId);
        ele?.scrollIntoView({
          behavior: 'smooth'
        });;
      }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const responseData = await response.json();
                console.log(responseData);

                try {
                    var projects = JSON.parse(responseData.projects);
                    projects = projects.filter(function (item: any) {
                        return item.some(function (value: any) {
                            return value !== '';
                        });
                    });
                    const processedData = projects.map((project: any) => ({
                        Name: project[0],
                        Description: project[1],
                        Skills: JSON.parse(project[2]) as string[]
                      }));
                    setProjects(processedData);

                } catch (error) {
                    console.log(error)
                    projects = []
                }

                try {
                    var experience = JSON.parse(responseData.experience);
                    var experience = experience.filter(function (item :any) {
                        return item.some(function (value :any) {
                            return value !== '';
                        });
                    });
                    const finalexperience: Experience[] = experience.map((item: any) => ({
                        Name: item[0],
                        Position: item[1],
                        Period: item[2],
                        Description: item[3],
                        Skills: JSON.parse(item[4]) as string[]
                      }));
                    setExperiences(finalexperience);
                } catch (error) {
                    experience = []
                }
                setLoaded(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    while (!loaded) {
        return (
            <Preloader />
        )
    }

    return (
        <div style={{width:'100%', height:'100%'}}>
                <Parallax sentences={sentences} />
                <div>
                    <div style={isMobile?{ width:'100%', display:'flex',justifyContent: 'flex-start'}:{width:'100%', display:'flex',justifyContent: 'center'}}>
                        <NavBar scroll={scroll} />
                    </div>
                </div>
                <div id="AboutMe" style={{ backgroundColor: 'rgb(40,40,40)', height:'100vh', position:'relative' }}>
                    <Row className="w90" style={{margin:'20px 10px', height:'100%'}}>
                        <Col className="center" md={4} sm={12}>
                            <img src="shubham.jpg" className="image" style={{width:'80%', borderRadius:'300px'}} alt="" />
                        </Col>
                        <Col style={{alignItems:'flex-start'}} className="center" md={8} sm={12}>
                            <h1 className="white title" style={{textAlign:'center'}}>About Me</h1>
                            <p className="white">I am Shubham Jadhav, a Computer Science graduate from MIT World Peace University with a strong ambition to become a skilled Full Stack Developer. I bring hands-on experience in both front-end and back-end development, having worked extensively with technologies such as React, Angular, Django, and Flask. During my professional journey, I have contributed to projects across diverse domains, including cybersecurity at Deloitte, full stack and UI/UX development at Markytics, Ridvig Technologies, BlackCoffer, and DigiLocker. My technical skills are complemented by practical experience in deploying applications on cloud-based Linux environments and conducting load testing, Optimizing API's. Outside of work, I have a deep passion for reading, traveling, and exploring new cultures. I am always eager to learn, solve real-world problems through technology, and stay at the forefront of innovation. </p>
                        </Col>
                    </Row>
                </div>
                <div id="Education" >
                    <Row className="w90" style={{margin:'20px 10px', height:'100%'}}>
                        <Col className="flex-center" md={4} sm={12}>
                            <h1 className="black title" style={{textAlign:'center'}}>Education</h1>
                        </Col>
                        <Col style={{alignItems:'flex-start'}} md={8} sm={12}>
                            <Row style={{margin:'20px 0px'}}>
                                <Col style={{display:'flex', alignItems:'center', justifyItems:'center', flexDirection:'column'}} md={2} sm={12}>
                                    <img src="MIT.png"  style={{width:'100%'}} alt="" />
                                </Col>
                                <Col style={isMobile?{display:'flex', alignItems:'center', justifyItems:'center',flexDirection:'column'}:{}} md={10} sm={12}>
                                    <h3>MIT World Peace University</h3>
                                    <p>
                                        <span style={{fontStyle:'italic'}}>Bachelor of Technology in Computer Engineering | 2020-2024</span><br />
                                        CGPA: 9.13
                                    </p>
                                </Col>
                                
                            </Row>
                        </Col>
                    </Row>
                    
                </div>
                <div id="Experience" style={{ backgroundColor: 'white' }}>
                    <Row className="w90" style={{margin:'20px 10px', height:'100%'}}>
                        <Col className="flex-center" md={4} sm={12}>
                            <h1 className="black title" style={{textAlign:'center'}}>Experience</h1>
                        </Col>
                        <Col style={{alignItems:'flex-start'}} md={8} sm={12}>
                            {experiences.map((company,index)=>(
                                <Row key={index} style={{margin:'20px 0px'}}>
                                <Col>
                                    <h3>{company.Name}</h3>
                                    <p>
                                        <span style={{fontStyle:'italic'}}>{company.Position} | {company.Period} </span>
                                          
                                    </p>
                                    <h6>Contribution: </h6>
                                    <p style={{textAlign:'justify'}}>{company.Description}</p>
                                    <h6>Skills: </h6>
                                    <ul className="horizontal-list">
                                        {company.Skills.map((skill,index2)=>(
                                            <li key={index2}>{skill}</li>
                                        ))}
                                    </ul>
                                </Col>
                            </Row>
                            ))}
                        </Col>
                    </Row>
                </div>
                <div id="leader" >
                    <Row className="w90" style={{margin:'20px 10px', height:'100%'}}>
                        <Col className="flex-center" md={4} sm={12}>
                            <h1 className="black title" style={{textAlign:'center'}}>Leadership Positions</h1>
                        </Col>
                        <Col style={{alignItems:'flex-start'}} md={8} sm={12}>
                            <Row style={{margin:'20px 0px'}}>
                                <Col>
                                    <h3>Formula Student Team</h3>
                                    <p>
                                        <span style={{fontStyle:'italic'}}>Acceleracers Electric 2020-2024</span>
                                    </p>
                                    <h6>Position:</h6>
                                    <ul>
                                        <li style={{fontStyle:'italic'}}>Data Acquisition Deaprtment Head</li>
                                    </ul>
                                    <h6>Contribution: </h6>
                                    <ul>
                                        <li>Implemented various IoT sensors(Accelerometer, Load Cells, Rotary Encoder, etc.) on electric vehicle</li>
                                        <li>Implemented Real-Time data telemetry</li>
                                        <li>Designed and developed a Battery Temprature Monitoring module for Electric Car </li>
                                    </ul>
                                    <h6>Skills: </h6>
                                    <ul className="horizontal-list">
                                        <li>IoT</li>
                                        <li>Python</li>
                                        <li>Embedded C</li>
                                        <li>Solidworks</li>
                                        <li>Ansys</li>
                                    </ul>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    
                </div>
                <div id="Projects" >
                <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
                    <Row className="w90" style={{margin:'20px 10px', height:'100%'}}>
                        <Col className="flex-center" md={4} sm={12}>
                            <h1 className="black title" style={{textAlign:'center'}}>Projects</h1>
                        </Col>
                        <Col style={{alignItems:'flex-start'}} md={8} sm={12}>
                            {projects.map((project,index)=>(
                                    <Row key={index} style={{margin:'20px 0px'}}>
                                    <Col>
                                        <h3>{project.Name}</h3>
                                        <p>{project.Description}</p>
                                        <h6>Skills:</h6>
                                        <ul className="horizontal-list">
                                            {project.Skills.map((skill, index2)=>(
                                                <li key={index2}>{skill}</li>
                                            ))}
                                        </ul>
                                    </Col>
                                </Row>
                            ))}
                        </Col>
                    </Row>
                    </div>
                    
                </div>
                <div id="Contact" style={{backgroundColor:'black'}}>
                    <Footer />
                </div>
        </div>
    );

}

export default Home;