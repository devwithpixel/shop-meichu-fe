"use client";

import {
  FaFacebookF,
  FaPinterest,
  FaTelegram,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";

export default function ProductSocialShare() {
  return (
    <div className="my-5 flex flex-col md:flex-row items-start md:items-center gap-3">
      <p className="font-rubik font-bold text-xs">Social: </p>
      <div className="flex items-center gap-3">
        <FaFacebookF
          size={34}
          className="p-2 rounded-full cursor-pointer hover:text-gray-400 hover:border hover:border-gray-400 transition-all"
        />
        <FaXTwitter
          size={34}
          className="p-2 rounded-full cursor-pointer hover:text-gray-400 hover:border hover:border-gray-400 transition-all"
        />
        <FaTelegram
          size={34}
          className="p-2 rounded-full cursor-pointer hover:text-gray-400 hover:border hover:border-gray-400 transition-all"
        />
        <FaPinterest
          size={34}
          className="p-2 rounded-full cursor-pointer hover:text-gray-400 hover:border hover:border-gray-400 transition-all"
        />
        <FaWhatsapp
          size={34}
          className="p-2 rounded-full cursor-pointer hover:text-gray-400 hover:border hover:border-gray-400 transition-all"
        />
      </div>
    </div>
  );
}
