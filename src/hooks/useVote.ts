import { useState, useCallback, useEffect } from "react";
import axios from "axios";

interface VoteParams {
	post_id: string;
	user_id: string;
	post_type: string;
	vote_count: number;
}

export function useVote({ post_id, user_id, post_type, vote_count }: VoteParams) {

	const [netVotes, setNetVotes] = useState<number>(vote_count);
	const [activeVote, setActiveVote] = useState<1 | 0 | -1>(0);
	const [isVoting, setIsVoting] = useState<boolean>(false);


	// Fetch the user's vote status when the hook is initialized
	useEffect(() => {
		const fetchVote = async () => {
			try {
				if (!user_id || !post_id) return;
				const response = await axios.get(
					`/api/get_vote/?user_id=${user_id}&post_id=${post_id}`
				);
				setActiveVote(response.data.vote.vote as 1 | 0 | -1);
			} catch (err) {
				console.log("Vote Not there");
			}
		};

		fetchVote();
	}, [user_id, post_id]);


	async function handleVote(type: 1 | 0 | -1) {
		if (isVoting) return;

		const previousVotes = netVotes;
		const previousActiveVote = activeVote;

		if (activeVote === type) {
			if (activeVote === 1 || activeVote === -1) {
				setNetVotes(netVotes - activeVote);
				setActiveVote(0);
				type = 0;
			} else {
				setNetVotes(netVotes + type); // Fix: Use `type` instead of `activeVote`
				setActiveVote(type);
			}
		} else {
			setNetVotes(netVotes + (type - activeVote));
			setActiveVote(type);
		}
		setIsVoting(true);

		try {
			console.log(user_id, post_id, post_type, type);
			const response = await fetch("/api/vote", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user_id: user_id,
					post_id: post_id,
					post_type: post_type,
					vote: type,
				}),
			});

			const data = await response.json();
			if (!data.success) {
				setNetVotes(previousVotes);
				setActiveVote(previousActiveVote);
			}
		} catch (error) {
			setNetVotes(previousVotes);
			setActiveVote(previousActiveVote);
			console.error("Vote submission failed:", error);
		} finally {
			setIsVoting(false);
		}
	}

	return { netVotes, activeVote, isVoting, handleVote };
}