import { useState, useEffect } from "react";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import styled from "styled-components";
import { useFavorites, Favorite } from "../hooks/useFavorites";

const Wrapper = styled.div`
  position: relative;
`;

// Navbar button
const IconButton = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
`;

// Dropdown modal
const Dropdown = styled.div<{ open: boolean }>`
  opacity: ${(props) => (props.open ? 1 : 0)};
  pointer-events: ${(props) => (props.open ? "auto" : "none")};
  flex-direction: column;
  position: absolute;
  color: black;
  top: 2.5rem;
  right: 0;
  gap: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  min-width: 250px;
  max-height: 60vh;
  overflow-y: auto;
  z-index: 1000;
  padding: 1rem;
`;

// Each favorite item
const FavoriteItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 1rem;
  img {
    width: 30px;
    height: 30px;
    object-fit: cover;
    border-radius: 4px;
  }
  button {
    margin-left: auto;
    padding: 0.1rem 0.3rem;
    background: red;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;
const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
const FavoritesWidget = () => {
  const [open, setOpen] = useState(false);
  const [prevCount, setPrevCount] = useState(0);
  const { favorites, toggleFavorite, isLoading } = useFavorites();

  // Auto-open when new favorite is added

  useEffect(() => {
    if (favorites.length > prevCount) {
      setOpen(true);
    }
    if (!open) return;

    const timer = setTimeout(() => {
      setOpen(false);
    }, 3000);
    setPrevCount(favorites.length);
    return () => clearTimeout(timer);
  }, [favorites.length, prevCount, open]);

  return (
    <Wrapper>
      {favorites.length > 0 ? (
        <LikeButton onClick={() => setOpen(!open)}>
          <IoIosHeart size={35} color="red" />
        </LikeButton>
      ) : (
        <LikeButton onClick={() => setOpen(!open)}>
          <IoIosHeartEmpty size={35} />
        </LikeButton>
      )}

      <Dropdown open={open}>
        {favorites.length === 0 ? (
          <p>No favorites yet</p>
        ) : (
          favorites.map((product) => (
            <FavoriteItem key={product._id}>
              <img
                src={product.image ?? ""}
                alt={product.name ?? product._id}
              />
              <span>{product.name ?? product._id}</span>
              <button
                onClick={() => toggleFavorite(product._id)}
                disabled={isLoading}
              >
                remove
              </button>
            </FavoriteItem>
          ))
        )}
      </Dropdown>
    </Wrapper>
  );
};

export default FavoritesWidget;
