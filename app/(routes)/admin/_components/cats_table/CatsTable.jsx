"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import CatsModal from "../cats_modal/CatsModal";

const initialCats = [
  {
    id: 1,
    name: "ميسو",
    type: "فارسي",
    age: "2 سنة",
    status: "متطعم",
    image: "🐱",
  },
  {
    id: 2,
    name: "لولا",
    type: "شيرازي",
    age: "1 سنة",
    status: "متطعم",
    image: "🐱",
  },
  {
    id: 3,
    name: "تايجر",
    type: "سيامي",
    age: "3 سنة",
    status: "غير متطعم",
    image: "🐱",
  },
];

const CatsTable = () => {
  const [cats, setCats] = useState(initialCats);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCat, setEditingCat] = useState(null);

  const filteredCats = cats.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.type.includes(searchQuery)
  );

  const handleAddCat = (data) => {
    const newCat = {
      ...data,
      id: Math.max(...cats.map((c) => c.id), 0) + 1,
    };
    setCats([...cats, newCat]);
    setShowModal(false);
  };

  const handleEditCat = (data) => {
    if (editingCat) {
      setCats(
        cats.map((cat) =>
          cat.id === editingCat.id ? { ...cat, ...data } : cat
        )
      );
      setEditingCat(null);
      setShowModal(false);
    }
  };

  const handleDeleteCat = (id) => {
    setCats(cats.filter((cat) => cat.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "متطعم":
        return "bg-blue-600 text-green-100";
      case "غير متطعم":
        return "bg-red-600 text-white block md:inline text-center";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center flex-1 gap-2 bg-muted rounded-lg px-4 py-2 min-w-50">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="ابحث عن قطة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground"
            />
          </div>

          <Button
            onClick={() => {
              setEditingCat(null);
              setShowModal(true);
            }}
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          >
            <Plus className="w-4 h-4" />
            إضافة قطة
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-right font-semibold">الاسم</th>
                <th className="px-6 py-3 text-right font-semibold">النوع</th>
                <th className="px-6 py-3 text-right font-semibold">العمر</th>
                <th className="px-6 py-3 text-right font-semibold">الحالة</th>
                <th className="px-6 py-3 text-right font-semibold">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCats.map((cat) => (
                <tr
                  key={cat.id}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">{cat.name}</td>
                  <td className="px-6 py-4">{cat.type}</td>
                  <td className="px-6 py-4">{cat.age}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-2xl text-sm font-medium ${getStatusColor(
                        cat.status
                      )}`}
                    >
                      {cat.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingCat(cat);
                          setShowModal(true);
                        }}
                        className="p-2 hover:bg-blue-100 dark:hover:bg-blue-950 rounded-lg text-blue-600"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteCat(cat.id)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-950 rounded-lg text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredCats.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">لا توجد قطط تطابق البحث</p>
          </div>
        )}
      </div>

      <CatsModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingCat(null);
        }}
        onSave={editingCat ? handleEditCat : handleAddCat}
        initialData={editingCat}
      />
    </>
  );
};

export default CatsTable;
