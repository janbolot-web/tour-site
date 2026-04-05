import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const TourStoreContext = createContext(null);

export const TourStoreProvider = ({ children }) => {
    const [adminTours, setAdminTours] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch and listen to tours from Firestore
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'adminTours'), (snapshot) => {
            const tours = [];
            snapshot.forEach((doc) => {
                tours.push({ id: doc.id, ...doc.data() });
            });
            setAdminTours(tours);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching tours from Firebase:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const allTours = [...adminTours];

    const addTour = useCallback(async (tour) => {
        try {
            // Use tour.id as the document ID so URLs match the slug
            await setDoc(doc(db, 'adminTours', tour.id), tour);
        } catch (error) {
            console.error("Error adding tour to Firebase:", error);
            alert("Failed to save tour. See console for details.");
        }
    }, []);

    const updateTour = useCallback(async (id, updatedData) => {
        try {
            await updateDoc(doc(db, 'adminTours', id), updatedData);
        } catch (error) {
            console.error("Error updating tour in Firebase:", error);
            alert("Failed to update tour. See console for details.");
        }
    }, []);

    const deleteTour = useCallback(async (id) => {
        try {
            await deleteDoc(doc(db, 'adminTours', id));
        } catch (error) {
            console.error("Error deleting tour from Firebase:", error);
            alert("Failed to delete tour. See console for details.");
        }
    }, []);

    return (
        <TourStoreContext.Provider value={{ allTours, adminTours, addTour, deleteTour, updateTour, loading }}>
            {children}
        </TourStoreContext.Provider>
    );
};

export const useTours = () => {
    const ctx = useContext(TourStoreContext);
    if (!ctx) throw new Error('useTours must be used inside TourStoreProvider');
    return ctx;
};
