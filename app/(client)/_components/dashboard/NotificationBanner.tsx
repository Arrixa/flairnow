import { Terminal } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/components/ui/alert";
import { Button } from "@/app/components/ui/button";

const NotificationBanner = ({ onRefreshClick }: { onRefreshClick: () => void }) => {
  return (
    <Alert>
      <Terminal className="h-4 w-4 text-blue-500" />
      <div className="ml-2">
        <AlertTitle className="text-sm font-medium text-blue-800">
          Heads up!
        </AlertTitle>
        <AlertDescription className="text-xs text-blue-600">
          The client infomation is outdated. Click refresh to update the table.
        </AlertDescription>
        <Button
            className="text-xs text-blue-500 underline ml-2 cursor-pointer"
            onClick={onRefreshClick}
          >
            Refresh
          </Button>
      </div>
    </Alert>
  );
};

export default NotificationBanner;