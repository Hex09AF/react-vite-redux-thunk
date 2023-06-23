import { Flex, Text } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface PreviewFile extends File {
	preview: string;
}

export default function MyDropzone({ onChange }: { onChange: (files: File[]) => void }) {
	const [files, setFiles] = useState<PreviewFile[]>([]);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			console.log("acceptedFiles", acceptedFiles);
			setFiles(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);
			onChange(acceptedFiles);
		},
		[onChange]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: {
			"image/*": [],
		},
		onDrop,
		maxFiles: 1,
	});

	return (
		<>
			<Flex
				{...getRootProps()}
				width="sm"
				height="sm"
				border="dashed"
				borderColor="gray.200"
				borderRadius="md"
				padding="4"
				alignItems="center"
				justify="center"
			>
				<input {...getInputProps()} />
				{isDragActive ? (
					<Text>Drop the files here ...</Text>
				) : (
					<Text>Drag 'n' drop some files here, or click to select files</Text>
				)}
			</Flex>
			<aside style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 16 }}>
				{files.map((file) => (
					<div
						style={{
							display: "inline-flex",
							borderRadius: 2,
							border: "1px solid #eaeaea",
							marginBottom: 8,
							marginRight: 8,
							width: 100,
							height: 100,
							padding: 4,
							boxSizing: "border-box",
						}}
						key={file.name}
					>
						<div style={{ display: "flex", minWidth: 0, overflow: "hidden" }}>
							<img
								src={file.preview}
								style={{ display: "block", width: "auto", height: "100%" }}
								// Revoke data uri after image is loaded
								onLoad={() => {
									URL.revokeObjectURL(file.preview);
								}}
							/>
						</div>
					</div>
				))}
			</aside>
		</>
	);
}
