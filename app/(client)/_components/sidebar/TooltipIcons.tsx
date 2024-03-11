import {
  Briefcase,
  Inbox,
  LayoutDashboard,
  Settings,
  Settings2,
  UserRoundCog,
  Users,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip"

  // FTM-2 / FTM-20 21. Sidebar + tool tip icons

const TooltipIconRenderer = ({ iconName }: { iconName: string }) => {
  switch (iconName) {
    case 'Dashboard':
      return (
        <Tooltip>
          <TooltipTrigger className="mx-auto"><LayoutDashboard className="h-5 w-5 mx-auto hover:scale-125" /></TooltipTrigger>
          <TooltipContent><p>Dashboard</p></TooltipContent>
        </Tooltip>
      );

    case 'Admin':
      return (
        <Tooltip>
          <TooltipTrigger className="mx-auto"><UserRoundCog className="h-5 w-5 mx-auto hover:scale-125" /></TooltipTrigger>
          <TooltipContent><p>Admin</p></TooltipContent>
        </Tooltip>
      );

    case 'Recruitment':
      return (
        <Tooltip>
          <TooltipTrigger className="mx-auto"><Briefcase className="h-5 w-5 mx-auto hover:scale-125" /></TooltipTrigger>
          <TooltipContent><p>Recruitment</p></TooltipContent>
        </Tooltip>
      );

    case 'Users':
      return (
        <Tooltip>
          <TooltipTrigger className="mx-auto"><Users className="h-5 w-5 mx-auto hover:scale-125" /></TooltipTrigger>
          <TooltipContent><p>Users</p></TooltipContent>
        </Tooltip>
      );

    case 'Inbox':
      return (
        <Tooltip>
          <TooltipTrigger className="mx-auto"><Inbox className="h-5 w-5 mx-auto hover:scale-125" /></TooltipTrigger>
          <TooltipContent><p>Inbox</p></TooltipContent>
        </Tooltip>
      );

    case 'Preferences':
      return (
        <Tooltip>
          <TooltipTrigger className="mx-auto"><Settings2 className="h-5 w-5 mx-auto hover:scale-125" /></TooltipTrigger>
          <TooltipContent><p>Preferences</p></TooltipContent>
        </Tooltip>
      );

    case 'Settings':
      return (
        <Tooltip>
          <TooltipTrigger className="mx-auto"><Settings className="h-5 w-5 mx-auto hover:scale-125" /></TooltipTrigger>
          <TooltipContent><p>Settings</p></TooltipContent>
        </Tooltip>
      );

    default:
      return null;
  }
};

export default TooltipIconRenderer;
