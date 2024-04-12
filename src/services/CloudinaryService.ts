import axios from "axios";

export class CloudinaryService{

    static async upload(file: File): Promise<string> {
        const proset_key = "z0vyrvps";
        const cloud_name = "dywclts4f";
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', proset_key);
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData);
        return response.data.url
    }
}

