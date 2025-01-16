import React, { useState } from "react";
import Dropdown from "./Dropdown";

interface TableRow {
  id: string;
  name: string;
  item: string;
  createdDate: string;
  updatedDate?: string;
  status: string;
}

interface TabProps {
  label: string;
  count?: number;
  active?: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, count, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-50 
    ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}
    ${count !== undefined ? 'flex items-center gap-2' : ''}`}
  >
    {label}
    {count !== undefined && (
      <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
        {count}
      </span>
    )}
  </button>
);

interface TableProps {
  data: TableRow[];
  onStatusChange: (id: string, status: string) => void;
}

export default function Table({ data, onStatusChange }: TableProps) {
  const [activeTab, setActiveTab] = useState("All");
  const statusOptions = ["Pending", "Approved", "Completed", "Rejected"];

  const tabs = [
    { id: "All", label: "All" },
    { id: "Pending", label: "Pending" },
    { id: "Approved", label: "Approved" },
    { id: "Completed", label: "Completed" },
    { id: "Rejected", label: "Rejected" }
  ];

  const filteredData = data.filter(row => 
    activeTab === "All" ? true : row.status === activeTab
  );

  return (
    <div className="bg-white rounded-lg border">
      {/* Header with Tabs */}
      <div className="border-b border-gray-200">
        <div className="px-4 sm:px-6 flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              label={tab.label}
              count={data.filter(item => 
                tab.id === "All" ? true : item.status === tab.id
              ).length}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item Requested
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Updated
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((row) => (
              <tr key={row.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.item}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.createdDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.updatedDate || row.createdDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Dropdown
                    options={statusOptions}
                    selected={row.status}
                    onChange={(newStatus) => onStatusChange(row.id, newStatus)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}