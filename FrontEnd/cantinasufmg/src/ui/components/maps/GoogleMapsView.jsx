import React from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { getAPI_KEY } from '../../../api/googleMapsService';

export const GoogleMapsView = ({ zoom = 16, markers = [] }) => {
    const apiKey = getAPI_KEY();

    return (
        <APIProvider apiKey={apiKey}>
            <Map
                defaultZoom={zoom}
                defaultCenter={{ lat: -19.87062, lng: -43.96675 }}
                disableDefaultUI={true}
                clickableIcons={false}
                style={{ width: '100%', height: '100%' }}
            >
                {markers.map((marker, index) => (
                    <Marker key={index} position={marker} />
                ))}
            </Map>
        </APIProvider>
    );
};
