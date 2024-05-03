import fs from "fs"
import path from "path"
const uDataFilepath = path.join(process.cwd(), "database", "users.json")
// const UserDBData = await fetch(uDataFilepath)


const addData = (req, res)=>{
    let uDatas = []
    fs.readFile(uDataFilepath, "utf-8", async (err, jsonData)=>{
        err ? res.send("Error reading file"):
        uDatas = await JSON.parse(jsonData)

        req.body = {id: uDatas[uDatas.length -1].id + 1, ...req.body}
        uDatas.push(req.body)
        uDatas = JSON.stringify(uDatas)

        fs.writeFile(uDataFilepath, uDatas, err => {
            err ? res.send("Error writing file") :
            res.send("SUCESS Saved data")
        })
    })
}




const getAllData = (req, res)=>{
    fs.readFile(uDataFilepath, "utf-8", async (err, jsonData)=>{
        err ? console.log("Error reading file"):
        res.send(await JSON.parse(jsonData))
    })
}



const getByIdData = async (req, res)=>{
    fs.readFile(uDataFilepath, "utf-8", (err, jsonData)=>{
        err ? res.send("Error reading file") : 0
        let uData = []
        let temp = 0
        uData = JSON.parse(jsonData)
        uData.forEach(user => {
            if(user.id == req.params.id)
                temp = user
        });
        if(!temp)
            res.send("Couldn't find")
        else
            res.send(temp)
    })
}


const updateByIdData =  (req, res)=>{
    fs.readFile(uDataFilepath, "utf-8", async (err, jsonData)=>{
        err ? res.send("Error reading file") : 0
        let uData = []
        let truth = false
        uData = await JSON.parse(jsonData)
        for(let i = 0; i < uData.length; i++)
            if(uData[i].id == req.params.id){
                uData[i].name = req.body.name || uData[i].age
                uData[i].lname = req.body.lname || uData[i].age
                uData[i].age = req.body.age || uData[i].age
                truth = true
            }
        truth ? fs.writeFile(uDataFilepath, JSON.stringify(uData), err=>{
            err ? res.send("Error writing data canceled.."):
            res.send("UPDATED")
        }):
        res.send("No such data exists")
    })
}

const deleteByIdData = (req, res)=>{
    fs.readFile(uDataFilepath, "utf-8", async (err, jsonData)=>{
        err ? res.send("Error reading file") : 0
        let uData = []
        let truth = false
        uData = await JSON.parse(jsonData)
        for(let i = 0; i < uData.length; i++)
            if(uData[i].id == req.params.id){
                truth = true
                uData.splice(i, 1)
            }
        truth ? fs.writeFile(uDataFilepath, JSON.stringify(uData), err=>{
            err ? res.send("Error. DELETING data canceled.."):
            res.send("DELETED")
        }):
        res.send("No such DATA exists")
    })
}

export {
    getAllData,
    addData,
    getByIdData,
    updateByIdData,
    deleteByIdData
}