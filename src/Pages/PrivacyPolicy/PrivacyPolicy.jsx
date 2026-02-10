import React from "react";
import "./privacyPolicy.css";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Minicompo/Navbar/Navbar";

const PrivacyPolicy = () => {
  return (
    <>
    <Navbar/>
    <div className="privacy-container">
      <div className="privacy-card">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: February 2026</p>

        <section>
          <h2>Introduction</h2>
          <p>
            Welcome to <strong>Home Decorim Blog</strong>. Your privacy is important
            to us. This Privacy Policy document explains what information we
            collect, how we use it, and your rights regarding your data.
          </p>
        </section>

        <section>
          <h2>Information We Collect</h2>
          <ul>
            <li>Personal information such as name and email (if you subscribe or contact us)</li>
            <li>Non-personal data like browser type, IP address, device information</li>
            <li>Cookies and usage data to improve website performance</li>
          </ul>
        </section>

        <section>
          <h2>How We Use Your Information</h2>
          <ul>
            <li>To improve content and user experience</li>
            <li>To respond to inquiries and emails</li>
            <li>To send newsletters (only if subscribed)</li>
            <li>To analyze website traffic and trends</li>
          </ul>
        </section>

        <section>
          <h2>Cookies Policy</h2>
          <p>
            We use cookies to store visitor preferences and optimize pages based
            on visitors’ browser type or other information. You can disable
            cookies through your browser settings.
          </p>
        </section>

        <section>
          <h2>Google AdSense & Advertising Partners</h2>
          <p>
            We may use Google AdSense and other advertising partners. These third
            parties may use cookies, JavaScript, or Web Beacons to display ads
            relevant to users.
          </p>
          <p>
            Google uses the DART cookie, which allows it to serve ads based on
            users’ visits to this and other websites.
          </p>
        </section>

        <section>
          <h2>Third-Party Privacy Policies</h2>
          <p>
            Home Decor Blog’s Privacy Policy does not apply to other advertisers
            or websites. We advise you to consult the respective Privacy Policies
            of third-party ad servers or websites.
          </p>
        </section>

        <section>
          <h2>GDPR Data Protection Rights</h2>
          <ul>
            <li>The right to access your data</li>
            <li>The right to rectification</li>
            <li>The right to erasure</li>
            <li>The right to restrict processing</li>
            <li>The right to data portability</li>
            <li>The right to object to processing</li>
          </ul>
        </section>

        <section>
          <h2>Children’s Information</h2>
          <p>
            Home Decorim Blog does not knowingly collect personal information from
            children under the age of 13. If you believe your child has provided
            such information, please contact us immediately.
          </p>
        </section>

        <section>
          <h2>Consent</h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and
            agree to its terms.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, you can contact
            us at:
            <br />
            <strong>Email:</strong> support@homedecorimblog.com
          </p>
        </section>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default PrivacyPolicy;
