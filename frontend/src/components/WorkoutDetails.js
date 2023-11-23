import {useWorkoutsContext} from '../hooks/useWorkoutContext'

const WorkoutDetails = ({workout}) => {
    const { dispatch } = useWorkoutsContext()
    const handleClick = async () => {
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE-WORKOUT' , payload: json})
        }
            
    }

    return  (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg):</strong>{workout.load}</p>
            <p><strong>Reps :</strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
            <span onClick={handleClick}><img src='https://shorturl.at/fquJN' alt='Dustbin-Icon'></img></span>
        </div>
    )
}
export default WorkoutDetails;