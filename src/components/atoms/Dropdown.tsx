import React, { useState } from "react";

interface DropdownProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

export default function Dropdown({ options, selected, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getStatusColor = (status: string) => {
    const colors = new Map([
      ["Pending", "text-orange-600 bg-orange-50 hover:bg-orange-100"],
      ["Approved", "text-yellow-600 bg-yellow-50 hover:bg-yellow-100"],
      ["Completed", "text-green-600 bg-green-50 hover:bg-green-100"],
      ["Rejected", "text-red-600 bg-red-50 hover:bg-red-100"],
    ]);
    return colors.get(status) || "text-gray-700 bg-white hover:bg-blue-100 capitalize";
  };

  return (
    <div className="relative">
      {/* button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`py-2 px-4 border rounded-md w-full text-left shadow-md z-10 whitespace-nowrap ${getStatusColor(selected)}`}
      >
        {selected}
        <span className="float-end lowercase">v</span>
      </button>

      {/* menu */}
      {isOpen && (
        <div className="absolute mt-2 mr-50 bg-white border rounded-xl shadow-lg z-50 whitespace-nowrap">
          <ul className="flex flex-col">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`cursor-pointer px-4 py-2 rounded-lg ${getStatusColor(option)} ${
                  selected === option ? "font-bold" : ""
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
