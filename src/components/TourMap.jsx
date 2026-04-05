import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon broken by bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom icons
function makeIcon(color, label) {
    return L.divIcon({
        className: '',
        iconAnchor: [14, 32],
        popupAnchor: [0, -34],
        html: `
            <div style="
                background:${color};
                color:#fff;
                border:2.5px solid #fff;
                border-radius:50% 50% 50% 0;
                transform:rotate(-45deg);
                width:28px;height:28px;
                box-shadow:0 2px 10px rgba(0,0,0,0.3);
                display:flex;align-items:center;justify-content:center;
            ">
                <span style="transform:rotate(45deg);font-size:11px;font-weight:800;">${label}</span>
            </div>`,
    });
}

// Fit map bounds to all points
function FitBounds({ points }) {
    const map = useMap();
    useEffect(() => {
        if (points.length >= 2) {
            const bounds = L.latLngBounds(points.map(p => [p.lat, p.lng]));
            map.fitBounds(bounds, { padding: [40, 40] });
        } else if (points.length === 1) {
            map.setView([points[0].lat, points[0].lng], 10);
        }
    }, [points, map]);
    return null;
}

export default function TourMap({ mapPoints = [], isMobile }) {
    if (!mapPoints || mapPoints.length === 0) return null;

    const positions = mapPoints.map(p => [p.lat, p.lng]);
    const center = [
        mapPoints.reduce((s, p) => s + p.lat, 0) / mapPoints.length,
        mapPoints.reduce((s, p) => s + p.lng, 0) / mapPoints.length,
    ];

    const primaryColor = 'hsl(215 70% 35%)'; // matches --primary

    return (
        <div style={{ marginTop: isMobile ? '2rem' : '3rem', paddingTop: isMobile ? '1.5rem' : '2.5rem', borderTop: '2px solid hsl(215 30% 90%)' }}>
            <h2 style={{ fontSize: isMobile ? '1.2rem' : '1.5rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.4rem' }}>
                🗺 Tour Route
            </h2>
            <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1rem' }}>
                {mapPoints.length} stop{mapPoints.length !== 1 ? 's' : ''} on this tour
            </p>

            {/* Stop legend */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                {mapPoints.map((p, i) => (
                    <span key={i} style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                        background: i === 0 ? '#dcfce7' : i === mapPoints.length - 1 ? '#fee2e2' : '#eff6ff',
                        color: i === 0 ? '#15803d' : i === mapPoints.length - 1 ? '#b91c1c' : '#1d4ed8',
                        padding: '0.25rem 0.75rem', borderRadius: '999px',
                        fontSize: '0.75rem', fontWeight: 700,
                    }}>
                        <span>{i === 0 ? '🟢' : i === mapPoints.length - 1 ? '🔴' : '🔵'}</span>
                        {p.label}
                    </span>
                ))}
            </div>

            <div style={{ borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.12)', height: isMobile ? '280px' : '400px' }}>
                <MapContainer
                    center={center}
                    zoom={7}
                    style={{ width: '100%', height: '100%' }}
                    scrollWheelZoom={false}
                    zoomControl={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <FitBounds points={mapPoints} />

                    {/* Route line */}
                    <Polyline
                        positions={positions}
                        pathOptions={{ color: primaryColor, weight: 3, opacity: 0.8, dashArray: '8 4' }}
                    />

                    {/* Markers */}
                    {mapPoints.map((p, i) => {
                        const isFirst = i === 0;
                        const isLast = i === mapPoints.length - 1;
                        const color = isFirst ? '#16a34a' : isLast ? '#dc2626' : '#2563eb';
                        const label = isFirst ? 'S' : isLast ? 'E' : String(i);
                        return (
                            <Marker key={i} position={[p.lat, p.lng]} icon={makeIcon(color, label)}>
                                <Popup>
                                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{p.label}</div>
                                    <div style={{ color: '#6b7280', fontSize: '0.75rem', marginTop: '0.2rem' }}>
                                        {isFirst ? '🟢 Start' : isLast ? '🔴 End' : `📍 Stop ${i}`}
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </div>
        </div>
    );
}
