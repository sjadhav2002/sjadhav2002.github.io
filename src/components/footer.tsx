import React, {ChangeEvent, useState, FormEvent} from "react";
import "../Pages/home.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    const [mailSent, setmailSent] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        message: '',
        email: '',
    });

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async  (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission here
        var data = {
            "name": formData.name,
            "email": formData.email,
            "subject":formData.subject,
            "message":formData.message
        }
        var mail_url ="https://script.google.com/macros/s/AKfycbz0Uo4iJbQb_twyX9aiJpmQUuXZBZRILsQhvQze4y_MmEfPZyHbKevPyJVS_1sElk-E/exec"
        const response = await fetch(mail_url, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          setmailSent(true)
    };
    
    return (
        <div id = "Footer" style={{paddingBottom:'100px'}}>
            <div id="Contact_Me">
                <h1 style={{width:'100%', textAlign:'center'}} className="white pd-10">Contact Me</h1>
                <Row className="pd-10">
                    <Col md={6}>
                        <Row className="pd-10" style={{ flexDirection: 'column' }}>
                            <Row className="m-0"><h1 className="left white" style={{paddingLeft:'10px'}}>Shubham Jadhav</h1></Row>
                            <Row className="pd-10 m-0">
                                <Col sm={6}>
                                    <p className="left white">
                                        Email<br />
                                        <a href="mailto:sjadhav2002@gmail.com" style={{ textDecoration: 'underline' }}>sjadhav2002@gmail.com</a>
                                    </p>                                 
                                </Col>
                                <Col sm={6}>
                                    <h3 className="white" style={{ width: '100%', textAlign: "left", marginTop: '5%' }}>Connect with me on <a href="https://www.linkedin.com/in/jadhavrshubham/" target="_blank"> <LinkedInIcon className="white" style={{fontSize:'xxx-large'}} /> </a></h3>
                                </Col>
                                <a className="pd-10" style={{color:'white', textDecoration:'none'}} href="Shubham_Jadhav.pdf" target="_blank"><h3 style={{textAlign:'left'}}>Download my Resume</h3></a>
                            </Row>
                        </Row>

                    </Col>
                    <Col md={6}>
                        {!mailSent && (
                            <Form onSubmit={handleSubmit}>
                                <Row style={{padding:'10px 0px'}}>
                                    <Col className="pr-10" sm={6}>
                                        <Form.Group controlId="formName">
                                            <Form.Label style={{ color: 'white', width: '100%', textAlign: "left" }}>Name:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your name"
                                                name="name"
                                                value={formData.name}
                                                required={true}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col className="pl-10" sm={6}>
                                        <Form.Group controlId="formEmail">
                                            <Form.Label style={{ color: 'white', width: '100%', textAlign: "left" }}>Email:</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter your email"
                                                name="email"
                                                required={true}
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>



                                <Form.Group controlId="formSubject">
                                    <Form.Label style={{ color: 'white', width: '100%', textAlign: "left" }}>Subject:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter subject"
                                        name="subject"
                                        required={true}
                                        value={formData.subject}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formMessage">
                                    <Form.Label style={{ color: 'white', width: '100%', textAlign: "left" }}>Message:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter your message"
                                        name="message"
                                        required={true}
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Button style={{ marginTop: '10px' }} variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        )}
                        {mailSent && (
                            <h1 className="white">Thank You For Contacting me.</h1>
                        )}
                    </Col>
                </Row>
                <Row style={{margin:'20px 0px'}}><p style={{textAlign:'left', color:'white'}}>&copy; Shubham Jadhav, all rights reserved</p>
                </Row>
            </div>
        </div>
    )

}

export default Footer;