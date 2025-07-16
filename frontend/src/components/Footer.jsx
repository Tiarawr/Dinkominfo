import React from "react";
import feather from "feather-icons";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#141624] dark:text-white text-black py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          {/* Logo and About Section */}
          <div className="w-full lg:max-w-[360px] ml-8">
            <div className="w-max max-w-full">
              <a className="header-logo block w-max py-3" href="/">
                <img
                  src="https://cdn.pekalongankab.go.id/uploads/dinas_98e2f2b35f.ico"
                  alt="logo"
                  width="190"
                  height="50"
                  className="w-auto min-h-10 max-h-14"
                />
              </a>
              <p className="dark:text-body-color-dark mb-9 text-base leading-relaxed text-body-color">
                Dinas Komunikasi dan informatika Kabupaten Pekalongan adalah
                sebuah instansi pemerintah yang bergerak di bidang komunikasi
                dan informatika.
              </p>
              <div className="flex items-center">
                <a
                  href="https://www.instagram.com/dinkominfopekalongankab/"
                  target="_blank"
                  aria-label="social-link"
                  className="flex items-center justify-center rounded-full dark:text-body-color-dark mr-6 text-body-color duration-300 hover:text-primary dark:hover:text-primary hover:border-primary cursor-pointer"
                >
                  <button
                    className="flex items-center justify-center p-2 rounded-full border-2 border-body-color hover:border-primary text-center cursor-pointer"
                    aria-label="instagram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-instagram"
                    >
                      <rect
                        width="20"
                        height="20"
                        x="2"
                        y="2"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                  </button>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCIUtCxMVq9TsqJVpjXn8lJA"
                  target="_blank"
                  aria-label="social-link"
                  className="flex items-center justify-center rounded-full dark:text-body-color-dark mr-6 text-body-color duration-300 hover:text-primary dark:hover:text-primary hover:border-primary cursor-pointer"
                >
                  <button
                    className="flex items-center justify-center p-2 rounded-full border-2 border-body-color hover:border-primary text-center cursor-pointer"
                    aria-label="youtube"
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: feather.icons.youtube.toSvg({
                          class: "h-5 w-5 opacity-50 text-black dark:text-white",
                        }),
                      }}
                    />
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="w-full lg:w-auto">
            <h1 className="font-semibold text-xl mb-4">Alamat</h1>
            <div className="relative overflow-hidden w-full max-w-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15839.493414731054!2d109.5904273!3d-7.0241696!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e701fed19ca62bf%3A0xf230092811ee034!2sDinas%20Komunikasi%20Dan%20Informatika%20(DINKOMINFO)%20Kabupaten%20Pekalongan!5e0!3m2!1sen!2sid!4v1733817586350!5m2!1sen!2sid"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Links Section */}
          <div className="w-full lg:w-auto mr-8">
            <h1 className="font-semibold text-xl mb-4">Link terkait</h1>
            <ul className="space-y-2">
              <li>
                <a href="" className="hover:text-blue-500 block mb-5">
                  Website Resmi Pemerintah Kabupaten Pekalongan
                </a>
              </li>
              <li>
                <a href="" className="hover:text-blue-500 block mb-5">
                  Dinas Komunikasi dan Informatika Kabupaten Pekalongan
                </a>
              </li>
              <li>
                <a href="" className="hover:text-blue-500 block mb-5">
                  PPID Kabupaten Pekalongan
                </a>
              </li>
              <li>
                <a href="" className="hover:text-blue-500 block">
                  Lapor Bup
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183] mt-8"></div>

      <div className="container mx-auto text-center mt-8">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Dinas Komunikasi dan Informatika
          Kabupaten Pekalongan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
