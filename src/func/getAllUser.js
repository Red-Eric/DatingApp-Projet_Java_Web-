export const GetAllUser = async ()=>{
    const response = await fetch("http://localhost:8080/api/user")
    if(!response.ok){
        return "no response"
    }
    return response.json().then()
}

export const getUserFromId = async (id) => {
    let users = await GetAllUser()
    return users.find(user => user.id === id)
}

export const getUsersWithoutId = async (id) => {
    let users = await GetAllUser()
    return users.filter(user => user.id !== id)
}

export const getMatchingUsersOppositeSex = async (id) => {
    let users = await GetAllUser()
    
    let currentUser = users.find(user => user.id === id)
    if (!currentUser) return []

    let filteredUsers = users.filter(user => user.id !== id && user.sexe !== currentUser.sexe && (user.sexe === "H" || user.sexe === "F"))

    const calculateScore = (user) => {
        let score = 0

        if (user.place === currentUser.place) score += 50

        let commonHobbies = user.hobby.filter(h => currentUser.hobby.includes(h)).length
        score += commonHobbies * 20

        let ageDiff = Math.abs(user.age - currentUser.age)
        score += Math.max(0, 30 - ageDiff)

        return score
    }

    return filteredUsers
        .map(user => ({ ...user, score: calculateScore(user) }))
        .sort((a, b) => b.score - a.score)
}

export const getMatchingUsersSameSex = async (id) => {
    let users = await GetAllUser()
    
    let currentUser = users.find(user => user.id === id)
    if (!currentUser) return []

    let filteredUsers = users.filter(user => user.id !== id && user.sexe === currentUser.sexe && (user.sexe === "H" || user.sexe === "F"))

    const calculateScore = (user) => {
        let score = 0

        if (user.place === currentUser.place) score += 50

        let commonHobbies = user.hobby.filter(h => currentUser.hobby.includes(h)).length
        score += commonHobbies * 20

        let ageDiff = Math.abs(user.age - currentUser.age)
        score += Math.max(0, 30 - ageDiff)

        return score
    }

    return filteredUsers
        .map(user => ({ ...user, score: calculateScore(user) }))
        .sort((a, b) => b.score - a.score)
}
