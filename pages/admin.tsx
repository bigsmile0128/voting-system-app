// pages/admin.tsx

import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { useRouter } from "next/router";
import { onAuthStateChanged, User } from "firebase/auth";

import { firestore, auth } from "../lib/firebase";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [votes, setVotes] = useState<any[]>([]);
  const router = useRouter();

  console.log(user);

  useEffect(() => {
    if (!user) return;

    fetchVotes();
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  const fetchVotes = async () => {
    const q = query(collection(firestore, "votes"));
    const querySnapshot = await getDocs(q);
    const votesData = querySnapshot.docs.map(doc => doc.data());
    console.log(votesData);
    setVotes(votesData);
  };

  if (!user || user.email !== "admin@example.com") return <p>Access denied.</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <ul>
        {votes.map((vote, index) => (
          <li key={index} className="mb-2">
            User: {vote.userId} - voted for image: {vote.selectedImage}
          </li>
        ))}
      </ul>
    </div>
  );
}
