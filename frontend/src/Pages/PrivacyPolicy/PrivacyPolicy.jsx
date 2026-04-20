import React from "react";
import "./privacyPolicy.css";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Minicompo/Navbar/Navbar";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Home Decorim</title>
        <meta
          name="description"
          content="Read the Privacy Policy of Home Decorim. Learn how we collect, use, and protect your personal data and cookies."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Navbar />

      <div className="privacy-wrapper">
        <div className="privacy-container">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: April 2026</p>

          <section>
            <h2>Introduction</h2>
            <p>
              Welcome to <strong>Home Decorim</strong>. Your privacy is important
              to us. This policy explains how we collect, use, and protect your
              information.
            </p>
          </section>

          <section>
            <h2>Information We Collect</h2>
            <ul>
              <li>Name and email (when you contact or subscribe)</li>
              <li>Device, browser, and IP address</li>
              <li>Cookies and usage data</li>
            </ul>
          </section>

          <section>
            <h2>How We Use Information</h2>
            <ul>
              <li>Improve website experience</li>
              <li>Respond to inquiries</li>
              <li>Send newsletters (optional)</li>
              <li>Analyze traffic trends</li>
            </ul>
          </section>

          <section>
            <h2>Cookies</h2>
            <p>
              We use cookies to enhance user experience. You can disable cookies
              in your browser settings.
            </p>
          </section>

          <section>
            <h2>Google AdSense</h2>
            <p>
              We use Google AdSense to display ads. Google may use cookies (DART
              cookies) to serve ads based on user interests and browsing
              behavior.
            </p>
          </section>

          <section>
            <h2>Third-Party Policies</h2>
            <p>
              Our Privacy Policy does not apply to third-party advertisers. We
              recommend reviewing their policies separately.
            </p>
          </section>

          <section>
            <h2>Your Rights</h2>
            <ul>
              <li>Access your data</li>
              <li>Request corrections</li>
              <li>Request deletion</li>
              <li>Object to data processing</li>
            </ul>
          </section>

          <section>
            <h2>Children’s Information</h2>
            <p>
              We do not knowingly collect data from children under 13. Contact us
              if you believe such data has been shared.
            </p>
          </section>

          <section>
            <h2>Consent</h2>
            <p>
              By using our website, you agree to this Privacy Policy.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              Have questions?{" "}
              <Link to="/contact-us">Contact us</Link>
              <br />
              <strong>Email:</strong> homedecorimlaiba@gmail.com
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;