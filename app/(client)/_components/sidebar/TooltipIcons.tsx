import {
  Briefcase,
  Inbox,
  LayoutDashboard,
  Settings,
  Settings2,
  User,
  Users,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip"

const TooltipIconRenderer = ({ iconName }: { iconName: string }) => {
  switch (iconName) {
    case 'Profile':
      return (
        <Tooltip>
          <TooltipTrigger><User className="h-5 w-5 mx-2 hover:scale-125" /></TooltipTrigger>
          <TooltipContent><p>Profile</p></TooltipContent>
        </Tooltip>
      );

    case 'Admin dashboard':
      return (
        <Tooltip>
          <TooltipTrigger><LayoutDashboard className="h-5 w-5 mx-2 hover:scale-125" /></TooltipTrigger>
          <TooltipContent><p>Admin dashboard</p></TooltipContent>
        </Tooltip>
      );

    case 'Recruitment':
      return (
        <Tooltip>
          <TooltipTrigger><Briefcase className="h-5 w-5 mx-2 hover:scale-125" /></TooltipTrigger>
          <TooltipContent><p>Recruitment</p></TooltipContent>
        </Tooltip>
      );

    case 'Users':
      return (
        <Tooltip>
          <TooltipTrigger><Users className="h-5 w-5 mx-2 hover:scale-125" /></TooltipTrigger>
          <TooltipContent><p>Users</p></TooltipContent>
        </Tooltip>
      );

    case 'Inbox':
      return (
        <Tooltip>
          <TooltipTrigger><Inbox className="h-5 w-5 mx-2 hover:scale-125" /></TooltipTrigger>
          <TooltipContent><p>Inbox</p></TooltipContent>
        </Tooltip>
      );

    case 'Preferences':
      return (
        <Tooltip>
          <TooltipTrigger><Settings2 className="h-5 w-5 mx-2 hover:scale-125" /></TooltipTrigger>
          <TooltipContent><p>Preferences</p></TooltipContent>
        </Tooltip>
      );

    case 'Settings':
      return (
        <Tooltip>
          <TooltipTrigger><Settings className="h-5 w-5 mx-2 hover:scale-125" /></TooltipTrigger>
          <TooltipContent><p>Settings</p></TooltipContent>
        </Tooltip>
      );

    default:
      return null;
  }
};

export default TooltipIconRenderer;
