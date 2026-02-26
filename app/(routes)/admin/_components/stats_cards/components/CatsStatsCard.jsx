import { PawPrint } from "lucide-react";
import StatsCard from "../StatsCard";

const CatsStatsCard = async ({ cats }) => {
  return (
    <StatsCard
      label="عدد القطط"
      value={cats.length}
      Icon={PawPrint}
      color="text-blue-500"
      bg="bg-blue-50 dark:bg-blue-950"
    />
  );
};

export default CatsStatsCard;
