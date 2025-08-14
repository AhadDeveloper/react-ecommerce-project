import { useContext } from "react";
import { Link } from "react-router-dom";
import footerData from "../../constants";
import context from "../../context/context";
import {
  FaStore,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const companyInfo = footerData.companyInfo;
  const ctx = useContext(context);

  const categoryHandler = () => {
    ctx.setBackdrop(true);
    ctx.setSidebar(true);
  };

  return (
    <footer className="text-white">
      <div className="bg-gray-800 py-3 md:text-sm text-xs text-center grid grid-cols-2 px-2 gap-2">
        <div>
          <h1 className="text-yellow-500 mb-2">{companyInfo.name}</h1>
          <p>{companyInfo.description}</p>
        </div>
        <div>
          <p>{companyInfo.contactEmail}</p>
          <p>{companyInfo.contactPhone}</p>
          <p>{companyInfo.address}</p>
        </div>
      </div>
      <div className="bg-gray-600 py-8 flex flex-col gap-16">
        <div className="grid grid-cols-4 gap-7 px-10 lg:text-lg text-sm">
          <div>
            <h1 className="text-yellow-400 mb-1">Customer Services</h1>
            <ul>
              {footerData.customerService.map((service, index) => (
                <Link key={index} to={`/footer/${service.link}`}>
                  <li className="hover:underline hover:cursor-pointer">
                    {service.name}
                  </li>
                </Link>
              ))}
              <Link to="/cart">
                <li className="hover:underline hover:cursor-pointer">
                  Order Tracking
                </li>
              </Link>
            </ul>
          </div>
          <div>
            <h1 className="text-yellow-400 mb-1">Legal</h1>
            <ul>
              {footerData.about.map((item, index) => (
                <Link key={index} to={`/footer/${item.link}`}>
                  <li className="hover:underline hover:cursor-pointer">
                    {item.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="text-yellow-400 mb-1">Quick Links</h1>
            <ul>
              <button onClick={categoryHandler}>
                <li className="hover:underline hover:cursor-pointer">
                  Shop by Category
                </li>
              </button>
              {footerData.quickLinks.map((link, index) => (
                <Link key={index} to={link.link}>
                  <li className="hover:underline hover:cursor-pointer">
                    {link.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="text-yellow-400 mb-1">Legal</h1>
            <ul>
              {footerData.legal.map((item, index) => (
                <Link key={index} to={`/footer/${item.link}`}>
                  <li className="hover:underline hover:cursor-pointer">
                    {item.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <div className="md:grid md:grid-cols-2 flex justify-center px-10 gap-5 items-center">
          <div className="flex text-2xl gap-6">
            <Link
              className="p-1 hover:border"
              to="https://www.facebook.com/profile.php?id=100015731833881"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </Link>
            <Link
              className="p-1 hover:border"
              to="https://www.linkedin.com/in/muhammad-ahad-58b08727a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </Link>
            <Link
              className="p-1 hover:border"
              to="https://www.instagram.com/abdul_ahad_055/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </Link>
            <Link
              className="p-1 hover:border"
              to="https://www.tiktok.com/@m_ahad_0005"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok />
            </Link>
            <Link
              className="p-1 hover:border"
              to="https://www.youtube.com/@AhadBrawlStars"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </Link>
            <Link
              className="p-1 hover:border"
              to="https://x.com/Ahad75366?t=82dLeCH2Odb_mxFO2TLVFg&s=08"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </Link>
          </div>
          <div className="hidden md:flex gap-3 items-center justify-center">
            <FaStore className="lg:w-8 w-6 h-6" />
            <h1 className="lg:text-lg text-sm font-bold">
              Ecommerce <span className="text-yellow-400">Store</span>
            </h1>
            <div className="flex gap-2 items-center border px-2 py-1 lg:text-lg text-sm hover:bg-gray-400">
              <img
                src="/assets/svgs/pakistan-flag-icon.svg"
                className="lg:w-8 w-6"
              />
              Pakistan
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
