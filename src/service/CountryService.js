const BASE_URL = import.meta.env.VITE_BASE_URL


async function getAllCountries () {
    try {
        const res = await fetch(BASE_URL)
        if(!res.ok) {
            throw new Error ('fetch emeliyyatinda xeta bas verdi');
        }
        const data = await res.json()
        return data
    }
    catch (err) {
        console.error(err.message)
    }
}

export {getAllCountries}