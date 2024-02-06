import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import {SeekerService} from "../../services/SeekerService";
import {toast, Toaster} from "react-hot-toast";

import SeekerInterface from "../../interfaces/SeekerInterface";
import axios from "axios";

function SeekerEditForm({id}) {
    const [seeker, setSeeker] = useState<SeekerInterface>();
    const { register, handleSubmit } = useForm();
    const [image, setImage] = useState();

    useEffect(() => {
        const getOneSeeker = async () => {
            try {
                const response = await SeekerService.getOneSeeker(id);
                setSeeker(response);
                console.log(response);
            } catch (error) {
                toast.error('Error fetching seeker:', error);
            }
        };
        getOneSeeker();
    }, []);

    function handleUpload(e) {
        const selectedFile = e.target.files[0];
        setImage(selectedFile);
        console.log(selectedFile);
    }

    const onSubmit = async (data) => {
        try {
            if(image) {
                const proset_key = "z0vyrvps";
                const cloud_name = "dywclts4f";
               const formData = new FormData();
               formData.append('file', image);
                formData.append('upload_preset', proset_key);
                const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData);
                data.image= response.data.url;
                console.log(data);
            }
            await SeekerService.updateSeeker(id, data);
            console.log('Seeker updated successfully:', data);
        } catch (error) {
            console.error('Error updating seeker:', error);
            toast.error('Error updating seeker:', error.message);
        }
    };

    return (
        <>
            <Toaster position="bottom-left" reverseOrder={false}/>
        <form onSubmit={handleSubmit(onSubmit)}>
            <img src={seeker?.image}></img>
            <input
                placeholder="First Name"
                defaultValue={seeker?.firstName}
                {...register('firstName')}
            />
            <input
                placeholder="Last Name"
                defaultValue={seeker?.lastName}
                {...register('lastName')}
            />
            <input
                type="email"
                placeholder="Email"
                defaultValue={seeker?.email}
                {...register('email')}
            />
            <input
                type="tel"
                placeholder="Phone Number"
                defaultValue={seeker?.phoneNumber}
                {...register('phoneNumber')}
            />
            <input
                placeholder="City"
                defaultValue={seeker?.city}
                {...register('city')}
            />

            <select defaultValue={seeker?.gender} {...register('gender')}>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <label>
                Military Experience:
                <input
                    type="checkbox"
                    defaultChecked={seeker?.militaryExperience}
                    {...register('militaryExperience')}
                />
            </label>
            <label>
                Military Work:
                <input
                    type="checkbox"
                    defaultChecked={seeker?.militaryWork}
                    {...register('militaryWork')}
                />
            </label>
            <input
                placeholder="Telegram"
                defaultValue={seeker?.telegram}
                {...register('telegram')}
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
            />
            <button type="submit">Save Changes</button>
        </form>
            </>
    );
}

export default SeekerEditForm;
