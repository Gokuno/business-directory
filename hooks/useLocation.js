// hooks/useLocation.js
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const useLocation = () => {
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                // Request permissions
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    setLoading(false);
                    return;
                }

                // Get current position
                let location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High
                });
                setLocation(location);

                // Get address from coordinates (reverse geocoding)
                let [address] = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                });

                if (address) {
                    setAddress(address);
                }
            } catch (error) {
                setErrorMsg('Error getting location: ' + error.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // Function to update location
    const updateLocation = async () => {
        try {
            setLoading(true);
            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High
            });
            setLocation(location);

            let [address] = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });

            if (address) {
                setAddress(address);
            }
        } catch (error) {
            setErrorMsg('Error updating location: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        location,
        address,
        errorMsg,
        loading,
        updateLocation
    };
};