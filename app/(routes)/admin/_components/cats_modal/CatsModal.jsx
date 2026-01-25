"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const CatsModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    age: "",
    status: "متطعم",
    image: "🐱",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-md shadow-lg animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">
            {"إضافة قطة جديدة"}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">الاسم</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 bg-input border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary"
              placeholder="اسم القطة"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">النوع</label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full px-3 py-2 bg-input border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary"
              placeholder="مثال: فارسي، شيرازي"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">العمر</label>
            <input
              type="text"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
              className="w-full px-3 py-2 bg-input border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary"
              placeholder="مثال: 2 سنة"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">الحالة</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full px-3 py-2 bg-input border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="متطعم">متطعم</option>
              <option value="غير متطعم">غير متطعم</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end pt-4 border-t border-border">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="border-border hover:bg-muted bg-transparent"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {"إضافة"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CatsModal;
