// // client/src/components/LoginForm.jsx
// import React from 'react';

// const LoginForm = () => {
//     const handleGoogleLogin = () => {
//         // Redirect to the backend Google auth route
//         window.location.href = '/api/auth/google';
//     };

//     return (
//         <div className="flex justify-center items-center py-16">
//             <div className="bg-white p-10 rounded-lg shadow-lg text-center w-full max-w-sm">
//                 <h1 className="text-3xl font-bold mb-6">Login</h1>
//                 <p className="text-slate-600 mb-8">Please log in to use the calculator.</p>
//                 <button 
//                     onClick={handleGoogleLogin} 
//                     className="w-full flex items-center justify-center gap-3 bg-blue-500 text-white py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors"
//                 >
//                     <svg className="w-6 h-6" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.802 8.924C34.785 5.233 29.733 3 24 3C12.43 3 3 12.43 3 24s9.43 21 21 21s21-9.43 21-21c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691L12.748 19.019C14.657 12.534 18.961 8.223 24 8.223c3.059 0 5.842 1.154 7.961 3.039L38.802 8.924C34.785 5.233 29.733 3 24 3C16.318 3 9.656 6.915 6.306 14.691z"></path><path fill="#4CAF50" d="M24 45c5.733 0 10.785-1.927 14.802-5.198L31.961 34.961C29.842 36.846 27.059 38 24 38c-5.039 0-9.343-4.31-11.252-10.981L6.306 34.309C9.656 42.085 16.318 45 24 45z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.16-4.087 5.571L43.611 20.083z"></path></svg>
//                     Sign in with Google
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default LoginForm;




import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        // Store the intended redirect URL in sessionStorage
        sessionStorage.setItem('postLoginRedirect', '/');
        // Redirect to Google auth
        window.location.href = '/api/auth/google';
    };

    return (
        <div className="flex justify-center items-center py-16">
            <div className="bg-white p-10 rounded-lg shadow-lg text-center w-full max-w-sm">
                <h1 className="text-3xl font-bold mb-6">Login</h1>
                <p className="text-slate-600 mb-8">Please log in to use the calculator.</p>
                <button 
                    onClick={handleGoogleLogin} 
                    className="w-full flex items-center justify-center gap-3 bg-blue-500 text-white py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors"
                >
                    <svg className="w-6 h-6" viewBox="0 0 48 48">
                        {/* Google icon paths */}
                    </svg>
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default LoginForm;