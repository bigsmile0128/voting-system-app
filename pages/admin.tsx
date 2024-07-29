// pages/admin.tsx
"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { useRouter } from "next/router";
import { onAuthStateChanged, User } from "firebase/auth";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, Legend } from "recharts";

import { firestore, auth } from "../lib/firebase";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const [chartData, setChartData] = useState<any>([
    { voteImage: "Image A", dataKey: "A", voteCount: 0 },
    { voteImage: "Image B", dataKey: "B", voteCount: 0 },
    { voteImage: "Image C", dataKey: "C", voteCount: 0 },
    { voteImage: "Image D", dataKey: "D", voteCount: 0 },
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
        fetchVotes();
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  const fetchVotes = async () => {
    const q = query(collection(firestore, "votes"));
    const querySnapshot = await getDocs(q);
    const votesData = querySnapshot.docs.map(doc => doc.data());

    const updatedChartData = chartData.map((data: any) => ({
      ...data,
      voteCount: votesData.filter(vote => vote.selectedImage === data.dataKey)
        .length,
    }));

    setChartData(updatedChartData);
  };

  if (user?.email !== "admin@example.com") return <p>Access denied.</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-4 h-screen flex justify-center items-center">
      <div className="max-h-[500px] w-full flex flex-col justify-center items-center lg:w-1/2 lg:mx-auto">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <BarChart data={chartData} width={600} height={300}>
          <CartesianGrid vertical={true} />
          <XAxis dataKey="voteImage" />
          <Tooltip />
          <Legend />
          <Bar dataKey="voteCount" fill="#2563eb" radius={4} />
        </BarChart>
      </div>
    </div>
  );
}
