import { Heart } from "lucide-react";
import StatsCard from "../StatsCard";

const RequestsStatsCard = async ({ requests }) => {
  return (
    <StatsCard
      label="طلبات التبني"
      value={requests.length}
      Icon={Heart}
      color="text-rose-500"
      bg="bg-rose-50 dark:bg-rose-950"
    />
  );
};

export default RequestsStatsCard;
