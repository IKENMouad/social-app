import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/post.actions";
import { authenticationService } from "../../services/auth.service";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const dispatch = useDispatch();

  const likeOrUnlike = (isLike) => {
    if (isLike) {
      dispatch(likePost(post._id, currentUser.id));
    } else {
      dispatch(unlikePost(post._id, currentUser.id));
    }
    setLiked(isLike);
  };

  useEffect(() => {
    setCurrentUser(authenticationService.currentUserValue);
  }, [])

  useEffect(() => { 
    if (post.likers.includes(currentUser.id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [currentUser, post.likers, liked]);

  return (
    <div className="like-container">
      {currentUser === null && (
        <Popup
          trigger={<img src="./img/icons/heart.svg" alt="like" />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>Connectez-vous pour aimer un post !</div>
        </Popup>
      )}
      {currentUser && liked === false && (
        <img
          src="./img/icons/heart.svg"
          onClick={() => likeOrUnlike(true)}
          alt="like"
        />
      )}
      {currentUser && liked && (
        <img
          src="./img/icons/heart-filled.svg"
          onClick={() => likeOrUnlike(false)}
          alt="unlike"
        />
      )}
      <span>{post.likers.length}</span>
    </div>
  );
};

export default LikeButton;
