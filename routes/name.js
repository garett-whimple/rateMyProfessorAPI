const express = require('express')
const router = express.Router()
const rmp_api = require('../rmp_api')

router.route('/')
    .get(nameReply)
    .post(nameReply)

async function nameReply(req, res) {
    const method = req.method;
    const firstName = method === 'GET' ? req.query.first : req.body.first
    const lastName = method === 'GET' ? req.query.last : req.body.last
    let data = await rmp_api.getProfessorData(`${firstName} ${lastName}`)
    console.log(data)
    // rmp_api.getProfessorData(`${firstName} ${lastName}`).then(
    //     (value) => {
    //         console.log(value)
    //         data = value
    //     },
    //     (reason) => {
    //         console.error(reason)
    //     }
    // )

    res.format({
        'appilication/json': () => {
            res.json({ 'avgRating': `${data.avgRating}`,
                'avgDifficulty': `${data.avgDifficulty}`,
                'numRatings': `${data.numRatings}`,
                'wouldTakeAgainPercent': `${data.wouldTakeAgainPercent}`})
        },

        'text/plain': () => {
            res.send(`avgRating: ${data.avgRating}, 'avgDifficulty: ${data.avgDifficulty}, 'numRatings: ${data.numRatings}, 'wouldTakeAgainPercent: ${data.wouldTakeAgainPercent}`)
        },

        'text/html': () => {
            let html = '<ul>'
            html += `<li>avgRating : ${data.avgRating}</li>`
            html += `<li>avgDifficulty : ${data.avgDifficulty}</li>`
            html += `<li>numRatings : ${data.numRatings}</li>`
            html += `<li>wouldTakeAgainPercent: ${data.wouldTakeAgainPercent}</li>`
            html += '</ul>'
            res.send(html)
        },

        'default': () => {
            res.status(406).send('Not Acceptable')
        }
    })
}

module.exports = router