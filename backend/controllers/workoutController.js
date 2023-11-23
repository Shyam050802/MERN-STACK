const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

const getWorkouts = async (req,res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}
const getWorkout = async (req,res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'No such workout found'})
    }
    const workout = await Workout.findById(id)
    if(!workout){
        return res.status(400).json({error : 'No such workout found'})
    }
    res.status(200).json(workout)
}

const createWorkout = async (req,res) => {
    const {title , reps, load} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    try{
        const workout = await Workout.create({title, reps, load})
        res.status(200).json(workout)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

const deleteWorkout = async (req,res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'No such workout found'})
    }
    const workout = await Workout.findOneAndDelete({_id: id})
    if(!workout){
        return res.status(400).json({error : 'No such workout found'})
    }
    res.status(200).json(workout)
}

const updateWorkout = async (req,res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'No such workout found'})
    }
    const workout = await Workout.findOneAndUpdate({_id: id},{
        ...req.body
    })
    if(!workout){
        return res.status(400).json({error : 'No such workout found'})
    }
    res.status(200).json(workout)
}

module.exports = {
    getWorkout,
    getWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout
}