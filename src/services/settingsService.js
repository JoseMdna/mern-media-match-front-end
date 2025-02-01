const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users/`

export const showSettings = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/settings`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    const savedSettings = await res.json()
    if (savedSettings.err) {
        throw new Error(savedSettings.err)
    }
    return savedSettings
  } catch (err) {
    console.log(err)
  }
}

export const updateSettings = async (userId, settings) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/settings`, {
        method: 'PUT',
        headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
    })

    if (res.err) {
        throw new Error(res.err)
    }
    return res.json()    
  } catch (err) {
    console.log(err)
  }
}

export const createSettings = async (userId, settings) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/settings`, {
        method: 'POST',
        headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
    })
    return res.json()    
  } catch (err) {
    console.log(err)
  }
}