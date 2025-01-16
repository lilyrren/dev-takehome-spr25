"use client";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Table from "@/components/atoms/Table";

import { useState, useEffect } from "react";

interface ItemRequest {
  id: string;
  name: string;
  item: string;
  createdDate: string;
  updatedDate?: string;
  status: string;
}

/**
 * Legacy front-end code from Crisis Corner's previous admin page!
 */
export default function ItemRequestsPage() {
  const [item, setItem] = useState<string>("");
  const [itemList, setItemList] = useState<string[]>([]);
  const [requests, setRequests] = useState<ItemRequest[]>([]);

  useEffect(() => {
  // initial data
  fetch("/api/mock/request")
    .then(res => res.json())
    .then(data => setRequests(data))
    .catch(err => console.error(err));
  }, []);

  const handleAddItem = (): void => {
    if (item.trim()) {
      setItemList((prevList) => [...prevList, item.trim()]);
      setItem("");
    }
  };

    const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await fetch("/api/mock/request", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      // updating local state after successful API call
      setRequests(prevRequests =>
        prevRequests.map(req =>
          req.id === id ? { ...req, status: newStatus } : req
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };


  return (
    <div className="max-w-md mx-auto mt-8 flex flex-col items-center gap-6">
      <h2 className="font-bold">Approve Items</h2>

      <div className="flex flex-col w-full gap-4">
        <Input
          type="text"
          placeholder="Type an item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          label="Item"
        />
        <Button onClick={handleAddItem}>Approve</Button>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="underline">Currently approved items:</h3>
        {itemList.length > 0 ? (
          <ul className="list-disc pl-5">
            {itemList.map((listItem, index) => (
              <li key={index}>{listItem}</li>
            ))}
          </ul>
        ) : (
          "None :("
        )}
      </div>

      <div className="w-full mt-8">
         <Table
          data={requests}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
}