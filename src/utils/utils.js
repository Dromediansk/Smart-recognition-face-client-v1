export const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true
}

export const envEndpoint = (url) => {
    if (process.env.NODE_ENV === 'development') {
        return url = 'http://localhost:3000/'
    }
    return url = 'https://guarded-reaches-10517.herokuapp.com/'
}