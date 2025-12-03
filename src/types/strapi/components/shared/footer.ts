import type { RunningText } from "@/types/strapi/components/shared/running-text";
import type { NavigationGroup } from "./navigation-group";
import type { SocialMedia } from "./social-media";

export interface Footer {
  runningText?: RunningText;
  description: string;
  navigationGroups?: NavigationGroup[];
  socialMedia?: SocialMedia[];
}
