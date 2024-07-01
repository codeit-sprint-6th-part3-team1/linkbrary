import React from 'react';
import s from '../styles/privacypolicy.module.scss';

const PrivacyPolicy = () => {
  return (
    <div className={s.container}>
      <div className={s.header}>
        <h1>Privacy Policy</h1>
      </div>
      <div className={s.content}>
        <p>
          Updated December 16 2020. See previous versions of this and other policies in our <a href="#">Policy Archives</a>.
        </p>
        <p>
          The highlighted text is aimed to give a plain English summary of our Privacy Policy. Please ensure you read the main text, as the plain English
          summary is just a summary and doesn’t capture all of the terms.
        </p>
        <h2>What does this policy cover</h2>
        <p>
          Welcome to Canva, the online and mobile service of Canva Pty Ltd (“Canva,” “we,” or “us”). Our Privacy Policy explains how we collect, use, disclose,
          and protect information that applies to our Service, and your choices about the collection and use of your information.
        </p>
        <div className={s.summary}>
          <p>
            <strong>Summary:</strong> This policy sets out how Canva collects and uses the information that we collect about you when you use the Canva
            services. This policy also explains the choices that you can make about the way that we use your information.
          </p>
        </div>
        <h2>1. Information we collect and its use</h2>
        <p>Information about the types of data we collect, how it is used, and how you can manage your data.</p>
        {/* Add more content as needed */}
      </div>
      <div className={s.sidebar}>
        <h3>Other policies</h3>
        <ul>
          <li>
            <a href="#">Policy Archives</a>
          </li>
          <li>
            <a href="#">License Agreements</a>
          </li>
          <li>
            <a href="#">Contributor Agreement</a>
          </li>
          <li>
            <a href="#">Acceptable Use Policy</a>
          </li>
          <li>
            <a href="#">Canva Developer Terms</a>
          </li>
          <li>
            <a href="#">Canva Apps Terms</a>
          </li>
          <li>
            <a href="#">Cookies Policy</a>
          </li>
          <li>
            <a href="#">Terms of Use</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
