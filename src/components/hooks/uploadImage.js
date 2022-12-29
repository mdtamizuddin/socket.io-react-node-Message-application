

export const uploadImage = async (image, type) => {
    const file = image[0]
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch('http://localhost:5000/upload-temp', {
        method: "post",
        body: formData
    });
    const data = await res.json()
    return data
}

