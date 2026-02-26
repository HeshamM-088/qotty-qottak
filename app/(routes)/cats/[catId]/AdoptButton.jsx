"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const AdoptButton = ({ catId, ownerId }) => {
  const [loading, setLoading] = useState(false);
  const [requested, setRequested] = useState(false);
  const router = useRouter();

  const handleAdoption = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/adoption-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ catId }),
      });

      if (!res.ok) throw new Error();

      setRequested(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (requested) {
    return (
      <Button disabled className="w-full py-6">
        تم إرسال الطلب ✔
      </Button>
    );
  }

  return (
    <Button
      onClick={handleAdoption}
      disabled={loading}
      className="w-full py-6 cursor-pointer"
    >
      {loading ? "جارٍ الإرسال..." : "تقديم طلب تبني رسمي"}
    </Button>
  );
};

export default AdoptButton;
