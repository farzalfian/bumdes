import React, { useEffect, useRef } from 'react'; 
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';

interface MapProps {
  lng?: number;
  lat?: number;
  zoom?: number;
  height?: string;
}

const Map: React.FC<MapProps> = ({ 
  lng = 0, 
  lat = 0, 
  zoom = 0,
  height = '400px'
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    const myAPIKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
    if (!myAPIKey) {
      console.error('Geoapify API key is missing');
      return;
    }

    const mapStyle = 'https://maps.geoapify.com/v1/styles/osm-carto/style.json';

    if (map.current) return; 
    if (!mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `${mapStyle}?apiKey=${myAPIKey}`,
      center: [lng, lat],
      zoom: zoom
    });
    map.current.addControl(new maplibregl.NavigationControl());

    new maplibregl.Marker().setLngLat([lng, lat]).addTo(map.current);

    // Cleanup saat komponen unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [lng, lat, zoom]);

  return (
    <div 
      ref={mapContainer} 
      className="w-full rounded-lg shadow-md" 
      style={{ 
        height: height 
      }} 
    />
  );
};

export default Map;