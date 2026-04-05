import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Snowflake, CloudLightning, Wind, Loader, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// WMO weather codes to icons and descriptions
const WEATHER_STYLES = {
    0: { icon: Sun, color: '#f59e0b', bg: '#fffbeb', text: 'Clear' },
    1: { icon: Sun, color: '#f59e0b', bg: '#fffbeb', text: 'Mostly Clear' },
    2: { icon: Cloud, color: '#6b7280', bg: '#f3f4f6', text: 'Partly Cloudy' },
    3: { icon: Cloud, color: '#6b7280', bg: '#f3f4f6', text: 'Overcast' },
    45: { icon: Wind, color: '#6b7280', bg: '#f3f4f6', text: 'Fog' },
    48: { icon: Wind, color: '#6b7280', bg: '#f3f4f6', text: 'Rime Fog' },
    51: { icon: CloudRain, color: '#3b82f6', bg: '#eff6ff', text: 'Light Drizzle' },
    53: { icon: CloudRain, color: '#3b82f6', bg: '#eff6ff', text: 'Drizzle' },
    55: { icon: CloudRain, color: '#3b82f6', bg: '#eff6ff', text: 'Heavy Drizzle' },
    61: { icon: CloudRain, color: '#3b82f6', bg: '#eff6ff', text: 'Light Rain' },
    63: { icon: CloudRain, color: '#3b82f6', bg: '#eff6ff', text: 'Rain' },
    65: { icon: CloudRain, color: '#3b82f6', bg: '#eff6ff', text: 'Heavy Rain' },
    71: { icon: Snowflake, color: '#0ea5e9', bg: '#f0f9ff', text: 'Light Snow' },
    73: { icon: Snowflake, color: '#0ea5e9', bg: '#f0f9ff', text: 'Snow' },
    75: { icon: Snowflake, color: '#0ea5e9', bg: '#f0f9ff', text: 'Heavy Snow' },
    77: { icon: Snowflake, color: '#0ea5e9', bg: '#f0f9ff', text: 'Snow Grains' },
    80: { icon: CloudRain, color: '#3b82f6', bg: '#eff6ff', text: 'Showers' },
    81: { icon: CloudRain, color: '#3b82f6', bg: '#eff6ff', text: 'Heavy Showers' },
    82: { icon: CloudRain, color: '#3b82f6', bg: '#eff6ff', text: 'Violent Showers' },
    85: { icon: Snowflake, color: '#0ea5e9', bg: '#f0f9ff', text: 'Snow Showers' },
    86: { icon: Snowflake, color: '#0ea5e9', bg: '#f0f9ff', text: 'Heavy Snow Showers' },
    95: { icon: CloudLightning, color: '#8b5cf6', bg: '#f5f3ff', text: 'Thunderstorm' },
    96: { icon: CloudLightning, color: '#8b5cf6', bg: '#f5f3ff', text: 'Thunderstorm (Hail)' },
    99: { icon: CloudLightning, color: '#8b5cf6', bg: '#f5f3ff', text: 'Thunderstorm (Heavy Hail)' },
    default: { icon: Cloud, color: '#9ca3af', bg: '#f9fafb', text: 'Unknown' }
};

export default function TourWeather({ mapPoints = [], isMobile }) {
    if (!mapPoints || mapPoints.length === 0) return null;

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const scrollRef = React.useRef(null);

    const currentLocation = mapPoints[selectedIndex];

    useEffect(() => {
        let isMounted = true;
        
        async function fetchWeather() {
            setLoading(true);
            setError(null);
            try {
                // Free, no API key required
                const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${currentLocation.lat}&longitude=${currentLocation.lng}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`);
                
                if (!res.ok) throw new Error('Failed to load weather');
                
                const data = await res.json();
                
                if (isMounted) {
                    setForecast(data.daily);
                }
            } catch (err) {
                if (isMounted) setError(err.message);
            } finally {
                if (isMounted) setLoading(false);
            }
        }
        
        fetchWeather();
        
        return () => { isMounted = false; };
    }, [currentLocation]);

    const handleScroll = (dir) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' });
        }
    };

    return (
        <div style={{ marginTop: isMobile ? '2rem' : '3rem', paddingTop: isMobile ? '1.5rem' : '2.5rem', borderTop: '2px solid hsl(215 30% 90%)' }}>
            <h2 style={{ fontSize: isMobile ? '1.2rem' : '1.5rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                ⛅ 7-Day Weather Forecast
            </h2>

            {/* Location Selector (if multiple points) */}
            {mapPoints.length > 1 && (
                <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1rem', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                    {mapPoints.map((pt, i) => (
                        <button
                            key={i}
                            onClick={() => setSelectedIndex(i)}
                            style={{
                                flexShrink: 0,
                                padding: '0.4rem 0.8rem',
                                borderRadius: '999px',
                                border: `1.5px solid ${i === selectedIndex ? 'var(--primary)' : '#e5e7eb'}`,
                                background: i === selectedIndex ? 'var(--primary)' : '#fff',
                                color: i === selectedIndex ? '#fff' : '#6b7280',
                                fontWeight: i === selectedIndex ? 700 : 500,
                                fontSize: '0.8rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.3rem'
                            }}
                        >
                            <MapPin size={12} /> {pt.label || `Stop ${i+1}`}
                        </button>
                    ))}
                </div>
            )}

            {/* Weather Content */}
            <div style={{ background: '#fafafa', borderRadius: '1rem', border: '1px solid #f3f4f6', padding: isMobile ? '1rem' : '1.25rem', position: 'relative' }}>
                
                {loading && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '140px', color: '#9ca3af' }}>
                        <Loader size={24} className="animate-spin" style={{ marginBottom: '0.5rem' }} />
                        <span style={{ fontSize: '0.85rem' }}>Fetching satellite data...</span>
                    </div>
                )}

                {error && !loading && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '140px', color: '#ef4444', fontSize: '0.85rem' }}>
                        Failed to load forecast data.
                    </div>
                )}

                {!loading && !error && forecast && (
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        
                        {!isMobile && (
                            <button onClick={() => handleScroll(-1)} style={{ position: 'absolute', left: '-0.8rem', zIndex: 10, background: '#fff', border: '1px solid #e5e7eb', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                <ChevronLeft size={16} color="#6b7280" />
                            </button>
                        )}

                        <div ref={scrollRef} style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none', padding: '0.5rem 0' }}>
                            {forecast.time.map((dateStr, i) => {
                                const code = forecast.weather_code[i];
                                const max = Math.round(forecast.temperature_2m_max[i]);
                                const min = Math.round(forecast.temperature_2m_min[i]);
                                const style = WEATHER_STYLES[code] || WEATHER_STYLES.default;
                                const Icon = style.icon;
                                
                                const dateObj = new Date(dateStr);
                                const isToday = i === 0;
                                const dayName = isToday ? 'Today' : dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                                const dateNum = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

                                return (
                                    <div key={dateStr} style={{ 
                                        flexShrink: 0, 
                                        width: '100px', 
                                        background: isToday ? style.bg : '#fff', 
                                        border: `1px solid ${isToday ? style.color : '#e5e7eb'}`, 
                                        borderRadius: '0.85rem', 
                                        padding: '0.85rem 0.5rem', 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        boxShadow: isToday ? `0 4px 12px ${style.color}20` : '0 2px 4px rgba(0,0,0,0.02)',
                                        transition: 'transform 0.2s',
                                        cursor: 'default'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        <div style={{ fontSize: '0.7rem', fontWeight: 800, color: isToday ? style.color : '#6b7280', textTransform: 'uppercase' }}>
                                            {dayName}
                                        </div>
                                        <div style={{ fontSize: '0.65rem', color: '#9ca3af', marginBottom: '0.5rem' }}>
                                            {dateNum}
                                        </div>
                                        
                                        <Icon size={26} color={style.color} strokeWidth={2.5} style={{ marginBottom: '0.6rem' }} />
                                        
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.85rem' }}>
                                            <span style={{ color: '#1f2937' }}>{max}°</span>
                                            <span style={{ color: '#9ca3af', fontSize: '0.75rem', fontWeight: 500 }}>{min}°</span>
                                        </div>
                                        <div style={{ fontSize: '0.6rem', color: '#6b7280', marginTop: '0.3rem', textAlign: 'center', lineHeight: 1.2 }}>
                                            {style.text}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {!isMobile && (
                            <button onClick={() => handleScroll(1)} style={{ position: 'absolute', right: '-0.8rem', zIndex: 10, background: '#fff', border: '1px solid #e5e7eb', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                <ChevronRight size={16} color="#6b7280" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
