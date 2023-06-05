import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import DeleteIcon from '@mui/icons-material/Delete';
import "./Home.css";
import { Link } from 'react-router-dom';

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const [editPostText, setEditPostText] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [editPostId, setEditPostId] = useState(null);

  const postsCollectionRef = collection(db, "posts");

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    window.location.reload()
  };

  const editPost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await setDoc(postDoc, { postText: editPostText }, { merge: true });
    setShowEditForm(false);
    setEditPostId(null);
    setEditPostText("");
  };

  useEffect(() => {
    const getPosts = async () => {
      const querySnapshot = await getDocs(postsCollectionRef);
      const posts = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPostList(posts);
    };

    getPosts();
  }, []);

  return ( 
    <div className="homePage">
      {postLists.map((post) => (
        <div className="post" key={post.id}>
          <div className="postHeader">
            <div className="title">
              <h1>{post.title}</h1>
            </div>
            <div className="postButtons">
              {isAuth && post.author && post.author.id === auth.currentUser.uid && (
                <div className="deleteButton">
                  <DeleteIcon onClick={() => deletePost(post.id)} />
                </div>
              )}
              {isAuth && post.author && post.author.id === auth.currentUser.uid && (
                <div className="editButton">
                  <button
                    onClick={() => {
                      setShowEditForm(true);
                      setEditPostId(post.id);
                      setEditPostText(post.postText);
                    }}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="postTextContainer">{post.postText}</div>
          <div className="photo">
            {post.author && post.author.photo && (
              <img src={post.author.photo} alt="User" />
            )}
            {post.author && <h3>@{post.author.name}</h3>}
          </div>
        </div>
      ))}
      {showEditForm && (
        <div className="editForm">
          <textarea
            value={editPostText}
            onChange={(e) => setEditPostText(e.target.value)}
          />
          <div>
            <button onClick={() => editPost(editPostId)}>Save</button>
            <button onClick={() => setShowEditForm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
