import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Grid,
	Input,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import mapboxgl from "../../libs/mapbox";
import { useLazyReverseQuery } from "../../services/geo";
import env from "../../configs/environment";

type Inputs = {
	example: string;
	name: string;
};

export default function TravelCreate() {
	const mapContainer = useRef<HTMLDivElement>(null);
	const map = useRef<mapboxgl.Map>();
	const [lng, setLng] = useState(107.57);
	const [lat, setLat] = useState(16.45);
	const [zoom, setZoom] = useState(12);
	const [travelIndex, setTravelIndex] = useState(0);
	const markers = useRef<Array<mapboxgl.Marker>>([]);
	const [reverse, result] = useLazyReverseQuery();
	console.log(result);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current as HTMLElement,
			style: "mapbox://styles/mapbox/streets-v12",
			center: [lng, lat],
			zoom: zoom,
		});
	}, [map, mapContainer, lng, lat, zoom]);

	useEffect(() => {
		if (!map.current) return;

		const makeMarker = (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
			if (!map.current) return;

			if (markers.current[travelIndex]) markers.current[travelIndex].remove();

			reverse(`/${e.lngLat.lng},${e.lngLat.lat}.json?access_token=${env.MAP_TOKEN}`);

			markers.current[travelIndex] = new mapboxgl.Marker()
				.setLngLat([e.lngLat.lng, e.lngLat.lat])
				.addTo(map.current);
		};

		map.current.on("click", makeMarker);

		return () => {
			if (!map.current) return;

			map.current.off("click", makeMarker);
		};
	}, [map, travelIndex]);

	return (
		<Grid p={4} templateColumns="repeat(2, 1fr)">
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormControl isInvalid={!!errors.example}>
					<FormLabel htmlFor="example">First example</FormLabel>
					<Input
						id="example"
						placeholder="example"
						{...register("example", {
							required: "This is required",
							minLength: { value: 4, message: "Minimum length should be 4" },
						})}
					/>
					<FormErrorMessage>{errors.example && errors.example.message}</FormErrorMessage>
				</FormControl>

				<FormControl isInvalid={!!errors.example}>
					<FormLabel htmlFor="name">First name</FormLabel>
					<Input
						id="name"
						placeholder="name"
						{...register("name", {
							required: "This is required",
							minLength: { value: 4, message: "Minimum length should be 4" },
						})}
					/>
					<FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
				</FormControl>

				<Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
					Submit
				</Button>
			</form>
			<Box position="relative">
				<div className="sidebar">
					Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
				</div>
				<Box ref={mapContainer} className="map-container" h="400px" />
			</Box>
		</Grid>
	);
}
