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
                            {/* <img src="shubham.png" style={{width:'80%'}} alt="" /> */}
                            <img src="shubham.jpg" className="image" style={{width:'80%', borderRadius:'300px'}} alt="" />
                        </Col>
                        <Col style={{alignItems:'flex-start'}} className="center" md={8} sm={12}>
                            <h1 className="white">About Me</h1>
                            <p className="white">I am Shubham Jadhav, a recent graduate from MIT World Peace University (MIT WPU) in 2024. I aspire to be a full stack developer, with a solid foundation in both front-end and back-end technologies. I have hands-on experience with React and Angular for front-end development, and Django for back-end development. My passion for technology is matched by my love for reading books and traveling to new places. Throughout my academic and professional journey, I have successfully completed a variety of projects related to web development, IoT, and machine learning. These experiences have allowed me to apply theoretical knowledge to practical, real-world scenarios. </p>
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
                                    <h2>MIT World Peace University</h2>
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
                                    <h2>{company.Name}</h2>
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
                                    <h2>Formula Student Team</h2>
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
                                        <h2>{project.Name}</h2>
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