import { useState } from 'react';
import './another.css';
import './styles.css';
const DentalClinicApp = () => {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isHeartActive, setIsHeartActive] = useState(false);

  const scrollToSection = (sectionId: any) => {
    const target = document.getElementById(sectionId);
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="dental-clinic-app"
      style={{ overflowY: 'scroll', height: '100%', scrollBehavior: 'smooth' }}
    >
      {/* Header and Navigation */}
      <header>
        <nav className="section__container nav__container">
          <div className="nav__logo">
            <img src="./assets/logo (2).png" alt="logo" /> SMILE
            <span>SYNC</span>
          </div>
          <ul className="nav__links">
            <li className="link">
              <a href="#home" onClick={() => scrollToSection('home')}>
                Home
              </a>
            </li>
            <li className="link">
              <a href="#service" onClick={() => scrollToSection('service')}>
                Services
              </a>
            </li>
            <li className="link">
              <a href="#about" onClick={() => scrollToSection('about')}>
                About Us
              </a>
            </li>
            <li className="link">
              <a href="#dentist" onClick={() => scrollToSection('dentist')}>
                Dentist
              </a>
            </li>
            <li className="link">
              <a href="#surgical" onClick={() => scrollToSection('surgical')}>
                Surgical Equipment
              </a>
            </li>
          </ul>
          <a href="/login" className="btn">
            Log In
          </a>
        </nav>

        {/* Login Popup */}
        {isLoginPopupOpen && (
          <div id="loginPopup" className="header__form">
            <form>
              <h4>Book Now</h4>
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Last Name" />
              <input type="text" placeholder="Address" />
              <input type="text" placeholder="Phone No." />
              <button className="btn form__btn">Book Appointment</button>
              <button
                type="button"
                className="btn close__btn"
                onClick={() => setIsLoginPopupOpen(false)}
              >
                Close
              </button>
            </form>
          </div>
        )}

        {/* Home Section */}
        <div className="section__container header__container" id="home">
          <div className="header__content">
            <h1>
              We Are Ready To <br />
              Help & Take Care <br />
              Of Your Dental Health
            </h1>
            <p>
              Your smile is important to us. Let us provide you with the best
              dental care available! We are dedicated to giving you personalized
              care and making sure your visit is as comfortable as possible. Our
              professional staff will ensure your experience exceeds
              expectations.
            </p>
            <button
              onClick={() => scrollToSection('service')}
              className="btn"
              id="serviceBtn"
            >
              See Services
            </button>
          </div>
          <div className="header__image">
            <img src="./assets/dentist.png" alt="Dental Care" />
          </div>
        </div>
      </header>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div id="loginModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsLoginModalOpen(false)}>
              &times;
            </span>
            <p>You need to log in to your account to ask for a service.</p>
          </div>
        </div>
      )}

      {/* Services Section */}
      <section className="section__container service__container" id="service">
        <div className="service__header">
          <div className="service__header__content">
            <h2 className="section__header">Our Services</h2>
            <p>
              At Ramos Vallao-Dental Clinic, we offer a wide range of services
              to keep your smile healthy and beautiful.
            </p>
          </div>
          <button
            className="service__btn"
            onClick={() => setIsLoginModalOpen(true)}
          >
            Ask A Service
          </button>
        </div>
        <div className="service__grid">
          <div className="service__card">
            <span>
              <i className="ri-tooth-line"></i>
              <i className="ri-brush-line"></i>
            </span>

            <h4>Teeth Whitening</h4>
            <p>
              Achieve a brighter, whiter smile with our safe and effective
              professional teeth whitening treatments.
            </p>
            <a
              href="https://www.webmd.com/oral-health/teeth-whitening-and-bleaching"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
          </div>
          <div className="service__card">
            <span>
              <i className="ri-tooth-line"></i>
              <i className="ri-brush-line"></i>
            </span>

            <h4>Dental Filling</h4>
            <p>
              Repair cavities and restore damaged teeth with durable,
              natural-looking fillings.
            </p>
            <a
              href="https://my.clevelandclinic.org/health/treatments/17002-dental-fillings"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
          </div>
          <div className="service__card">
            <span>
              <i className="ri-tooth-line"></i>
              <i className="ri-brush-line"></i>
            </span>
            <h4>Dental Crown</h4>
            <p>
              Protect and restore damaged or weakened teeth with crowns made
              from a variety of materials to meet your individual needs.
            </p>
            <a
              href="https://elevatedental.ph/service/dental-crowns/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section__container about__container" id="about">
        <div className="about__content">
          <h2 className="section__header">About Ramos Vallao Dental Clinic</h2>
          <p>
            At Ramos Vallao-Dental Clinic, we believe that a healthy smile is
            essential for overall well-being. That's why we're dedicated to
            providing exceptional dental care in a warm and welcoming
            environment. Our clinic, established in 2003, has been serving the
            community with a commitment to personalized care and a hands-on
            approach. We understand that visiting the dentist can be stressful
            for some, so we strive to create a comfortable and relaxing
            atmosphere where you can feel at ease.
          </p>
          <p>
            Our team of skilled professionals, led by Dr. Siyo R. Vallao, brings
            years of expertise and a genuine passion for helping patients
            achieve healthy and beautiful smiles. Dr. Vallao, with over 22 years
            of experience, believes in treating each individual with respect and
            understanding, taking the time to address your unique needs and
            concerns.
          </p>
          <p>
            We're committed to providing personalized care that addresses your
            specific goals and preferences. While we may not have the latest
            high-tech equipment, we believe in the power of traditional methods
            and a personalized touch. We utilize tried-and-true techniques and
            tools, ensuring you receive the most effective and comfortable
            treatment. Our focus is on providing quality care with a personal
            touch, ensuring your satisfaction and a positive experience.
          </p>
        </div>
        <div className="about__image">
          <img src="./assets/picture.png" alt="about" />
        </div>
      </section>

      {/* Dentist Section */}
      <section className="section__container why__container" id="dentist">
        <div className="dentist__content">
          <div className="doctors__card">
            <div className="doctors__card__image">
              <img src="./assets/dmd.jpg" alt="doctor" />
              <div className="doctors__socials">
                <a
                  href="https://www.instagram.com/vallao_ddm.italya?igsh=aW9pNTMxaXNodGtv"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    <i className="ri-instagram-line"></i>
                  </span>
                </a>
                <a
                  href="https://www.facebook.com/ronald.vallao?mibextid=ZbWKw"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    <i className="ri-facebook-fill"></i>
                  </span>
                </a>
                <span
                  className={`heart-icon ${isHeartActive ? 'active' : ''}`}
                  onClick={() => setIsHeartActive(!isHeartActive)}
                >
                  <i className="ri-heart-fill"></i>
                </span>
              </div>
            </div>
            <h4>Dr. Siyo R. Vallao</h4>
            <p>Gen Dentistry and Orthodontist</p>
          </div>
        </div>
        <div className="why__content">
          <h2 className="section__header">Why Choose Us</h2>
          <p>
            We're dedicated to making your dental experience as comfortable and
            positive as possible. Our friendly team is here to provide you with
            the best possible care in a welcoming environment.
          </p>
          <div className="why__grid">
            <span>
              <i className="ri-hand-heart-line"></i>
            </span>
            <div>
              <h4>Experience and Compassionate Care</h4>
              <p>
                Our team of skilled professionals, led by Dr. Siyo R. Vallao,
                brings years of expertise and a genuine passion for helping
                patients achieve healthy and beautiful smiles.
              </p>
            </div>
            <span>
              <i className="ri-truck-line"></i>
            </span>

            <div>
              <h4>Personalized Care in a Welcoming Environment</h4>
              <p>
                We strive to create a comfortable and relaxing atmosphere where
                you can feel at ease. Our team is friendly and dedicated to
                providing you with the best possible experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Surgical Equipment Section */}
      <section className="section__container doctors__container" id="surgical">
        <div className="doctors__header">
          <div className="doctors__header__content">
            <h2 className="section__header">Surgical Equipment</h2>
            <p>
              We're committed to providing you with the highest quality care,
              and that includes using the latest technology. Our surgical
              equipment is designed to make your treatment more precise,
              efficient, and comfortable.
            </p>
          </div>
          <div className="doctors__nav">
            <span>
              <i className="ri-arrow-left-line"></i>
            </span>

            <span>
              <i className="ri-arrow-right-line"></i>
            </span>
          </div>
        </div>
        <div className="doctors__grid">
          <div className="doctors__card">
            <div className="doctors__card__content">
              <h4>Precision Scalpels</h4>
              <p>
                Advanced surgical blades ensuring utmost precision during
                operations.
              </p>
            </div>
          </div>
          <div className="doctors__card">
            <div className="doctors__card__content">
              <h4>Robotic Assistance</h4>
              <p>
                Cutting-edge robotic systems for minimally invasive surgeries.
              </p>
            </div>
          </div>
          <div className="doctors__card">
            <div className="doctors__card__content">
              <h4>State-of-the-Art Monitoring</h4>
              <p>
                High-tech monitoring equipment for patient safety and effective
                outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="section__container footer__container">
          <div className="footer__col">
            <h3>
              SMILE<span>SYNC</span>
            </h3>
            <p>
              We're excited to partner with you on your journey to a healthier
              smile. With Smilesync, we can work together to create a
              personalized plan that meets your unique needs, making sure you
              feel comfortable and confident every step of the way.
            </p>
            <p>
              Trust us to care for your smile with Smilesync, a system that
              connects all aspects of your dental care for a seamless and
              personalized experience
            </p>
            <p>
              Let's work together to achieve a smile you'll love! Smilesync
              helps us provide personalized support and guidance throughout your
              dental journey.
            </p>
          </div>
          <div className="footer__col">
            <h4>About Ramos Vallao Dental Clinic</h4>
            <p>Home</p>
            <p>About Ramos Vallao Dental Clinic</p>
            <p>Work With Us</p>
            <p>Dentist</p>
            <p>Terms & Conditions</p>
          </div>
          <div className="footer__col">
            <h4>Other Services</h4>
            <p>Consultation</p>
            <p>Root Canals</p>
            <p>Dental Dentures</p>
            <p>Dental Implants</p>
            <p>Tooth Extraction</p>
          </div>
          <div className="footer__col">
            <h4>Other way to Contact Us</h4>
            <p>
              <i className="ri-map-pin-2-fill"></i> Salincaoet, Poblacion,
              Bugallon, Pangasinan
            </p>
            <p>
              <i className="ri-mail-fill"></i> support@smilesyncdentalclinic.com
            </p>
            <p>
              <i className="ri-phone-fill"></i> +639-672-108-943
            </p>
            <p>
              <i className="ri-phone-fill"></i> +639-608-173-666
            </p>
          </div>
        </div>
        <div className="footer__bar">
          <div className="footer__bar__content">
            <p>
              Copyright © 2024 SMILESYNC: AT Ramos Vallao Dental Clinic. All
              rights reserved.
            </p>
            <div className="footer__socials">
              <a
                href="https://www.instagram.com/vallao_ddm.italya?igsh=aW9pNTMxaXNodGtv"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <i className="ri-instagram-line"></i>
                </span>
              </a>
              <a
                href="https://www.facebook.com/ronald.vallao?mibextid=ZbWKw"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <i className="ri-facebook-fill"></i>
                </span>
              </a>
              <span
                className={`heart-icon ${isHeartActive ? 'active' : ''}`}
                onClick={() => setIsHeartActive(!isHeartActive)}
              >
                <i className="ri-heart-fill"></i>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DentalClinicApp;
