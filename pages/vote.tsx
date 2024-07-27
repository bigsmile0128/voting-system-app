// pages/vote.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import Image from "next/image";

import { auth, firestore } from "../lib/firebase";

const Vote = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [error, setError] = useState<string>("");
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
        checkUserVoteStatus(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  const checkUserVoteStatus = async (userId: string) => {
    const votesRef = collection(firestore, "votes");
    const q = query(votesRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      setHasVoted(true);
    }
  };

  const handleVote = async () => {
    if (selectedImage && user) {
      try {
        if (hasVoted) {
          setError("You have already voted.");
          return;
        }

        await addDoc(collection(firestore, "votes"), {
          userId: user.uid,
          selectedImage,
          timestamp: new Date(),
        });

        setHasVoted(true);
      } catch (err) {
        setError((err as Error).message);
      }
    } else {
      alert("Please select Image first!");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="w-full h-screen flex justify-center items-center p-4">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-xl font-bold text-center">
          Please vote for your favorite image.
        </h1>
        {hasVoted && <p className="text-green-500">You have already voted!</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Image
            src="/monke1.png"
            alt="Image A"
            onClick={() => setSelectedImage("A")}
            className={`${
              selectedImage !== "A" ? "dark:invert-0" : "dark:invert"
            } cursor-pointer border rounded`}
            width={200}
            height={24}
            priority
          />
          <Image
            src="/monke2.png"
            alt="Image B"
            onClick={() => setSelectedImage("B")}
            className={`${
              selectedImage !== "B" ? "dark:invert-0" : "dark:invert"
            } cursor-pointer border rounded`}
            width={200}
            height={24}
            priority
          />
          <Image
            src="/monke3.png"
            alt="Image C"
            onClick={() => setSelectedImage("C")}
            className={`${
              selectedImage !== "C" ? "dark:invert-0" : "dark:invert"
            } cursor-pointer border rounded`}
            width={200}
            height={24}
            priority
          />
          <Image
            src="/monke4.png"
            alt="Image D"
            onClick={() => setSelectedImage("D")}
            className={`${
              selectedImage !== "D" ? "dark:invert-0" : "dark:invert"
            } cursor-pointer border rounded`}
            width={200}
            height={24}
            priority
          />
        </div>
        <button
          onClick={handleVote}
          className="bg-blue-500 text-white p-2 mt-4"
        >
          Vote
        </button>
      </div>
    </div>
  );
};

export default Vote;
