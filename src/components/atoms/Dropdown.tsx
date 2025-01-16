import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

export default function Dropdown({ options, selected, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to assign colors based on status
  const getStatusColor = (status: string) => {
    const colors = {
      Pending: "text-orange-600 bg-orange-50 hover:bg-orange-100",
      Approved: "text-yellow-600 bg-yellow-50 hover:bg-yellow-100",
      Completed: "text-green-600 bg-green-50 hover:bg-green-100",
      Rejected: "text-red-600 bg-red-50 hover:bg-red-100",
    };
    return colors[status as keyof typeof colors] || "text-gray-700 bg-white hover:bg-gray-100";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`py-2 px-4 border rounded-md w-full text-left shadow-md ${getStatusColor(selected)}`}
      >
        {selected || "Select an option"}
        <span className="float-right">V</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border rounded-md shadow-lg z-50">
          <ul className="flex flex-col">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`cursor-pointer px-4 py-2 rounded-md ${getStatusColor(option)} ${
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
