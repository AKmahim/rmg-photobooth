import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Preview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { imageData } = location.state || {}; // Access image data
    const imageDataUrl = "data:image/png;base64," + imageData?.image;
    
    useEffect(() => {
        const uploadImageDataUrl = async () => {
            if (imageDataUrl) {
                // Create a FormData object
                const formData = new FormData();
                formData.append("image", imageDataUrl); // Append the image data URL

                try {
                    // Send POST request to the API
                    const response = await fetch("https://photobooth.xri.com.bd/api/store-photo-dataurl", {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json'
                        },
                        body: formData,
                    });

                    // Parse and log the API response
                    if (response.ok) {
                        const result = await response.json();
                        const photoUrl = result?.photo_url;

                        // Redirect to "/qr-code" with a 10s delay, passing photoUrl as state
                        if (photoUrl) {
                            setTimeout(() => {
                                navigate('/qr-code', { state: { photoUrl } });
                            }, 10000); // 10-second delay
                        }
                    } else {
                        console.error("Error in API response:", response);
                    }
                } catch (error) {
                    console.error("Error uploading image data URL:", error);
                }
            }
        };

        uploadImageDataUrl();
    }, [imageDataUrl, navigate]);

    return (
        <div>
            {imageData ? (
                <img src={imageDataUrl} alt="Processed Image" />
            ) : (
                <p>No image data available</p>
            )}
        </div>
    );
};

export default Preview;
