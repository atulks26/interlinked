import React, { useState, useEffect, useContext } from "react";
import { db } from "../context/firebase"; 
import {
    collection,
    query,
    onSnapshot,
    addDoc,
    serverTimestamp,
    orderBy,
} from "firebase/firestore";
import { UserContext } from "../context/userContext"; 

import "../styles/Forum.css";
import pp from "../images/profile.png";

const TOXICITY_THRESHOLD = 0.7;

const checkToxicity = async (text) => {
    if (!text) {
        console.warn("Perspective API key not set or text is empty. Skipping check.");
        return false; 
    }

    const API_URL = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${process.env.PERSPECTIVE_API_KEY}`;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                comment: { text: text },
                languages: ["en"],
                requestedAttributes: { TOXICITY: {} },
            }),
        });

        if (!response.ok) {
            throw new Error(`Perspective API error: ${response.statusText}`);
        }

        const data = await response.json();
        const toxicityScore = data.attributeScores.TOXICITY.summaryScore.value;
        
        console.log("Toxicity Score:", toxicityScore);
        
        return toxicityScore > TOXICITY_THRESHOLD;

    } catch (error) {
        console.error("Error calling Perspective API:", error);
        return false;
    }
};


const Forum = () => {
    const { user } = useContext(UserContext); 

    const [topics, setTopics] = useState([]);
    const [replies, setReplies] = useState([]);

    const [selectedTopic, setSelectedTopic] = useState(null);
    const [showNewThreadForm, setShowNewThreadForm] = useState(false);

    const [newThreadTitle, setNewThreadTitle] = useState("");
    const [newThreadContent, setNewThreadContent] = useState("");
    
    const [comment, setComment] = useState("");

    const [loadingTopics, setLoadingTopics] = useState(true);
    const [loadingReplies, setLoadingReplies] = useState(false);
    const [isPosting, setIsPosting] = useState(false);

    useEffect(() => {
        setLoadingTopics(true);
        const topicsCollection = collection(db, "public-topics");
        const q = query(topicsCollection, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedTopics = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTopics(fetchedTopics);
            setLoadingTopics(false);
        }, (error) => {
            console.error("Error fetching topics: ", error);
            setLoadingTopics(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!selectedTopic) {
            setReplies([]);
            return;
        }

        setLoadingReplies(true);
        const repliesCollection = collection(db, "public-topics", selectedTopic.id, "replies");
        const q = query(repliesCollection, orderBy("createdAt", "asc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedReplies = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setReplies(fetchedReplies);
            setLoadingReplies(false);
        }, (error) => {
            console.error("Error fetching replies: ", error);
            setLoadingReplies(false);
        });

        return () => unsubscribe();

    }, [selectedTopic]);

    const handleTopicSelect = (topic) => {
        setSelectedTopic(topic);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (comment.trim() === "" || !selectedTopic || isPosting) return;

        setIsPosting(true);

        const isToxic = await checkToxicity(comment);
        if (isToxic) {
            alert("Your reply was flagged for hateful content and was not posted. Please revise and try again.");
            setIsPosting(false);
            return;
        }

        try {
            const repliesCollection = collection(db, "public-topics", selectedTopic.id, "replies");
            await addDoc(repliesCollection, {
                reply: comment,
                authorName: user?.user_name || "Anonymous",
                authorId: user?.userId || null,
                dp: user?.profileImageUrl || pp,
                createdAt: serverTimestamp()
            });
            
            setComment("");
        } catch (error) {
            console.error("Error posting reply: ", error);
            alert("An error occurred while posting your reply.");
        }
        setIsPosting(false);
    };

    const handleCreateThread = async (e) => {
        e.preventDefault();
        if (newThreadTitle.trim() === "" || newThreadContent.trim() === "" || isPosting) return;

        setIsPosting(true);

        const isTitleToxic = await checkToxicity(newThreadTitle);
        const isContentToxic = await checkToxicity(newThreadContent);

        if (isTitleToxic || isContentToxic) {
            alert("Your thread's title or content was flagged for hateful content and was not posted. Please revise and try again.");
            setIsPosting(false);
            return;
        }

        try {
            const topicsCollection = collection(db, "public-topics");
            await addDoc(topicsCollection, {
                title: newThreadTitle,
                content: newThreadContent,
                authorName: user?.user_name || "Anonymous",
                authorId: user?.userId || null,
                createdAt: serverTimestamp(),
                replyCount: 0
            });

            setNewThreadTitle("");
            setNewThreadContent("");
            setShowNewThreadForm(false);
        } catch (error) {
            console.error("Error creating thread: ", error);
            alert("An error occurred while creating the thread.");
        }
        setIsPosting(false);
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return "Just now";
        return timestamp.toDate().toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    return (
        <div className="forum-page">
            {!selectedTopic ? (
                <>
                    <div className="forum-header">
                        <h1>Community Forum</h1>
                        <button className="create-thread-btn" onClick={() => setShowNewThreadForm(true)}>
                            + Create New Thread
                        </button>
                    </div>

                    <div className="forum-topic-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loadingTopics ? (
                                    <tr><td colSpan="3">Loading topics...</td></tr>
                                ) : (
                                    topics.map((topic) => (
                                        <tr key={topic.id} onClick={() => handleTopicSelect(topic)}>
                                            <td>{topic.title}</td>
                                            <td>{topic.authorName}</td>
                                            <td>{formatDate(topic.createdAt)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {showNewThreadForm && (
                        <div className="modal-overlay" onClick={() => setShowNewThreadForm(false)}>
                            <div
                                className="modal-content"
                                onClick={(e) => e.stopPropagation()} 
                            >
                                <h2>Create New Thread</h2>
                                <form onSubmit={handleCreateThread}>
                                    <input
                                        type="text"
                                        placeholder="Enter thread title..."
                                        value={newThreadTitle}
                                        onChange={(e) => setNewThreadTitle(e.target.value)}
                                        required
                                    />
                                    <textarea
                                        placeholder="Write your content here..."
                                        value={newThreadContent}
                                        onChange={(e) => setNewThreadContent(e.target.value)}
                                        required
                                    />
                                    <div className="form-actions">
                                        <button type="submit" className="submit-btn" disabled={isPosting}>
                                            {isPosting ? "Posting..." : "Post Thread"}
                                        </button>
                                        <button
                                            type="button"
                                            className="cancel-btn"
                                            onClick={() => setShowNewThreadForm(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="topic-detail">
                    <button className="back-btn" onClick={() => setSelectedTopic(null)}>
                        ← Back to Topics
                    </button>
                    <h2>{selectedTopic.title}</h2>
                    <p className="topic-desc">
                        <strong>Posted by {selectedTopic.authorName}:</strong>
                        <br />
                        {selectedTopic.content || "No content provided."}
                    </p>

                    <div className="comment-section">
                        <h3>Replies</h3>
                        {loadingReplies ? (
                            <p className="no-replies">Loading replies...</p>
                        ) : replies.length === 0 ? (
                            <p className="no-replies">No replies yet. Be the first to comment!</p>
                        ) : (
                            <div className="replies-container">
                                {replies.map((reply) => (
                                    <div className="reply" key={reply.id}>
                                        <img src={reply.dp || pp} alt={reply.authorName} className="user-dp" />
                                        <div className="reply-content">
                                            <strong>{reply.authorName}:</strong>
                                            <p>{reply.reply}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleCommentSubmit} className="comment-form">
                        <textarea
                            placeholder="Write a reply..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                        <button type="submit" disabled={isPosting}>
                            {isPosting ? "Posting..." : "Post Reply"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Forum;