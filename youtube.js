const fastify = require("fastify")();
const cheerio = require("cheerio");
const axios = require("axios");
const PORT = process.env.PORT || 5999;


fastify.listen({port : PORT}, () => console.log(`listen on port => ${PORT}`));


fastify.get("/:name/:season/:episode", async (req, res) => {
    const {name} = req.params;
    const {season} = req.params;
    const {episode} = req.params;

    try {
        const response = await axios.get(`https://wecimaa.lol/watch/مشاهدة-مسلسل-${name.split(" ").join("-")}-موسم-${season}-حلقة-${episode}/`);
        const data = await response.data;
        const $ = cheerio.load(data);

        const server = $("btn:first").attr("data-url");
        console.log(server);
        
        res.type("text/html").send(`<iframe src="${server}" allowfullscreen style="width:100%; height:100%; border-style:none;"></iframe>`);

    } catch (error) {
        
    }
})

