import React, { useEffect, useState } from 'react';

interface FooterProps {
  className?: string; // Define className as optional prop
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrollbar, setHasScrollbar] = useState(false);

  useEffect(() => {
    const checkScrollbar = () => {
      setHasScrollbar(document.documentElement.scrollHeight > window.innerHeight);
    };

    const handleScroll = () => {
      if (hasScrollbar) {
        // Calculate the scroll position variables
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollBottom = documentHeight - (scrollTop + windowHeight);
        const threshold = 200; // Adjust this value to change when the footer appears

        // Show the footer when scrolled a certain distance from the bottom and hide when at the top
        setIsVisible(scrollBottom < threshold && scrollTop > 0);
      }
    };

    checkScrollbar();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkScrollbar);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScrollbar);
    };
  }, [hasScrollbar]);

  return (
    <>
      <style>
        {`
          .footer {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 10px 5px; /* Reduced padding */
            background-color: lightSkyBlue; /* Changed background color */
            width: 100%;
            color: #333;
            font-size: 14px;
            box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
            position: fixed;
            bottom: ${isVisible || !hasScrollbar ? '0' : '-100px'}; /* Hide when not near bottom or show when no scrollbar */
            left: 0;
            right: 0;
            transition: bottom 1s ease; /* Smooth transition with 1 second duration */
            border-top: 1px solid #e0e0e0;
            border-top-left-radius: 15px; /* Curved top borders */
            border-top-right-radius: 15px; /* Curved top borders */
          }

          .footer p {
            margin: 5px 0;
          }

          .footer a {
            text-decoration: none;
            color: #007bff;
            margin: 0 15px;
            transition: color 0.3s;
          }

          .footer a:hover {
            color: #0056b3;
          }

          @media (max-width: 768px) {
            .footer {
              padding: 10px 5px; /* Adjusted for smaller screens */
            }

            .footer a {
              margin: 0 10px;
            }
          }
        `}
      </style>
      <div id="footer" className={`footer ${className}`}>
        <p>© 2024 Thay Technologies Pvt Limited. All Rights Reserved.</p>
        <p>
          {/* <a href="/terms">Terms of Service</a> */}
          <a href="/AboutUs">About Us</a>
          <a href="/contact">Contact Us</a>
        </p>
      </div>
    </>
  );
};

export default Footer;
