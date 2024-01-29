import { Badge } from "@/app/components/ui/badge";

const rolesConfig: { [key: string]: { variant: string; label: string } } = {
  ADMIN: { variant: "secondary", label: "Admin" },
  EMPLOYEE: { variant: "outline", label: "Employee" },
  // Add more role configurations as needed
};

const RoleBadges = ({ roles }: { roles: string[] }) => {
  return (
    <>
      {roles?.map((role, index) => {
        const roleConfig = rolesConfig[role] || { variant: "outline", label: role };
        const { variant, label } = roleConfig;

        return <Badge key={index} variant={variant as any}>{label}</Badge>;
      })}
    </>
  );
};

export default RoleBadges
