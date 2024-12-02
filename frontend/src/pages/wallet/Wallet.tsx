import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navbar from "../bikerenting/NavBar";
import axios from "axios";

// Types for Orders and Wallet
type Order = {
  orderId: string;
  status: string;
  transactionId: string | null;
  refundDate: string | null;
  orderAmount: number;
};

type WalletBalanceResponse = {
  balance: number;
};

// Sample Orders Data
const Orders: Order[] = [
  { orderId: "ABC123", status: "15 mins", transactionId: "XYZ789", refundDate: null, orderAmount: 100.5 },
  { orderId: "DEF456", status: "1 hour", transactionId: "UVW123", refundDate: null, orderAmount: 75.25 },
  { orderId: "MNO345", status: "Delivered", transactionId: "RST012", refundDate: "2024-02-15", orderAmount: 90.6 },
];

// Sidebar Component
const Sidebar: React.FC = () => (
  <div className="p-4">
    <Navbar />
  </div>
);

// WalletCard Component
const WalletCard: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch wallet balance on load
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get<WalletBalanceResponse>("http://localhost:3000/Wallet/get-balance");
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      }
    };
    fetchBalance();
  }, []);

  // Handle adding funds using Stripe
  const handleAddFunds = async (amount: number) => {
    setLoading(true);
    try {
      const response = await axios.post<{ url: string }>("http://localhost:3000/Wallet/create-checkout-session", {
        amount,
      });
      window.location.href = response.data.url; // Redirect to Stripe checkout
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Failed to initiate payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="p-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <CardTitle className="text-xl font-semibold">Wallet</CardTitle>
        <p className="mt-2 text-lg">
          Balance: <span className="font-bold">${balance.toFixed(2)}</span>
        </p>
      </CardHeader>
      <CardContent className="p-6 grid gap-4">
        <Button
          variant="outline"
          onClick={() => handleAddFunds(50)} // Example: Add $50
          disabled={loading}
        >
          {loading ? "Processing..." : "Load Balance"}
        </Button>
        <Button variant="destructive" disabled={loading}>
          Unlock Bike ($10)
        </Button>
      </CardContent>
      <CardFooter className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center">
        <p className="text-sm">Tap Count: 5</p>
        <p className="text-sm">Bike Status: Locked</p>
      </CardFooter>
    </Card>
  );
};

// Overview Component
const Overview: React.FC = () => (
  <div className="grid gap-6">
    <h2 className="text-2xl font-semibold">Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="p-4 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Last Payment</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">$10</CardContent>
      </Card>
      <Card className="p-4 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Pending Amount</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">$2</CardContent>
      </Card>
    </div>
  </div>
);

// Transactions Table Component
const Table: React.FC = () => (
  <div className="p-4 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 rounded-lg shadow-lg">
    <h2 className="font-bold text-xl mb-4 text-neutral-900 dark:text-neutral-100">
      Transactions | This Month
    </h2>
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-neutral-300 dark:border-neutral-700">
        <thead className="bg-neutral-200 dark:bg-neutral-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-900 dark:text-neutral-200">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-900 dark:text-neutral-200">
              Time Used
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-900 dark:text-neutral-200">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {Orders.map((order, index) => (
            <tr
              key={index}
              className={`border-b border-neutral-300 dark:border-neutral-700 ${
                index % 2 === 0
                  ? "bg-neutral-50 dark:bg-neutral-800"
                  : "bg-neutral-100 dark:bg-neutral-900"
              }`}
            >
              <td className="px-6 py-4">{order.orderId}</td>
              <td className="px-6 py-4">{order.status}</td>
              <td className="px-6 py-4">${order.orderAmount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Final WalletPage Component
const WalletPage: React.FC = () => (
  <div className="flex flex-col min-h-screen bg-white dark:bg-neutral-900">
    {/* Navbar */}
    <Sidebar />

    {/* Main Content */}
    <main className="flex-1 p-6 lg:p-10">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Wallet Dashboard</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Manage your wallet and transactions in one place.
        </p>
      </header>

      {/* Content Sections */}
      <div className="grid gap-8">
        {/* Wallet Card and Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <WalletCard />
          <div className="lg:col-span-2">
            <Overview />
          </div>
        </div>

        <Separator />

        {/* Transactions Table */}
        <Table />
      </div>
    </main>
  </div>
);

export default WalletPage;