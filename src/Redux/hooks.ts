import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Typed dispatch hook
export const useAppDispatch: () => AppDispatch = useDispatch;
// 🔧 Typed dispatch
// 📌 Ensures dispatched actions match Redux slice types

// Typed selector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// 🔧 Typed selector
// 📌 Gives TypeScript knowledge of the Redux state structure
