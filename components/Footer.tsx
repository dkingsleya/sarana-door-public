import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

const Footer = async () => {
  const prisma = new PrismaClient();

  const footerLinks = await prisma.footer.findMany({
    include: {
      links: true,
    },
  });
  return (
    <footer className="flex flex-col text-black-100 mt-5 border-t border-gray-100 pt-6">
      <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
        <div className="flex flex-col justify-start items-start gap-6">
          <Image
            src="/logo.png"
            alt="logo"
            width={200}
            height={200}
            priority
            className="object-contain w-auto h-auto"
          />
          <p className="text-base text-gray-700">
            PT.GLOBAL PIPLASINDO <br />
            All rights reserved &copy;
          </p>
        </div>
        <div className="footer__links">
          {footerLinks.map((link) => (
            <div key={link.title} className="footer__link">
              <h3 className="font-bold">{link.title}</h3>
              {link.links.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  className="text-gray-500"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center flex-wrap mt-10 border-t border-gray-100 sm:px-16 px-6 py-10">
        <p></p>
      </div>
    </footer>
  );
};

export default Footer;
