// iconRenderer.tsx
import {
  Briefcase,
  Inbox,
  LayoutDashboard,
  LogOut,
  Settings,
  Settings2,
  User,
  Users,
} from "lucide-react";

interface IconRendererProps {
  iconName: string;
}

const IconRenderer: React.FC<IconRendererProps> = ({ iconName }) => {
  switch (iconName) {
    case 'Profile':
      return <User className="ml-auto mr-4 h-4 w-4" />;
    case 'Admin dashboard':
      return <LayoutDashboard className="ml-auto mr-4 h-4 w-4" />;
    case 'Recruitment':
      return <Briefcase className="ml-auto mr-4 h-4 w-4" />;
    case 'Users':
      return <Users className="ml-auto mr-4 h-4 w-4" />;
    case 'Inbox':
      return <Inbox className="ml-auto mr-4 h-4 w-4" />;
    case 'Preferences':
      return <Settings2 className="ml-auto mr-4 h-4 w-4" />;
    case 'Settings':
      return <Settings className="ml-auto mr-4 h-4 w-4" />;
    default:
      return null;
  }
};

export default IconRenderer;
