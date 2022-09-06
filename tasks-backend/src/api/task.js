const moment = require('moment');
const Tasks = require('../models/Tasks');



module.exports = (app) => {


    const getTasks = (req, res) => {
        
        const date = req.query.date || moment().endOf('day').toDate();

        Tasks
            .find({
                userId: req.user._id,
                estimatedAt: {$lt: date}
            })
            .sort({estimatedAt: 1})
        .then(
            (tasks) => {
                return res.status(200).send(tasks);
            }
        )
        .catch((err) => {
            return  res.status(500);
        })
      
    }

    const save = (req, res) => {

        const newTask = req.body;

        if(!newTask.desc.trim()){
            return res.status(400).send('Descrição é obirgatória')
        }

        newTask.userId = req.user._id;

        Tasks.create(newTask)
        .then( (task) => {
            res.status(201).send(task)
        })
        .catch( (_) => {
            res.status(500)
        })
        
    }

    const remove = (req, res) => {
        
        Tasks.deleteOne({_id: req.params.taskId, userId: req.user._id})
        .then((result) => {
            if(result.deletedCount){
                return res.status(200).send('Removido com Sucesso');
            }
            return res.status(404).send('Task não encontrada');

        })
        .catch(() => {
            res.status(500)
        })

    } 

    const update = (req, res) => {

        const update = req.body;
        if(!update.desc.trim() || !update.estimatedAt){
            return res.status(422).send('Dados incompletos')
        }


        const $set = {
            desc: update.desc,
            estimatedAt: update.estimatedAt
        }

        Tasks.findOneAndUpdate({_id: req.params.taskId, userId: req.user._id}, {$set},{ new: true })
        .then((task) => {
            return res.status(200).send(task);
        })
        .catch(() => {
            return res.status(500)
        })

    }

    const toggleTask = async (req, res) => {

        const task = await Tasks.findOne({_id: req.params.taskId, userId: req.user._id})
        .then((task) => {
            if(!task){
                res.status(404).send('Task não encontrada');
            }
            return task;
        })
        .catch( () => {
            res.status(500);
        })

        if(!task) return;

        const doneAt = task.doneAt ? null : new Date(); 
        setDoneAt(req, res, doneAt)
    } 

    const setDoneAt = (req, res, doneAt) => {
        

        Tasks.findOneAndUpdate({_id: req.params.taskId, userId: req.user._id}, {$set: {doneAt}}, {new: true})
        .then((task) => {
            return res.status(200).send(task);
        })
        .catch( () => {
            return res.status(500);
        })

    }

    return { getTasks, save, remove, update, toggleTask }

}
