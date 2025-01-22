import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';

const Oauth = () => {
   const dispatch = useDispatch();

    const handleGoogleClick = async () => {
      
        try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app)

        const result = await signInWithPopup(auth, provider)
        console.log(result)

        const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: result.user.displayName, email: result.user.email , phot: result.user.photoURL})
        })
        const data = await res.json();
        dispatch(signInSuccess(data))
        } catch (error) {
            console.log(error)
        }
        
    }

  return (
    <button onClick={handleGoogleClick} type='button' className=' uppercase bg-red-700 p-3 rounded-lg hover:opacity-95 text-white'>Continue With Google</button>
  )
}

export default Oauth