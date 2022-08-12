const request = require("request")
const fs = require("fs");

const access_key = "c07d5421-cd1e-4143-82e1-702b144cf648"
const languageCode = "korean";
const dir = "../result"
let data = ""


const buildRequest = (data) => {
    return {
        'access_key': access_key,
        'argument': {
            'text' : data,
            'analysis_code' : 'morp'
        }
    };
}
const openApiURL = "http://aiopen.etri.re.kr:8000/WiseNLU_spoken"


const file_list = fs.readdirSync("../result");
let result = []

const getFile = (element) => {
    let file = fs.readFileSync(dir + "/"+ element, "utf-8");

    let requestJson = buildRequest(file);
    let options = {
        url: openApiURL,
        body: JSON.stringify(requestJson),
        headers: {'Content-Type':'application/json; charset=UTF-8'}
    }

    request.post(options, (error, response, body) => {
        const json_res = JSON.parse(body);
        console.log(response)
        result.push(json_res.return_object.sentence[0].word)
    })
}


file_list.map((element) => {
    setTimeout(getFile, 1500, element)
})

console.log(JSON.stringify(result));


/*

*/
