const API = import.meta.env.VITE_BASE_URL;
export default function buildImageUrl(url) {
	return API+url

}