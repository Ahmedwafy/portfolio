import { Mail, Link2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram } from "react-icons/fa6";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

const brandIconMap: Record<string, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  "twitter / x": FaXTwitter,
  twitter: FaXTwitter,
  instagram: FaInstagram,
};

const utilityIconMap: Record<string, LucideIcon> = {
  email: Mail,
};

export function SocialIcon({
  platform,
  size = 16,
}: {
  platform: string;
  size?: number;
}) {
  const key = platform.toLowerCase();
  const BrandIcon = brandIconMap[key];
  if (BrandIcon) return <BrandIcon size={size} />;

  const UtilityIcon = utilityIconMap[key] ?? Link2;
  return <UtilityIcon size={size} />;
}
