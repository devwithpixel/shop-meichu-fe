import { Mail, MessageCircle, Facebook, Instagram } from "lucide-react";

export const contactPlatforms = [
    {
        value: "whatsapp",
        label: "WhatsApp",
        icon: MessageCircle,
        color: "text-green-500",
        placeholder: "+62 812 3456 7890",
    },
    {
        value: "email",
        label: "Email",
        icon: Mail,
        color: "text-blue-500",
        placeholder: "your.email@example.com",
    },
    {
        value: "instagram",
        label: "Instagram",
        icon: Instagram,
        color: "text-pink-500",
        placeholder: "@username",
    },
    {
        value: "facebook",
        label: "Facebook",
        icon: Facebook,
        color: "text-blue-600",
        placeholder: "facebook.com/username",
    },
] as const;

export type ContactPlatformValue = typeof contactPlatforms[number]["value"];