import axios from 'axios';

export const getProfileInfo = async () => {
    try {
        return await axios.get('/my-profile/edit')
    } catch (e) {
        throw e;
    }
}
