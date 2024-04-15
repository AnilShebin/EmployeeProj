import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function ContactUs() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phonenumber: "",
        email: "",
        message: ""
    });

    
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        let timer: number | undefined;
        if (successMessage === "success") {
            timer = setTimeout(() => {
                setSuccessMessage("");
            }, 4000);
        }
        return () => clearTimeout(timer);
    }, [successMessage]);


    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        

        axios.get("https://thay-db.vercel.app/email/", { params: formData })
            .then(() => setSuccessMessage("success"))
            .catch
            (console.error);
    };

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    return (
       
        <div className="container mt-5" >
            <div className="row mb-3 mt-0">
                <div className="col-12 col-md-4 d-flex flex-column align-items-center mb-4 mb-md-0">
                    {/* Email */}
                    <FontAwesomeIcon icon={faEnvelope} size="3x" />
                    <a href="mailto:info@thaytech.com" className="mt-2" style={{ textDecoration: 'none', color: 'inherit',fontFamily:'Garamond, serif' }}>
                        info@thaytech.com
                    </a>
                </div>
                <div className="col-12 col-md-4 d-flex flex-column align-items-center mb-4 mb-md-0" >
                    {/* Phone Numbers */}
                    <FontAwesomeIcon icon={faPhone} size="3x" />
                    <p className="mt-2" style={{ textAlign: 'center' }}>
                        <a href="tel:+919840384140" style={{ textDecoration: 'none', color: 'inherit', fontFamily: 'Garamond, serif' }}>
                            +91 98403 84140
                        </a>
                        <span style={{ margin: '0 5px' }}>/</span>
                        <a href="tel:+916380454663" style={{ textDecoration: 'none', color: 'inherit',fontFamily: 'Garamond, serif' }}>
                            +91 63804 54663
                        </a>
                    </p>
                </div>
                <div className="col-12 col-md-4 d-flex flex-column align-items-center mb-4 mb-md-0">
                    {/* Location */}
                    <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" />
                    <a href="https://maps.app.goo.gl/DJWUKgH1ao7WAwtu6" target="_blank" rel="noopener noreferrer" className="mt-2" style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center', fontFamily: 'Garamond, serif'}}>
                        Plot No: 897, No: 9, 10th Cross,<br />
                        H Block, Anna Nagar West,<br />
                        Anna Nagar, Chennai, Tamil Nadu 600040
                    </a>
                </div>
            </div>
            <br />
            {/* Contact Us Form */}
            <div className="row">
                <div className="col-md-12 d-flex justify-content-center">
                    <div className=" p-4 rounded" style={{ maxWidth: '100%', width: '100%' }}>
                        <h3 className="mb-4"  style={{ fontFamily: 'Garamond, serif' }}>Contact Us:<hr/></h3>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <label htmlFor="firstName" style={{ fontFamily: 'Garamond, serif' }}>First Name:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            name="firstName"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="lastName"  style={{ fontFamily: 'Garamond, serif'}}>Last Name:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                            name="lastName"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="email"  style={{ fontFamily:'Garamond, serif' }}>Email:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="phonenumber"  style={{ fontFamily: 'Garamond, serif' }}>Phone number:</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="phonenumber"
                                            name="phonenumber"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="message"  style={{ fontFamily: 'Garamond, serif'}}>Message:</label>
                                        <textarea
                                            className="form-control"
                                            id="message"
                                            name="message"
                                            rows={6}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="row mb-2">
                                <div className="col-md-12 d-flex gap-2 justify-content-center align-items-center" style={{textTransform:"uppercase", fontWeight:"bold"}}>
                                    {successMessage === "success" && (
                                        <>
                                            <FontAwesomeIcon icon={faCircleCheck} fontSize={"3rem"} color='#8BC34A' />
                                            <p className="mt-2">Message sent successfully</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary ps-4 pe-4">Send</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        
        <style>
      {`
        body {
          background: linear-gradient(to right, lightblue, #ffffff);
        }
      `}
    </style>
        </div>
    );
};

export default ContactUs;