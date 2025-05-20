"use client";
import { useState, useEffect } from "react";
import {
  useAddress,
  useContract,
  useClaimNFT,
  useMetamask,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { client } from "./sanity/lib/client";

const contractAddress = "0xe3DE9Aa6d57C92262C8b317818291CC2Ca8B7912"; // Replace with your actual contract address

const MintPage = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const { contract } = useContract(contractAddress, "nft-drop");
  const { mutate: claimNFT, isLoading } = useClaimNFT(contract);
  const [userName, setUserName] = useState("");
  const [topic, setTopic] = useState("");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (gameOver) {
      setUserName("John Doe"); // Replace with actual user state
      setTopic("React Basics"); // Replace with actual topic
      setScore(100); // Replace with actual score
    }
  }, [gameOver]);

  const mintCertificate = async () => {
    if (!address) {
      toast.error("Please connect your wallet!");
      return;
    }

    try {
      // Save quiz results to Sanity
      await client.create({
        _type: "quizResult",
        userName,
        topic,
        score,
        walletAddress: address,
      });

      // Mint NFT Certificate
      await claimNFT({
        to: address,
        quantity: 1,
      });

      toast.success("🎉 Certificate minted successfully!");
      router.push("/profile"); // Redirect to profile page
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "❌ Minting failed.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Mint Your Certificate NFT</h1>

      {!address ? (
        <button
          onClick={() => connectWithMetamask()}
          className="btn btn-primary"
        >
          Connect Wallet
        </button>
      ) : (
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Congratulations {userName}!
          </h2>
          <p>
            You've completed the {topic} quiz with a score of {score}/100
          </p>
          <button
            onClick={mintCertificate}
            disabled={isLoading}
            className="btn btn-success mt-4"
          >
            {isLoading ? "Minting..." : "Mint Your Certificate NFT"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MintPage;
