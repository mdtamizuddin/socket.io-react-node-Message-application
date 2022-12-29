

const useupload = (file, mode) => {
    if (mode === "temp") {
        const formData = new FormData();
        formData.append('image', file);
        fetch('http://localhost:5000/upload-temp', {
            method: "post",
            body: formData
        }).then(res => res.json())
            .then(data => {
                return data
            })
    }
}

export default useupload