import React from "react";
const Copyright = () => {
  const text = "© 2025 thoangne. All rights reserved.";

  return (
    <p className="text-center text-sm text-[#000] mt-10 bg-gradient-to-l from-[#ec7dee] to-[#f630c5]  ">
      {text.split("").map((char, idx) => (
        <span
          key={idx}
          className="inline-block opacity-0 fade-in"
          style={{ animationDelay: `${idx * 50}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </p>
  );
};

const Footer = () => {
  return (
    <div className="backdrop-blur-md">
      <footer className="px-5 lg:px-32 py-10 mt-20 border-t border-[#f7cece] text-white  ">
        <div className="flex flex-col lg:flex-row justify-between gap-y-8 lg:gap-12">
          {/* Logo + slogan + social */}
          <div>
            <h1 className="text-3xl font-bold">Bloggy</h1>
            <p className="text-gray-400 mt-1 text-sm">Read. Write. Learn</p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-blue-600 rounded-lg text-white hover:opacity-90 transition"
              >
                <i className="fab fa-facebook" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-gradient-to-r from-pink-700 to-orange-300 rounded-lg text-white hover:opacity-90 transition"
              >
                <i className="fab fa-instagram" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-blue-500 rounded-lg text-white hover:opacity-90 transition"
              >
                <i className="fab fa-twitter" />
              </a>
            </div>
          </div>

          {/* Footer columns */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 text-sm">
            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Company</h4>
              <ul className="space-y-1">
                {["About us", "Careers", "Press", "Blog"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-gray-300 transition"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Solutions</h4>
              <ul className="space-y-1">
                {["Marketing", "Analytics", "Commerce", "Insights"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-gray-300 transition"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Resources</h4>
              <ul className="space-y-1">
                {["Documentation", "Tutorials", "Support", "Community"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-gray-300 transition"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <Copyright />
    </div>
  );
};

export default Footer;
