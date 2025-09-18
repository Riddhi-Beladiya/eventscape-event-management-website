import React from "react";
import "./Footer.css";
import { FaGithub, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";


const Footer = () => {
 const router = useRouter();
 const pathname = usePathname(); 
  return (
    <div className="pg-footer overflow-auto bottom-0">
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-content-column">
            <div className="footer-logo">
              <Link className="footer-logo-link" href="#">
                <Image src="/Images/Logo1.png" alt="Logo" width={150} height={100} className="w-full"/>
              </Link>
            </div>

            <div className="footer-menu">
              <h2 className="footer-menu-name"> Legal</h2>
              <ul id="menu-legal" className="footer-menu-list">
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-170434">
                  <Link href="/privacy">Privacy Notice</Link>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <Link href="/terms">Terms of Use</Link>
                </li>
              </ul>
            </div>

          </div>
          <div className="footer-content-column">
            <div className="footer-menu">
              <h2 className="footer-menu-name"> Company</h2>
              <ul id="menu-company" className="footer-menu-list">
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <Link href="/contact">Contact</Link>
                </li>
                <li className="menu-item menu-item-type-taxonomy menu-item-object-category">
                  <Link href="/news">News</Link>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <Link href="/careers">Careers</Link>
                </li>
              </ul>
            </div>
           
          </div>
          <div className="footer-content-column">
            <div className="footer-menu">
              <h2 className="footer-menu-name"> Quick Links</h2>
              <ul id="menu-quick-links" className="footer-menu-list">
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <Link  href="/support">
                    Support Center
                  </Link>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <Link href="/servicecenter">
                    Service Status
                  </Link>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <Link href="/security">Security</Link>
                </li>
                
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <Link href="/faqs">FAQs</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-content-column">
            <div className="footer-call-to-action">
              <h2 className="footer-call-to-action-title"> Let's Chat</h2>
              <p className="footer-call-to-action-description">
                {" "}
                Want to learn more about our services?{" "}
              </p>
              
              <button className="footer-call-to-action-button button" onClick={() => router.push("/contact")}> Get in Touch </button>
            </div>
            <div className="footer-call-to-action">
              <h2 className="footer-call-to-action-title"> You Call Us</h2>
              <p className="footer-call-to-action-link-wrapper">
                {" "}
                <Link
                  className="footer-call-to-action-link"
                  href="tel:0124-64XXXX"
                  target="_self"
                >
                  {" "}
                  0124-64XXXX{" "}
                </Link>
              </p>
            </div>
          </div>
          <div className="footer-social-links">
            <a className="footer-social-link linkedin" 
            href="https://www.linkedin.com/home" 
            target="_blank">
           
                <FaLinkedinIn />
            </a>
            <a className="footer-social-link twitter" 
            href="https://x.com/i/flow/login" 
            target="_blank">
                <FaTwitter />
            </a>
            <a className="footer-social-link youtube" 
            href="https://www.youtube.com/" 
            target="_blank">
                <FaYoutube />
            </a>
            <a className="footer-social-link github" 
            href="https://github.com/Riddhi-Beladiya" 
            target="_blank">
                <FaGithub />
            </a>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="footer-copyright-wrapper">
            <p className="footer-copyright-text">
              <a className="footer-copyright-link" href="#" target="_self">
                {" "}
                ©2025. | Designed By: Riddhi Beladiya. | All rights reserved.{" "}
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;