const ratings = require('@mtucourses/rate-my-professors').default

exports.getProfessorData = async function getProfessorData(name) {
    const teacher = await ratings.searchTeacher(name, 'U2Nob29sLTEzNQ==')
    if (teacher.length === 0) {
        return {'response': 'No available data for that name'}
    }
    else {
        const teacherInfo = await ratings.getTeacher(teacher[0].id)
        return {avgRating: teacherInfo.avgRating, avgDifficulty: teacherInfo.avgDifficulty, numRatings: teacherInfo.numRatings, wouldTakeAgainPercent: teacherInfo.wouldTakeAgainPercent}
    }
}