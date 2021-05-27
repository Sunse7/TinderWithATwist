export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        //const base64 = reader.result.replace('data:image/jpeg;base64,', ''); 
        resolve(reader.result); 
    }
    reader.onerror = error => reject(error);
});