import React, { useState, useRef } from 'react';
import {
    MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents, useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix broken default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function makeIcon(color, text) {
    return L.divIcon({
        className: '',
        iconAnchor: [14, 32],
        popupAnchor: [0, -36],
        html: `<div style="
            background:${color};color:#fff;
            border:2.5px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);
            border-radius:50% 50% 50% 0;transform:rotate(-45deg);
            width:28px;height:28px;display:flex;align-items:center;justify-content:center;">
            <span style="transform:rotate(45deg);font-size:11px;font-weight:800;">${text}</span>
        </div>`,
    });
}

// Click handler — adds a point when user clicks on the map
function ClickHandler({ onMapClick }) {
    useMapEvents({ click: (e) => onMapClick(e.latlng) });
    return null;
}

// Fit all markers into view
function FitBounds({ points }) {
    const map = useMap();
    const prev = useRef('');
    const key = points.map(p => `${p.lat},${p.lng}`).join('|');
    if (key !== prev.current && points.length >= 2) {
        prev.current = key;
        map.fitBounds(L.latLngBounds(points.map(p => [p.lat, p.lng])), { padding: [40, 40] });
    }
    return null;
}

export default function MapPointsPicker({ points = [], onChange }) {
    const [editingIdx, setEditingIdx] = useState(null);
    const [editLabel, setEditLabel] = useState('');

    const handleMapClick = (latlng) => {
        const newPts = [...points, {
            lat: parseFloat(latlng.lat.toFixed(5)),
            lng: parseFloat(latlng.lng.toFixed(5)),
            label: `Stop ${points.length}`,
        }];
        onChange(newPts);
    };

    const handleDragEnd = (idx, e) => {
        const { lat, lng } = e.target.getLatLng();
        const updated = points.map((p, i) =>
            i === idx ? { ...p, lat: parseFloat(lat.toFixed(5)), lng: parseFloat(lng.toFixed(5)) } : p
        );
        onChange(updated);
    };

    const handleDelete = (idx) => {
        onChange(points.filter((_, i) => i !== idx));
        setEditingIdx(null);
    };

    const startEdit = (idx) => {
        setEditingIdx(idx);
        setEditLabel(points[idx].label || '');
    };

    const saveLabel = (idx) => {
        const updated = points.map((p, i) => i === idx ? { ...p, label: editLabel } : p);
        onChange(updated);
        setEditingIdx(null);
    };

    const positions = points.map(p => [p.lat, p.lng]);
    const center = points.length > 0
        ? [points.reduce((s, p) => s + p.lat, 0) / points.length,
           points.reduce((s, p) => s + p.lng, 0) / points.length]
        : [41.5, 75.0]; // default: Kyrgyzstan center

    return (
        <div>
            {/* Hint banner */}
            <div style={{
                background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '0.65rem',
                padding: '0.6rem 1rem', marginBottom: '0.75rem',
                fontSize: '0.8rem', color: '#92400e', fontWeight: 500,
                display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
                📍 <span><b>Click on the map</b> to add a waypoint. Drag markers to reposition. Click a marker to rename or delete it.</span>
            </div>

            {/* Map */}
            <div style={{ borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.1)', height: '360px', marginBottom: '0.85rem' }}>
                <MapContainer
                    center={center}
                    zoom={points.length === 0 ? 7 : 8}
                    style={{ width: '100%', height: '100%' }}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ClickHandler onMapClick={handleMapClick} />
                    <FitBounds points={points} />

                    {positions.length >= 2 && (
                        <Polyline
                            positions={positions}
                            pathOptions={{ color: '#1d4ed8', weight: 3, opacity: 0.75, dashArray: '8 4' }}
                        />
                    )}

                    {points.map((pt, i) => {
                        const isFirst = i === 0;
                        const isLast = i === points.length - 1;
                        const color = isFirst ? '#16a34a' : isLast ? '#dc2626' : '#2563eb';
                        const label = isFirst ? 'S' : isLast ? 'E' : String(i);
                        return (
                            <Marker
                                key={i}
                                position={[pt.lat, pt.lng]}
                                icon={makeIcon(color, label)}
                                draggable={true}
                                eventHandlers={{
                                    dragend: (e) => handleDragEnd(i, e),
                                    click: () => startEdit(i),
                                }}
                            >
                                <Popup>
                                    {editingIdx === i ? (
                                        <div style={{ minWidth: '180px' }}>
                                            <input
                                                autoFocus
                                                value={editLabel}
                                                onChange={e => setEditLabel(e.target.value)}
                                                onKeyDown={e => e.key === 'Enter' && saveLabel(i)}
                                                style={{ width: '100%', padding: '0.3rem 0.5rem', borderRadius: '0.4rem', border: '1px solid #d1d5db', fontSize: '0.85rem', fontFamily: 'inherit', marginBottom: '0.5rem', boxSizing: 'border-box' }}
                                            />
                                            <div style={{ display: 'flex', gap: '0.4rem' }}>
                                                <button
                                                    onClick={() => saveLabel(i)}
                                                    style={{ flex: 1, padding: '0.3rem', background: '#f97316', color: '#fff', border: 'none', borderRadius: '0.4rem', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'inherit' }}
                                                >Save</button>
                                                <button
                                                    onClick={() => handleDelete(i)}
                                                    style={{ padding: '0.3rem 0.5rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', borderRadius: '0.4rem', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'inherit' }}
                                                >✕</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ minWidth: '160px' }}>
                                            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem' }}>{pt.label || `Stop ${i}`}</div>
                                            <div style={{ color: '#6b7280', fontSize: '0.72rem', marginBottom: '0.5rem' }}>
                                                {pt.lat.toFixed(4)}, {pt.lng.toFixed(4)}
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.4rem' }}>
                                                <button
                                                    onClick={() => startEdit(i)}
                                                    style={{ flex: 1, padding: '0.3rem', background: '#f97316', color: '#fff', border: 'none', borderRadius: '0.4rem', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'inherit' }}
                                                >✏ Rename</button>
                                                <button
                                                    onClick={() => handleDelete(i)}
                                                    style={{ padding: '0.3rem 0.5rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', borderRadius: '0.4rem', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'inherit' }}
                                                >✕</button>
                                            </div>
                                        </div>
                                    )}
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </div>

            {/* Point list summary */}
            {points.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {points.map((pt, i) => {
                        const isFirst = i === 0;
                        const isLast = i === points.length - 1;
                        return (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: '0.6rem',
                                background: '#fafafa', borderRadius: '0.55rem',
                                padding: '0.4rem 0.75rem', fontSize: '0.78rem',
                                border: '1px solid #f3f4f6',
                            }}>
                                <span>{isFirst ? '🟢' : isLast ? '🔴' : '🔵'}</span>
                                <span style={{ flex: 1, fontWeight: 600 }}>{pt.label || `Stop ${i}`}</span>
                                <span style={{ color: '#9ca3af', fontFamily: 'monospace', fontSize: '0.7rem' }}>
                                    {pt.lat.toFixed(4)}, {pt.lng.toFixed(4)}
                                </span>
                                <button
                                    onClick={() => handleDelete(i)}
                                    style={{ background: 'none', border: 'none', color: '#d1d5db', cursor: 'pointer', padding: '0 0.2rem', fontSize: '0.9rem', lineHeight: 1 }}
                                >×</button>
                            </div>
                        );
                    })}
                </div>
            )}

            {points.length === 0 && (
                <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: '0.8rem', padding: '0.5rem' }}>
                    No waypoints yet — click anywhere on the map to start.
                </div>
            )}
        </div>
    );
}
