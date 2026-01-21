import useDebounce from "@/hooks/useDebounce";
import { egyptGovernorates } from "@/lib/egyptGovernorates";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const CitySelect = ({ value, onChange }) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 30);

  const filteredGovernorates = egyptGovernorates.filter((gov) =>
    gov.includes(debouncedSearch),
  );

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="اختر المحافظة أو اكتب للبحث" />
      </SelectTrigger>

      <SelectContent className="max-h-60 overflow-y-auto">
        {/* Input البحث داخل القائمة */}
        <div className="p-2">
          <Input
            placeholder="اكتب للبحث..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </div>

        {filteredGovernorates.length > 0 ? (
          filteredGovernorates.map((gov) => (
            <SelectItem key={gov} value={gov}>
              {gov}
            </SelectItem>
          ))
        ) : (
          <p className="p-2 text-sm text-muted-foreground">لا توجد نتائج</p>
        )}
      </SelectContent>
    </Select>
  );
};

export default CitySelect;
