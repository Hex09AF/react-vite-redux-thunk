import mapboxgl from "mapbox-gl";
import env from "../configs/environment";

mapboxgl.accessToken = env.MAP_TOKEN;

export default mapboxgl;
