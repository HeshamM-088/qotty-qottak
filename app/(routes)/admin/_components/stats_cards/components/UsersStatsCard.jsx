import { Users } from "lucide-react";
import StatsCard from "../StatsCard";

const UsersStatsCard = async ({ users }) => {
  return (
    <StatsCard
      label="المستخدمون"
      value={users.length}
      Icon={Users}
      color="text-amber-500"
      bg="bg-amber-50 dark:bg-amber-950"
    />
  );
};

export default UsersStatsCard;
