const fs = require('fs');
const path = require('path')

const LOG_FILE = path.join(__dirname,'error_log.jsonl');
const LOGS_DIR = path.join(__dirname,'logs');

if(!fs.existsSync(LOGS_DIR)){
    fs.mkdirSync(LOGS_DIR);
}

function rotateLogs(){
    const now = new Date();


const formatedDate = (date)=>{
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

const fileName = `logs_${formatedDate(now)}.jsonl`;
const destPath = path.join(LOGS_DIR,fileName);

fs.readFile(LOG_FILE,'utf8',(err,data)=>{
    if(err){
        if(err.code === 'ENOENT'){
            console.log('Log file dont created');
            return
        }
        console.log('Error logs read',err);
        return
    }

    if(!data.trim()){
        console.log('Log empty, nothing to save');
        return
    }

    const lines = data.trim().split('\n').map(line=>{
        try{
            const log = JSON.parse(line);
            return JSON.stringify({
                message: log.message,
                code: log.code || 500,
                time: log.time || Date.now()
            })
        } catch(err){
            console.log('Error line,skip',line);
            return null
        }
    }).filter(Boolean).join('\n') + '\n';

    fs.writeFile(destPath,lines,(err)=>{
        if(err){
            console.log('Error recording to archive log')
            return
        }
        console.log('Logs save');
    })

    fs.writeFile(LOG_FILE,'',(err)=>{
        if (err) console.log('Error clean error_log',err);
        else console.log('error_log clean');
    })
})
}

module.exports.RotationTimer = (hour = 23, minute = 59)=>{
    setInterval(()=>{
        const now = new Date();
        if(now.getHours() === hour && now.getMinutes() === minute){
            rotateLogs()
        }
    },60* 1000)
}