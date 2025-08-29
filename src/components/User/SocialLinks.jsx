import { FaFacebookF, FaInstagram, FaTiktok, FaXTwitter, FaYoutube } from 'react-icons/fa6';

const SocialLinks = () => {
  const socialLinks = [
    { href: "https://www.instagram.com/guess/#", icon: FaInstagram },
    { href: "https://www.facebook.com/GUESS/", icon: FaFacebookF },
    { href: "https://www.tiktok.com/@guess", icon: FaTiktok },
    { href: "https://www.youtube.com/@GUESS", icon: FaYoutube },
    { href: "https://x.com/GUESS", icon: FaXTwitter }
  ];

  return (
    <div className="flex items-center justify-center space-x-4">
      {socialLinks.map((social, index) => {
        const IconComponent = social.icon;
        return (
          <a key={index} href={social.href}>
            <IconComponent className="w-6 h-6" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
