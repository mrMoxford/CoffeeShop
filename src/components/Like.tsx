// Like.tsx
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { useFavorites } from "../hooks/useFavorites";
import styled from "styled-components";
interface LikeProps {
  productId: string;
}
// you can export styled components so that you can refrence them in the parent component
export const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
const Like = ({ productId }: LikeProps) => {
  const { favorites, toggleFavorite } = useFavorites();
  // Determine if this product is currently favorited
  const isActive = favorites.some((fav) => fav._id === productId);

  return (
    <>
      {isActive ? (
        <LikeButton
          onClick={() => {
            toggleFavorite(productId);
          }}
        >
          <IoIosHeart size={25} title="Remove from favorites" fill="red" />
        </LikeButton>
      ) : (
        <LikeButton
          onClick={() => {
            toggleFavorite(productId);
          }}
        >
          <IoIosHeartEmpty size={25} title="Add to favorites" />
        </LikeButton>
      )}
    </>
  );
};

export default Like;
