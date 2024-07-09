import s from './style.module.scss';

export default function Page() {
  return (
    <div className={s.container}>
      <div className={s.header}>
        <h1>Privacy Policy</h1>
      </div>
      <div className={s.content}>
        <p>
          Updated July 2, 2024. See previous versions of this and other policies in our <a href="#">Policy Archives</a>.
        </p>
        <p>
          The highlighted text is aimed to give a plain English summary of our Privacy Policy. Please ensure you read the main text, as the plain English
          summary is just a summary and doesn’t capture all of the terms.
        </p>
        <h2>What does this policy cover</h2>
        <p>
          Welcome to Linkbrary, the online and mobile service of the linkbrary_team1 at Codeit (“we,” or “us”). Our Privacy Policy explains how we collect, use,
          disclose, and protect information that applies to our Service, and your choices about the collection and use of your information.
        </p>
        <div className={s.summary}>
          <p>
            <strong>Summary:</strong> This policy sets out how linkbrary_team1 collects and uses the information that we collect about you when you use the
            Linkbrary services. This policy also explains the choices that you can make about the way that we use your information.
          </p>
        </div>
        <h2>1. Information we collect and its use</h2>
        <p>We collect the following types of information about you:</p>
        <ul>
          <li>
            <strong>Information you provide us directly:</strong> We may ask for certain information such as a username, your first and last name, birthdate,
            phone number, profession, and e-mail address when you register for a Linkbrary account, or if you correspond with us. We may also retain any
            messages you send through the Service, and may collect information you provide in User Content you post to the Service.
          </li>
          <li>
            <strong>Information we collect from third parties:</strong> We may receive information about you from third parties. For example, if you access our
            websites or Service through a third-party connection or log-in, for example, through Facebook Connect, by “following,” “liking,” adding the
            Linkbrary application, linking your account to the Linkbrary Service, etc., that third party may pass certain information about your use of its
            service to Linkbrary. This information could include, but is not limited to, the user ID associated with your account (for example, your Facebook
            UID), an access token necessary to access that service, any information that you have permitted the third party to share with us, and any
            information you have made public in connection with that service.
          </li>
        </ul>
        <h2>2. How we use your information</h2>
        <p>We use the information we collect in the following ways:</p>
        <ul>
          <li>
            <strong>To provide, improve, and personalize our services:</strong> We use the information we collect to deliver and improve our services. For
            example, we use your information to personalize your experience on our platform.
          </li>
          <li>
            <strong>To communicate with you:</strong> We may use your information to send you updates, promotional materials, and other information that may be
            of interest to you. You can opt out of receiving these communications at any time.
          </li>
        </ul>
        <h2>3. Sharing your information</h2>
        <p>We do not share your personal information with third parties except as described in this policy.</p>
        <ul>
          <li>
            <strong>With your consent:</strong> We may share or disclose your information at your direction.
          </li>
          <li>
            <strong>For legal reasons:</strong> We may share information in response to a request for information if we believe disclosure is in accordance
            with, or required by, any applicable law, regulation, or legal process.
          </li>
          <li>
            <strong>With service providers:</strong> We may employ third party companies and individuals to administer and provide the Service on our behalf
            (such as customer support, hosting, and analytics services). These third parties may have access to your personal information as a part of providing
            these services, but they are obligated not to disclose or use it for any other purpose.
          </li>
        </ul>
        <h2>4. Managing your information</h2>
        <p>You have the following rights to manage your information:</p>
        <ul>
          <li>
            <strong>Access and update your information:</strong> You can access and update your account information at any time by logging into your account.
          </li>
          <li>
            <strong>Delete your information:</strong> You can delete your account or remove certain information by logging into your account and following the
            instructions provided. We may retain certain information as required by law or for legitimate business purposes.
          </li>
        </ul>
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
            <a href="#">Developer Terms</a>
          </li>
          <li>
            <a href="#">Apps Terms</a>
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
}
