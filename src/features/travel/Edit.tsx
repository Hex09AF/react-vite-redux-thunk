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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import mapboxgl from "../../libs/mapbox";
import { useLazyReverseQuery } from "../../services/geo";
import env from "../../configs/environment";
import MyDropzone from "../../components/Dropzone";
import {
	CreateRequest,
	Travel,
	useCreateTravelMutation,
	useGetDetailTravelQuery,
	useUpdateTravelMutation,
} from "../../services/travel";
import { toastError } from "../../helpers/errorHandling";
import { useParams } from "react-router-dom";

type Inputs = {
	title: string;
	content: string;
	file: File;
};

export default function TravelEdit() {
	const { travelId } = useParams();
	const { data } = useGetDetailTravelQuery(travelId as string);

	const mapContainer = useRef<HTMLDivElement>(null);
	const map = useRef<mapboxgl.Map>();
	const [lng, setLng] = useState(107.57);
	const [lat, setLat] = useState(16.45);
	const [zoom, setZoom] = useState(12);
	const [travelIndex, setTravelIndex] = useState(0);
	const markers = useRef<Array<mapboxgl.Marker>>([]);
	const [reverse, result] = useLazyReverseQuery();
	const [update] = useUpdateTravelMutation();

	const {
		register,
		handleSubmit,
		setValue,
		control,
		formState: { errors, isSubmitting },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		try {
			const filterData: Partial<CreateRequest> &
				Record<string, CreateRequest[keyof CreateRequest]> = {};
			for (const [key, value] of Object.entries(data)) {
				if (value) filterData[key] = value;
			}
			await update({ id: travelId as string, data: filterData }).unwrap();
		} catch (err) {
			toastError(err);
		}
	};

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
	}, [map, travelIndex, reverse]);

	useEffect(() => {
		if (data) {
			setValue("title", data.title);
			setValue("content", data.content || "");
		}
	}, [data, setValue]);

	return (
		<Grid p={4} templateColumns="repeat(2, 1fr)">
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormControl isInvalid={!!errors.title} mb="4">
					<FormLabel htmlFor="title">Title</FormLabel>
					<Input
						id="title"
						placeholder="title"
						{...register("title", {
							required: "This is required",
							minLength: { value: 4, message: "Minimum length should be 4" },
						})}
					/>
					<FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
				</FormControl>

				<FormControl isInvalid={!!errors.title} mb="4">
					<FormLabel htmlFor="content">Content</FormLabel>
					<Input
						id="content"
						placeholder="content"
						{...register("content", {
							required: "This is required",
							minLength: { value: 4, message: "Minimum length should be 4" },
						})}
					/>
					<FormErrorMessage>{errors.content && errors.content.message}</FormErrorMessage>
				</FormControl>

				<FormControl>
					<FormLabel htmlFor="file">Gallary</FormLabel>
					<Controller
						render={({ field }) => <MyDropzone onChange={(files) => field.onChange(files?.[0])} />}
						name="file"
						control={control}
					/>
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
