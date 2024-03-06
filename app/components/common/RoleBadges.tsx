import { Badge } from "@/app/components/ui/badge";
import { capitaliseFirstLetter } from "@/lib/capitiliseFirstLetter";
import { BadgeProps } from "@/lib/interfaces";
import { useEffect, useState } from 'react';

const Badges: React.FC<BadgeProps> = ({ items }) => {
  console.log(items)

  return (
    <>
      {items?.map((item, index) => (
         <Badge key={index} variant={index}>{(item)}</Badge>
      ))}
    </>
  );
};

export default Badges;

// import { Badge } from "@/app/components/ui/badge";
// import { RoleBadgeProps } from "@/lib/interfaces";

// // FTM-2 / FTM-20 1.a. Role badges

// const rolesConfig: { [key: string]: { variant: string; label: string } } = {
//   ADMIN: { variant: "secondary", label: "Admin" },
//   EMPLOYEE: { variant: "outline", label: "Employee" },
// };

// const RoleBadges: React.FC<RoleBadgeProps> = ({ roles }) => {
//   return (
//     <>
//       {roles?.map((role, index) => {
//         const roleConfig = rolesConfig[role] || { variant: "outline", label: role };
//         const { variant, label } = roleConfig;

//         return <Badge key={index} variant={variant as any}>{label}</Badge>;
//       })}
//     </>
//   );
// };

// export default RoleBadges;
