import { useDispatch } from 'react-redux';
import { AppDispatch } from './'; // Adjust the import path as needed

// Create a typed version of the useDispatch hook
export const useAppDispatch: () => AppDispatch = useDispatch;
