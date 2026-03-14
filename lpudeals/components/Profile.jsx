'use client'

import AppContext from "../app/context/AppContext"
import { useState, useEffect, useContext } from "react";
import axios from "axios";
function Profile() {
    const { user, isLoggedIn, logout, searchProduct, setSearchProduct, products } = useContext(AppContext);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        regid: user?.regid || '',
        phone: user?.phone || '',
        hostel: user?.hostel || ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const UpdateUser = async (e) => {
        e.preventDefault();
        try {
            // Since you're using JSON/Object state, you can send it directly
            const res = await axios.put('/api/auth/update', formData);
            console.log("Updated successfully:", res.data);
            // Hint: You should probably update your AppContext here too!
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    return (
        <>
            <div>
                <form onSubmit={UpdateUser}>

                    <input type="text" value={formData.name} onChange={handleChange} name='name' placeholder="Name" />
                    <input type="email" value={formData.email} onChange={handleChange} name="email" placeholder="Email" />
                    <input type="text" name="regid" id="regid" placeholder="Regid" value={formData.regid}
                        onChange={handleChange} />
                    <input type="number" name="phone" id="phone" placeholder="Phone" value={formData.phone}
                        onChange={handleChange} />
                    <input type="text" name="hostel" id="hostel" placeholder="Hostel" value={formData.hostel}
                        onChange={handleChange} />
                    <button type="submit">Update</button>
                    <button type="button" onClick={logout}>Logout</button>
                </form>
            </div>

        </>

    )
}

export default Profile;