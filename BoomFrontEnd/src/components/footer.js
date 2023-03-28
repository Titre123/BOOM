import React from "react";
import '../styles/components/footer.css';


export default function Footer(props) {
    //  component that help to create the footer for the application
    return(
        <footer className="footer">
            <section className="footer-flex container">
                <div>
                    <p>Digitaldastin by Taiwo Triumphant</p>
                    <div></div>
                </div>
                <div className="link-flex">
                    <div>
                    <p className="fh-text">Genre</p>
                    <p><a href='#'>Pop</a></p>
                    <p><a href='#'>Rock</a></p>
                    <p><a href='#'>Hip-hop</a></p>
                    <p><a href='#'>Country</a></p>
                    <p><a href='#'>R&B</a></p>
                    <p><a href='#'>Soul</a></p>
                    <p><a href='#'>Reggae</a></p>
                </div>
                <div>
                    <p className="fh-text">Features</p>
                    <p><a href='#'>Stream</a></p>
                    <p><a href='#'>Recommendation</a></p>
                </div>
                <div>
                    <p className="fh-text">About Me</p>
                    <p><a href='#'>About Us</a></p>
                    <p><a href='#'>Credits</a></p>
                </div>
                <div>
                    <p className="fh-text">Get in touch</p>
                    <p><a href='#'>+62-8XXX-XXX-XX</a></p>
                    <p><a href='#'>demo@gmail.com</a></p>
                </div>
                <div>
                    <p className="fh-text">Follow Us</p>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '1em'}}>
                    </div>
                </div>
                </div>
            </section>
            <section className="footer-flex container copydetails">
                <p>© 2022 Digitaldastin</p>
                <p>Made With ❤️ From Taiwo Triumphant</p>
            </section>
        </footer>
    )
}