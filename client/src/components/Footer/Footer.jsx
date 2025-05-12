import React from "react";
import "./footer.css";

function Footer() {
  return (
    <div className="footer_container">
      <span className="footer_bg"/>
      <div className="footer_content">
        <div className="footer_grid">
          <div className="footer_logo">
            <img src="/logo_wordmark.svg" alt="" className="footer_icon" />
          </div>
          <div className="footer_info">
            <div className="link_grid">
              <ul>
                <li className="footer_link">About</li>
                <li className="footer_link">League History</li>
                <li className="footer_link">Links</li>
                <li className="footer_link">Contact</li>
              </ul>
              <ul>
                <li className="footer_link">About</li>
                <li className="footer_link">League History</li>
                <li className="footer_link">Links</li>
                <li className="footer_link">Contact</li>
              </ul>
              <ul>
                <li className="footer_link">About</li>
                <li className="footer_link">League History</li>
                <li className="footer_link">Links</li>
                <li className="footer_link">Contact</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer_copywrite">
          @2025 Capital Hockey Conference. All rights reserved.
          <a href="">Privacy Policy</a>
          <a href="">Terms of Use</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
