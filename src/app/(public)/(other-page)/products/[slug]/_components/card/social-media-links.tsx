import {
  FaFacebookF,
  FaInstagram,
  FaPinterest,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

interface SocialMedia {
  id: number;
  media: string;
  url: string;
}

interface SocialMediaLinksProps {
  socialMedia: SocialMedia[];
}

const getSocialIcon = (media: string) => {
  const iconProps = {
    size: 34,
    className:
      "p-2 rounded-full cursor-pointer hover:text-gray-400 hover:border hover:border-gray-400 transition-all",
  };

  const mediaLower = media.toLowerCase();

  if (mediaLower.includes("facebook")) return <FaFacebookF {...iconProps} />;
  if (mediaLower.includes("instagram")) return <FaInstagram {...iconProps} />;
  if (mediaLower.includes("x") || mediaLower.includes("twitter"))
    return <FaXTwitter {...iconProps} />;
  if (mediaLower.includes("youtube")) return <FaYoutube {...iconProps} />;
  if (mediaLower.includes("pinterest")) return <FaPinterest {...iconProps} />;
  if (mediaLower.includes("telegram"))
    return <FaTelegramPlane {...iconProps} />;
  if (mediaLower.includes("whatsapp")) return <FaWhatsapp {...iconProps} />;

  return <FaFacebookF {...iconProps} />;
};

export default function SocialMediaLinks({
  socialMedia,
}: SocialMediaLinksProps) {
  if (!socialMedia || socialMedia.length === 0) return null;

  return (
    <div className="mb-4 md:mb-6 flex items-center gap-3">
      <p className="font-rubik font-bold text-xs">Social: </p>
      <div className="flex items-center gap-3">
        {socialMedia.map((social) => (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.media}
          >
            {getSocialIcon(social.media)}
          </a>
        ))}
      </div>
    </div>
  );
}
