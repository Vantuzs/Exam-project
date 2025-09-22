import * as yup from 'yup'

export const createTaskValidateSchema = yup.object().shape({
    body: yup.string().trim().required().min(2, 'Task must be a 2 characters').max(50,'Не ломай мне вёрстку'),
    deadline: yup.date().min(new Date(),'Date must be a more current time').required(),
    triger: yup.date().min(new Date(),'Triger must be a more current time').when('deadline',(deadline,schema)=>{
        return deadline? schema.max(deadline,'triger mast be a less deadline time'): schema;
    }).required(),
    status: yup.string().trim().oneOf(['active','expired','done'], 'Status bad'),
})