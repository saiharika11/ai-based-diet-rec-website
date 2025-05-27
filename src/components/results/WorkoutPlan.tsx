import React from 'react';
import { FormData, FitnessGoal } from '../../contexts/FormContext';
import { Clock, Calendar, AlertCircle, Dumbbell } from 'lucide-react';

interface WorkoutPlanProps {
  formData: FormData;
  workoutFrequency: number;
  workoutDuration: number;
}

interface Exercise {
  name: string;
  sets?: number;
  reps?: string;
  duration?: string;
  description: string;
}

interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

const WorkoutPlan: React.FC<WorkoutPlanProps> = ({ formData, workoutFrequency, workoutDuration }) => {
  const generateWorkoutPlan = (): WorkoutDay[] => {
    const { fitnessGoals, activityLevel, gender } = formData;
    let workoutPlan: WorkoutDay[] = [];
    
    // Helper function to determine intensity based on activity level
    const getIntensity = () => {
      switch (activityLevel) {
        case 'sedentary': return 'Low';
        case 'light': return 'Low to Moderate';
        case 'moderate': return 'Moderate';
        case 'active': return 'Moderate to High';
        case 'very_active': return 'High';
        default: return 'Moderate';
      }
    };
    
    const intensity = getIntensity();
    
    // Different plans based on primary fitness goal
    if (fitnessGoals.includes('weight_loss')) {
      if (workoutFrequency <= 3) {
        // 2-3 day full body focus for weight loss
        workoutPlan = [
          {
            day: 'Day 1',
            focus: 'Full Body + Cardio',
            exercises: [
              { name: 'Bodyweight Squats', sets: 3, reps: '12-15', description: 'Stand with feet shoulder-width apart, lower down as if sitting in a chair, then stand back up.' },
              { name: 'Push-ups (or Modified Push-ups)', sets: 3, reps: '8-12', description: 'Start in plank position, lower chest to floor, then push back up. Modify by doing on knees if needed.' },
              { name: 'Walking Lunges', sets: 3, reps: '10 each leg', description: 'Step forward into a lunge, then bring the back leg forward and repeat with the other leg.' },
              { name: 'Plank', sets: 3, duration: '30-45 sec', description: 'Hold a forearm or hand plank position, keeping body straight and core engaged.' },
              { name: 'High Intensity Interval Training', duration: '15-20 min', description: '30 seconds intense work (jumping jacks, mountain climbers, high knees) followed by 30 seconds rest, repeated.' }
            ]
          },
          {
            day: 'Day 2',
            focus: 'Rest or Active Recovery',
            exercises: [
              { name: 'Light Walking', duration: '30-45 min', description: 'Casual walking at a comfortable pace.' },
              { name: 'Stretching Routine', duration: '15-20 min', description: 'Full body stretching focusing on major muscle groups.' }
            ]
          },
          {
            day: 'Day 3',
            focus: 'Cardio + Core',
            exercises: [
              { name: 'Cardio (Walking, Jogging, Cycling)', duration: '20-30 min', description: 'Moderate intensity steady-state cardio.' },
              { name: 'Mountain Climbers', sets: 3, reps: '20 total', description: 'Start in plank position, alternate bringing knees toward chest in a running motion.' },
              { name: 'Russian Twists', sets: 3, reps: '12-15 each side', description: 'Sit with knees bent, lean back slightly, twist torso side to side.' },
              { name: 'Bicycle Crunches', sets: 3, reps: '12-15 each side', description: 'Lie on back, alternate bringing elbow to opposite knee while extending other leg.' },
              { name: 'Plank Shoulder Taps', sets: 3, reps: '10 each arm', description: 'In plank position, tap opposite shoulder with hand while maintaining stability.' }
            ]
          }
        ];
      } else if (workoutFrequency <= 5) {
        // 4-5 day split for weight loss
        workoutPlan = [
          {
            day: 'Day 1',
            focus: 'Lower Body + HIIT',
            exercises: [
              { name: 'Bodyweight Squats', sets: 3, reps: '15-20', description: 'Stand with feet shoulder-width apart, lower down as if sitting in a chair, then stand back up.' },
              { name: 'Walking Lunges', sets: 3, reps: '12 each leg', description: 'Step forward into a lunge, then bring the back leg forward and repeat with the other leg.' },
              { name: 'Glute Bridges', sets: 3, reps: '15-20', description: 'Lie on back with knees bent, lift hips toward ceiling, squeeze glutes at top.' },
              { name: 'Calf Raises', sets: 3, reps: '20', description: 'Stand with feet hip-width apart, raise heels off ground, then lower.' },
              { name: 'HIIT Intervals', duration: '15 min', description: '30 seconds work, 30 seconds rest of jumping jacks, burpees, and high knees.' }
            ]
          },
          {
            day: 'Day 2',
            focus: 'Upper Body + Core',
            exercises: [
              { name: 'Push-ups (or Modified Push-ups)', sets: 3, reps: '10-12', description: 'Start in plank position, lower chest to floor, then push back up. Modify by doing on knees if needed.' },
              { name: 'Tricep Dips', sets: 3, reps: '12-15', description: 'Using a chair or bench, lower body by bending elbows, then push back up.' },
              { name: 'Plank', sets: 3, duration: '45-60 sec', description: 'Hold a forearm or hand plank position, keeping body straight and core engaged.' },
              { name: 'Bicycle Crunches', sets: 3, reps: '15 each side', description: 'Lie on back, alternate bringing elbow to opposite knee while extending other leg.' },
              { name: 'Supermans', sets: 3, reps: '12-15', description: 'Lie face down, simultaneously lift arms and legs off ground, hold briefly, then lower.' }
            ]
          },
          {
            day: 'Day 3',
            focus: 'Cardio',
            exercises: [
              { name: 'Brisk Walking/Jogging', duration: '30-40 min', description: 'Maintain a pace where you can talk but not sing.' },
              { name: 'Stretching Routine', duration: '10-15 min', description: 'Full body stretching focusing on major muscle groups.' }
            ]
          },
          {
            day: 'Day 4',
            focus: 'Full Body Circuit',
            exercises: [
              { name: 'Circuit Training (repeat 3-4 times)', duration: '25-30 min', description: 'Perform each exercise for 45 seconds with 15 seconds rest between exercises.' },
              { name: 'Jumping Jacks', description: 'Start with feet together and arms at sides, jump to position with legs apart and arms overhead, then return to starting position.' },
              { name: 'Bodyweight Squats', description: 'Stand with feet shoulder-width apart, lower down as if sitting in a chair, then stand back up.' },
              { name: 'Push-ups', description: 'Start in plank position, lower chest to floor, then push back up. Modify as needed.' },
              { name: 'Mountain Climbers', description: 'Start in plank position, alternate bringing knees toward chest in a running motion.' },
              { name: 'Plank', description: 'Hold a forearm or hand plank position, keeping body straight and core engaged.' }
            ]
          },
          {
            day: 'Day 5',
            focus: 'Active Recovery',
            exercises: [
              { name: 'Light Cardio (Walking, Swimming)', duration: '30 min', description: 'Low intensity movement to promote recovery.' },
              { name: 'Yoga or Stretching', duration: '20-30 min', description: 'Gentle yoga flow or deep stretching focusing on tight areas.' }
            ]
          }
        ];
      } else {
        // 6-7 day plan for weight loss
        workoutPlan = [
          {
            day: 'Day 1',
            focus: 'Lower Body Strength',
            exercises: [
              { name: 'Bodyweight Squats', sets: 4, reps: '15-20', description: 'Stand with feet shoulder-width apart, lower down as if sitting in a chair, then stand back up.' },
              { name: 'Reverse Lunges', sets: 3, reps: '12 each leg', description: 'Step backward into a lunge, then return to standing and repeat with the other leg.' },
              { name: 'Glute Bridges', sets: 3, reps: '15-20', description: 'Lie on back with knees bent, lift hips toward ceiling, squeeze glutes at top.' },
              { name: 'Side Lunges', sets: 3, reps: '12 each side', description: 'Step to the side into a lateral lunge, keeping the other leg straight, then return to center.' },
              { name: 'Calf Raises', sets: 3, reps: '20', description: 'Stand with feet hip-width apart, raise heels off ground, then lower.' }
            ]
          },
          {
            day: 'Day 2',
            focus: 'Upper Body Strength',
            exercises: [
              { name: 'Push-ups', sets: 4, reps: '10-15', description: 'Start in plank position, lower chest to floor, then push back up. Modify as needed.' },
              { name: 'Tricep Dips', sets: 3, reps: '12-15', description: 'Using a chair or bench, lower body by bending elbows, then push back up.' },
              { name: 'Plank Up-Downs', sets: 3, reps: '10 each arm', description: 'Start in forearm plank, push up to hand plank one arm at a time, then return to forearm plank.' },
              { name: 'Arm Circles', sets: 3, duration: '30 sec each direction', description: 'Extend arms out to sides and make small circles, then reverse direction.' },
              { name: 'Wall Push-ups', sets: 3, reps: '15', description: 'Perform push-ups against a wall to reduce resistance and focus on form.' }
            ]
          },
          {
            day: 'Day 3',
            focus: 'HIIT Cardio',
            exercises: [
              { name: 'HIIT Circuit (repeat 4-5 times)', duration: '25-30 min', description: '40 seconds work, 20 seconds rest for each exercise.' },
              { name: 'Jumping Jacks', description: 'Start with feet together and arms at sides, jump to position with legs apart and arms overhead, then return to starting position.' },
              { name: 'High Knees', description: 'Run in place, bringing knees up to hip level.' },
              { name: 'Burpees', description: 'From standing, drop to a squat, kick feet back to plank, return to squat, then jump up. Modify as needed.' },
              { name: 'Mountain Climbers', description: 'Start in plank position, alternate bringing knees toward chest in a running motion.' },
              { name: 'Skater Jumps', description: 'Jump side to side, landing on one foot and reaching the other foot behind, mimicking a speed skater.' }
            ]
          },
          {
            day: 'Day 4',
            focus: 'Core Focus',
            exercises: [
              { name: 'Plank', sets: 3, duration: '45-60 sec', description: 'Hold a forearm or hand plank position, keeping body straight and core engaged.' },
              { name: 'Russian Twists', sets: 3, reps: '15 each side', description: 'Sit with knees bent, lean back slightly, twist torso side to side.' },
              { name: 'Bicycle Crunches', sets: 3, reps: '15 each side', description: 'Lie on back, alternate bringing elbow to opposite knee while extending other leg.' },
              { name: 'Dead Bugs', sets: 3, reps: '10 each side', description: 'Lie on back with arms extended up and legs in tabletop position, lower opposite arm and leg while maintaining core stability.' },
              { name: 'Plank Shoulder Taps', sets: 3, reps: '12 each arm', description: 'In plank position, tap opposite shoulder with hand while maintaining stability.' }
            ]
          },
          {
            day: 'Day 5',
            focus: 'Steady State Cardio',
            exercises: [
              { name: 'Brisk Walking, Jogging, or Cycling', duration: '40-45 min', description: 'Maintain a moderate pace where you can talk but feel challenged.' },
              { name: 'Cool Down', duration: '10 min', description: 'Gradually reduce intensity followed by full body stretching.' }
            ]
          },
          {
            day: 'Day 6',
            focus: 'Full Body Circuit',
            exercises: [
              { name: 'Circuit Training (repeat 3-4 times)', duration: '30 min', description: 'Perform each exercise for 45 seconds with 15 seconds rest between exercises.' },
              { name: 'Squat to Overhead Reach', description: 'Perform a squat, then reach arms overhead as you stand.' },
              { name: 'Push-ups', description: 'Start in plank position, lower chest to floor, then push back up. Modify as needed.' },
              { name: 'Walking Lunges', description: 'Step forward into a lunge, then bring the back leg forward and repeat with the other leg.' },
              { name: 'Plank with Alternating Leg Lift', description: 'In plank position, lift one leg off the ground, hold briefly, lower, and repeat with other leg.' },
              { name: 'Jumping Jacks', description: 'Start with feet together and arms at sides, jump to position with legs apart and arms overhead, then return to starting position.' }
            ]
          },
          {
            day: 'Day 7',
            focus: 'Active Recovery',
            exercises: [
              { name: 'Light Walking', duration: '30 min', description: 'Casual walking at a comfortable pace.' },
              { name: 'Yoga or Deep Stretching', duration: '20-30 min', description: 'Gentle yoga flow or deep stretching focusing on tight areas and recovery.' }
            ]
          }
        ];
      }
    } else if (fitnessGoals.includes('muscle_gain')) {
      if (workoutFrequency <= 3) {
        // 3 day full body split for muscle gain
        workoutPlan = [
          {
            day: 'Day 1',
            focus: 'Full Body Strength A',
            exercises: [
              { name: 'Push-ups', sets: 4, reps: '10-12', description: 'Start in plank position, lower chest to floor, then push back up. Modify as needed.' },
              { name: 'Bodyweight Squats', sets: 4, reps: '15-20', description: 'Stand with feet shoulder-width apart, lower down as if sitting in a chair, then stand back up.' },
              { name: 'Inverted Rows', sets: 3, reps: '10-12', description: 'Using a sturdy table or bar at waist height, hang underneath and pull chest toward the bar.' },
              { name: 'Glute Bridges', sets: 3, reps: '15-20', description: 'Lie on back with knees bent, lift hips toward ceiling, squeeze glutes at top.' },
              { name: 'Plank', sets: 3, duration: '45-60 sec', description: 'Hold a forearm or hand plank position, keeping body straight and core engaged.' }
            ]
          },
          {
            day: 'Day 2',
            focus: 'Rest or Active Recovery',
            exercises: [
              { name: 'Light Walking', duration: '30 min', description: 'Casual walking at a comfortable pace.' },
              { name: 'Mobility Work', duration: '15-20 min', description: 'Joint mobility exercises focusing on shoulders, hips, and ankles.' }
            ]
          },
          {
            day: 'Day 3',
            focus: 'Full Body Strength B',
            exercises: [
              { name: 'Walking Lunges', sets: 4, reps: '10 each leg', description: 'Step forward into a lunge, then bring the back leg forward and repeat with the other leg.' },
              { name: 'Tricep Dips', sets: 3, reps: '12-15', description: 'Using a chair or bench, lower body by bending elbows, then push back up.' },
              { name: 'Superman Holds', sets: 3, duration: '30 sec', description: 'Lie face down, simultaneously lift arms and legs off ground, hold, then lower.' },
              { name: 'Side Planks', sets: 3, duration: '30 sec each side', description: 'Support body on forearm and side of foot, keeping body in straight line from head to feet.' },
              { name: 'Calf Raises', sets: 4, reps: '20', description: 'Stand with feet hip-width apart, raise heels off ground, then lower.' }
            ]
          }
        ];
      } else if (workoutFrequency <= 5) {
        // 4-5 day split for muscle gain
        workoutPlan = [
          {
            day: 'Day 1',
            focus: 'Push (Chest, Shoulders, Triceps)',
            exercises: [
              { name: 'Push-ups (Various Hand Positions)', sets: 4, reps: '10-15', description: 'Perform push-ups with hands at different widths to target different parts of the chest and shoulders.' },
              { name: 'Pike Push-ups', sets: 3, reps: '8-12', description: 'Form an inverted V with body, head pointing down, then bend elbows to lower head toward ground and push back up.' },
              { name: 'Tricep Dips', sets: 3, reps: '10-15', description: 'Using a chair or bench, lower body by bending elbows, then push back up.' },
              { name: 'Plank to Push-up', sets: 3, reps: '6-10', description: 'Start in forearm plank, push up to hand plank, then return to forearm plank.' },
              { name: 'Arm Circles', sets: 2, duration: '30 sec each direction', description: 'Extend arms out to sides and make circles, then reverse direction.' }
            ]
          },
          {
            day: 'Day 2',
            focus: 'Pull (Back, Biceps)',
            exercises: [
              { name: 'Inverted Rows', sets: 4, reps: '8-12', description: 'Using a sturdy table or bar at waist height, hang underneath and pull chest toward the bar.' },
              { name: 'Superman Pulls', sets: 3, reps: '12-15', description: 'Lie face down with arms extended, pull elbows back as if rowing while lifting chest.' },
              { name: 'Doorway Curls', sets: 3, reps: '10-15', description: 'Using resistance band or towel in doorway, perform bicep curls.' },
              { name: 'Reverse Snow Angels', sets: 3, reps: '12', description: 'Lie face down, arms at sides, simultaneously raise arms and legs off ground in snow angel motion.' },
              { name: 'Scapular Retractions', sets: 3, reps: '15', description: 'Stand or sit tall, pull shoulder blades together and down, hold briefly, then release.' }
            ]
          },
          {
            day: 'Day 3',
            focus: 'Legs',
            exercises: [
              { name: 'Bodyweight Squats', sets: 4, reps: '15-20', description: 'Stand with feet shoulder-width apart, lower down as if sitting in a chair, then stand back up.' },
              { name: 'Walking Lunges', sets: 3, reps: '12 each leg', description: 'Step forward into a lunge, then bring the back leg forward and repeat with the other leg.' },
              { name: 'Bulgarian Split Squats', sets: 3, reps: '10 each leg', description: 'With back foot elevated on bench or chair, lower into a lunge, then push back up.' },
              { name: 'Glute Bridges', sets: 4, reps: '15-20', description: 'Lie on back with knees bent, lift hips toward ceiling, squeeze glutes at top.' },
              { name: 'Calf Raises', sets: 4, reps: '20', description: 'Stand with feet hip-width apart, raise heels off ground, then lower.' }
            ]
          },
          {
            day: 'Day 4',
            focus: 'Core and Mobility',
            exercises: [
              { name: 'Plank Variations', sets: 3, duration: '45-60 sec each', description: 'Perform standard plank, side planks, and plank with leg lifts.' },
              { name: 'Russian Twists', sets: 3, reps: '15 each side', description: 'Sit with knees bent, lean back slightly, twist torso side to side.' },
              { name: 'Bicycle Crunches', sets: 3, reps: '15 each side', description: 'Lie on back, alternate bringing elbow to opposite knee while extending other leg.' },
              { name: 'Bird Dogs', sets: 3, reps: '10 each side', description: 'On hands and knees, simultaneously extend opposite arm and leg, maintain balance, then switch sides.' },
              { name: 'Full Body Mobility Routine', duration: '15 min', description: 'Joint mobility exercises focusing on all major joints.' }
            ]
          },
          {
            day: 'Day 5',
            focus: 'Full Body',
            exercises: [
              { name: 'Circuit Training (repeat 3-4 times)', duration: '30 min', description: 'Perform each exercise for 45 seconds with 15 seconds rest between exercises.' },
              { name: 'Push-ups', description: 'Start in plank position, lower chest to floor, then push back up. Modify as needed.' },
              { name: 'Bodyweight Squats', description: 'Stand with feet shoulder-width apart, lower down as if sitting in a chair, then stand back up.' },
              { name: 'Superman Holds', description: 'Lie face down, simultaneously lift arms and legs off ground, hold, then lower.' },
              { name: 'Mountain Climbers', description: 'Start in plank position, alternate bringing knees toward chest in a running motion.' },
              { name: 'Jumping Jacks', description: 'Start with feet together and arms at sides, jump to position with legs apart and arms overhead, then return to starting position.' }
            ]
          }
        ];
      } else {
        // 6 day PPL split for muscle gain
        workoutPlan = [
          {
            day: 'Day 1',
            focus: 'Push A (Chest Emphasis)',
            exercises: [
              { name: 'Push-ups (Various Hand Positions)', sets: 4, reps: '10-15', description: 'Perform push-ups with hands at different widths to target different parts of the chest and shoulders.' },
              { name: 'Decline Push-ups', sets: 3, reps: '10-12', description: 'Place feet on elevated surface, perform push-ups with upper body lower than feet.' },
              { name: 'Tricep Dips', sets: 4, reps: '10-15', description: 'Using a chair or bench, lower body by bending elbows, then push back up.' },
              { name: 'Shoulder Taps', sets: 3, reps: '12 each side', description: 'In plank position, tap opposite shoulder with hand while maintaining stability.' },
              { name: 'Diamond Push-ups', sets: 3, reps: '8-12', description: 'Perform push-ups with hands close together forming a diamond shape, elbows close to body.' }
            ]
          },
          {
            day: 'Day 2',
            focus: 'Pull A (Back Emphasis)',
            exercises: [
              { name: 'Inverted Rows', sets: 4, reps: '10-12', description: 'Using a sturdy table or bar at waist height, hang underneath and pull chest toward the bar.' },
              { name: 'Superman Pulls', sets: 3, reps: '15', description: 'Lie face down with arms extended, pull elbows back as if rowing while lifting chest.' },
              { name: 'Doorway Curls', sets: 3, reps: '12-15', description: 'Using resistance band or towel in doorway, perform bicep curls.' },
              { name: 'Band Pull-Aparts', sets: 3, reps: '15-20', description: 'Hold resistance band with arms extended, pull band apart by moving arms outward.' },
              { name: 'Scapular Retractions', sets: 3, reps: '15', description: 'Stand or sit tall, pull shoulder blades together and down, hold briefly, then release.' }
            ]
          },
          {
            day: 'Day 3',
            focus: 'Legs A (Quad Emphasis)',
            exercises: [
              { name: 'Bodyweight Squats', sets: 4, reps: '20', description: 'Stand with feet shoulder-width apart, lower down as if sitting in a chair, then stand back up.' },
              { name: 'Walking Lunges', sets: 4, reps: '12 each leg', description: 'Step forward into a lunge, then bring the back leg forward and repeat with the other leg.' },
              { name: 'Bulgarian Split Squats', sets: 3, reps: '10-12 each leg', description: 'With back foot elevated on bench or chair, lower into a lunge, then push back up.' },
              { name: 'Step-ups', sets: 3, reps: '12 each leg', description: 'Step up onto a sturdy elevated surface, then step back down and repeat.' },
              { name: 'Wall Sit', sets: 3, duration: '45-60 sec', description: 'Lean against wall with legs bent at 90 degrees, hold position.' }
            ]
          },
          {
            day: 'Day 4',
            focus: 'Push B (Shoulder Emphasis)',
            exercises: [
              { name: 'Pike Push-ups', sets: 4, reps: '8-12', description: 'Form an inverted V with body, head pointing down, then bend elbows to lower head toward ground and push back up.' },
              { name: 'Incline Push-ups', sets: 3, reps: '12-15', description: 'Place hands on elevated surface, perform push-ups with upper body higher than feet.' },
              { name: 'Lateral Raises with Household Items', sets: 3, reps: '12-15', description: 'Hold light objects (water bottles, books) and raise arms out to sides.' },
              { name: 'Plank to Push-up', sets: 3, reps: '8-10', description: 'Start in forearm plank, push up to hand plank, then return to forearm plank.' },
              { name: 'Arm Circles', sets: 2, duration: '40 sec each direction', description: 'Extend arms out to sides and make circles, then reverse direction.' }
            ]
          },
          {
            day: 'Day 5',
            focus: 'Pull B (Bicep Emphasis)',
            exercises: [
              { name: 'Chin-up Holds (or Assisted Chin-ups)', sets: 4, duration: '20-30 sec', description: 'Hang from bar with palms facing you, hold position or pull up if possible.' },
              { name: 'Inverted Rows (Close Grip)', sets: 3, reps: '10-12', description: 'Perform inverted rows with hands closer together to emphasize biceps.' },
              { name: 'Isometric Bicep Holds', sets: 3, duration: '30 sec', description: 'Hold heavy object with elbows bent at 90 degrees.' },
              { name: 'Reverse Snow Angels', sets: 3, reps: '15', description: 'Lie face down, arms at sides, simultaneously raise arms and legs off ground in snow angel motion.' },
              { name: 'Band/Towel Hammer Curls', sets: 3, reps: '12 each arm', description: 'Using resistance band or towel, perform curls with palms facing each other.' }
            ]
          },
          {
            day: 'Day 6',
            focus: 'Legs B (Hamstring/Glute Emphasis)',
            exercises: [
              { name: 'Glute Bridges', sets: 4, reps: '20', description: 'Lie on back with knees bent, lift hips toward ceiling, squeeze glutes at top.' },
              { name: 'Single-Leg Glute Bridges', sets: 3, reps: '12 each leg', description: 'Perform glute bridge with one leg extended, focusing on the working leg.' },
              { name: 'Reverse Lunges', sets: 4, reps: '12 each leg', description: 'Step backward into a lunge, then return to standing and repeat with the other leg.' },
              { name: 'Calf Raises', sets: 4, reps: '25', description: 'Stand with feet hip-width apart, raise heels off ground, then lower.' },
              { name: 'Good Mornings', sets: 3, reps: '15', description: 'Stand with hands behind head, hinge at hips keeping back flat, then return to standing.' }
            ]
          },
          {
            day: 'Day 7',
            focus: 'Rest and Recovery',
            exercises: [
              { name: 'Light Walking', duration: '30 min', description: 'Casual walking at a comfortable pace.' },
              { name: 'Full Body Stretching', duration: '20-30 min', description: 'Deep stretching focusing on all major muscle groups.' },
              { name: 'Foam Rolling (if available)', duration: '15 min', description: 'Self-myofascial release for tight muscles.' }
            ]
          }
        ];
      }
    } else if (fitnessGoals.includes('endurance')) {
      if (workoutFrequency <= 3) {
        // 3 day endurance focus
        workoutPlan = [
          {
            day: 'Day 1',
            focus: 'Cardio Endurance',
            exercises: [
              { name: 'Steady State Cardio (Walking, Jogging, Cycling)', duration: '30-40 min', description: 'Maintain a moderate pace where you can talk but feel challenged.' },
              { name: 'Active Recovery', duration: '5-10 min', description: 'Light movement and stretching to cool down.' }
            ]
          },
          {
            day: 'Day 2',
            focus: 'Strength and Core',
            exercises: [
              { name: 'Circuit (repeat 3 times)', duration: '25-30 min', description: '45 seconds work, 15 seconds rest for each exercise.' },
              { name: 'Bodyweight Squats', description: 'Stand with feet shoulder-width apart, lower down as if sitting in a chair, then stand back up.' },
              { name: 'Push-ups (or Modified Push-ups)', description: 'Start in plank position, lower chest to floor, then push back up. Modify by doing on knees if needed.' },
              { name: 'Plank', description: 'Hold a forearm or hand plank position, keeping body straight and core engaged.' },
              { name: 'Bicycle Crunches', description: 'Lie on back, alternate bringing elbow to opposite knee while extending other leg.' },
              { name: 'Glute Bridges', description: 'Lie on back with knees bent, lift hips toward ceiling, squeeze glutes at top.' }
            ]
          },
          {
            day: 'Day 3',
            focus: 'Interval Training',
            exercises: [
              { name: 'Warm-up', duration: '5-10 min', description: 'Light cardio and dynamic stretching.' },
              { name: 'Interval Training', duration: '20-25 min', description: '1 minute high intensity followed by 2 minutes low intensity, repeated 7-8 times.' },
              { name: 'Cool Down', duration: '5-10 min', description: 'Gradually reduce intensity followed by stretching.' }
            ]
          }
        ];
      } else if (workoutFrequency <= 5) {
        // 4-5 day endurance plan
        workoutPlan = [
          {
            day: 'Day 1',
            focus: 'Long Steady State Cardio',
            exercises: [
              { name: 'Warm-up', duration: '5-10 min', description: 'Light cardio and dynamic stretching.' },
              { name: 'Steady State Cardio (Walking, Jogging, Cycling)', duration: '40-50 min', description: 'Maintain a moderate pace where you can talk but feel challenged.' },
              { name: 'Cool Down', duration: '5-10 min', description: 'Gradually reduce intensity followed by stretching.' }
            ]
          },
          {
            day: 'Day 2',
            focus: 'Strength and Core',
            exercises: [
              { name: 'Full Body Circuit (repeat 3 times)', duration: '30 min', description: '45 seconds work, 15 seconds rest for each exercise.' },
              { name: 'Bodyweight Squats', description: 'Stand with feet shoulder-width apart, lower down as if sitting in a chair, then stand back up.' },
              { name: 'Push-ups', description: 'Start in plank position, lower chest to floor, then push back up. Modify as needed.' },
              { name: 'Walking Lunges', description: 'Step forward into a lunge, then bring the back leg forward and repeat with the other leg.' },
              { name: 'Inverted Rows or Band Pulls', description: 'Using a sturdy table or resistance band, pull toward body to work upper back.' },
              { name: 'Plank Variations', description: 'Standard plank, side planks, and plank with leg lifts.' }
            ]
          },
          {
            day: 'Day 3',
            focus: 'Interval Training',
            exercises: [
              { name: 'Warm-up', duration: '5-10 min', description: 'Light cardio and dynamic stretching.' },
              { name: 'HIIT Workout', duration: '25 min', description: '30 seconds high intensity, 90 seconds low intensity, repeated 10 times.' },
              { name: 'Cool Down', duration: '5-10 min', description: 'Gradually reduce intensity followed by stretching.' }
            ]
          },
          {
            day: 'Day 4',
            focus: 'Active Recovery',
            exercises: [
              { name: 'Light Cardio', duration: '20-30 min', description: 'Very light walking, swimming, or cycling.' },
              { name: 'Mobility Work', duration: '15-20 min', description: 'Dynamic stretching and joint mobility exercises.' },
              { name: 'Foam Rolling (if available)', duration: '10-15 min', description: 'Self-myofascial release for tight muscles.' }
            ]
          },
          {
            day: 'Day 5',
            focus: 'Tempo Training',
            exercises: [
              { name: 'Warm-up', duration: '5-10 min', description: 'Light cardio and dynamic stretching.' },
              { name: 'Tempo Training', duration: '30-35 min', description: '5 minutes moderate pace, 3 minutes slightly faster pace, repeated 4 times.' },
              { name: 'Cool Down', duration: '5-10 min', description: 'Gradually reduce intensity followed by stretching.' }
            ]
          }
        ];
      } else {
        // 6-7 day endurance plan
        workoutPlan = [
          {
            day: 'Day 1',
            focus: 'Long Steady State Cardio',
            exercises: [
              { name: 'Warm-up', duration: '5-10 min', description: 'Light cardio and dynamic stretching.' },
              { name: 'Steady State Cardio (Walking, Jogging, Cycling)', duration: '45-60 min', description: 'Maintain a moderate pace where you can talk but feel challenged.' },
              { name: 'Cool Down', duration: '5-10 min', description: 'Gradually reduce intensity followed by stretching.' }
            ]
          },
          {
            day: 'Day 2',
            focus: 'Upper Body and Core Strength',
            exercises: [
              { name: 'Circuit (repeat 3 times)', duration: '30 min', description: '45 seconds work, 15 seconds rest for each exercise.' },
              { name: 'Push-ups', description: 'Start in plank position, lower chest to floor, then push back up. Modify as needed.' },
              { name: 'Tricep Dips', description: 'Using a chair or bench, lower body by bending elbows, then push back up.' },
              { name: 'Inverted Rows', description: 'Using a sturdy table or bar at waist height, hang underneath and pull chest toward the bar.' },
              { name: 'Plank', description: 'Hold a forearm or hand plank position, keeping body straight and core engaged.' },
              { name: 'Bicycle Crunches', description: 'Lie on back, alternate bringing elbow to opposite knee while extending other leg.' }
            ]
          },
          {
            day: 'Day 3',
            focus: 'Interval Training',
            exercises: [
              { name: 'Warm-up', duration: '5-10 min', description: 'Light cardio and dynamic stretching.' },
              { name: 'HIIT Workout', duration: '25-30 min', description: '30 seconds high intensity, 90 seconds low intensity, repeated 10-12 times.' },
              { name: 'Cool Down', duration: '5-10 min', description: 'Gradually reduce intensity followed by stretching.' }
            ]
          },
          {
            day: 'Day 4',
            focus: 'Lower Body Strength',
            exercises: [
              { name: 'Circuit (repeat 3 times)', duration: '30 min', description: '45 seconds work, 15 seconds rest for each exercise.' },
              { name: 'Bodyweight Squats', description: 'Stand with feet shoulder-width apart, lower down as if sitting in a chair, then stand back up.' },
              { name: 'Walking Lunges', description: 'Step forward into a lunge, then bring the back leg forward and repeat with the other leg.' },
              { name: 'Glute Bridges', description: 'Lie on back with knees bent, lift hips toward ceiling, squeeze glutes at top.' },
              { name: 'Calf Raises', description: 'Stand with feet hip-width apart, raise heels off ground, then lower.' },
              { name: 'Wall Sit', description: 'Lean against wall with legs bent at 90 degrees, hold position.' }
            ]
          },
          {
            day: 'Day 5',
            focus: 'Tempo Training',
            exercises: [
              { name: 'Warm-up', duration: '5-10 min', description: 'Light cardio and dynamic stretching.' },
              { name: 'Tempo Training', duration: '35-40 min', description: '5 minutes moderate pace, 3 minutes slightly faster pace, repeated 5 times.' },
              { name: 'Cool Down', duration: '5-10 min', description: 'Gradually reduce intensity followed by stretching.' }
            ]
          },
          {
            day: 'Day 6',
            focus: 'Fartlek Training',
            exercises: [
              { name: 'Warm-up', duration: '5-10 min', description: 'Light cardio and dynamic stretching.' },
              { name: 'Fartlek Training', duration: '30-40 min', description: 'Alternating between fast and slow paces at random intervals, based on landmarks or time.' },
              { name: 'Cool Down', duration: '5-10 min', description: 'Gradually reduce intensity followed by stretching.' }
            ]
          },
          {
            day: 'Day 7',
            focus: 'Active Recovery',
            exercises: [
              { name: 'Light Cardio', duration: '20-30 min', description: 'Very light walking, swimming, or cycling.' },
              { name: 'Yoga or Stretching', duration: '20-30 min', description: 'Gentle yoga flow or deep stretching focusing on all major muscle groups.' },
              { name: 'Foam Rolling (if available)', duration: '10-15 min', description: 'Self-myofascial release for tight muscles.' }
            ]
          }
        ];
      }
    } else {
      // General fitness
      if (workoutFrequency <= 3) {
        // 2-3 day general fitness
        workoutPlan = [
          {
            day: 'Day 1',
            focus: 'Full Body Strength',
            exercises: [
              { name: 'Circuit (repeat 3 times)', duration: '30 min', description: '45 seconds work, 15 seconds rest for each exercise.' },
              { name: 'Bodyweight Squats', description: 'Stand with feet shoulder-width apart, lower down as if sitting in a chair, then stand back up.' },
              { name: 'Push-ups (or Modified Push-ups)', description: 'Start in plank position, lower chest to floor, then push back up. Modify by doing on knees if needed.' },
              { name: 'Walking Lunges', description: 'Step forward into a lunge, then bring the back leg forward and repeat with the other leg.' },
              { name: 'Plank', description: 'Hold a forearm or hand plank position, keeping body straight and core engaged.' },
              { name: 'Glute Bridges', description: 'Lie on back with knees bent, lift hips toward ceiling, squeeze glutes at top.' }
            ]
          },
          {
            day: 'Day 2',
            focus: 'Cardio and Core',
            exercises: [
              { name: 'Cardio (Walking, Jogging, Cycling)', duration: '20-30 min', description: 'Maintain a moderate pace where you can talk but feel challenged.' },
              { name: 'Core Circuit (repeat 3 times)', duration: '15 min', description: '30 seconds work, 15 seconds rest for each exercise.' },
              { name: 'Plank', description: 'Hold a forearm or hand plank position, keeping body straight and core engaged.' },
              { name: 'Bicycle Crunches', description: 'Lie on back, alternate bringing elbow to opposite knee while extending other leg.' },
              { name: 'Russian Twists', description: 'Sit with knees bent, lean back slightly, twist torso side to side.' },
              { name: 'Bird Dogs', description: 'On hands and knees, simultaneously extend opposite arm and leg, maintain balance, then switch sides.' }
            ]
          },
          {
            day: 'Day 3',
            focus: 'Active Recovery or Interval Training',
            exercises: [
              { name: 'Warm-up', duration: '5-10 min', description: 'Light cardio and dynamic stretching.' },
              { name: 'Choose One:', description: 'Either active recovery or interval training depending on energy levels and preference.' },
              { name: 'Option A: Active Recovery', duration: '30-40 min', description: 'Light walking and full body stretching.' },
              { name: 'Option B: Interval Training', duration: '20-25 min', description: '30 seconds high intensity, 90 seconds low intensity, repeated 8 times.' },
              { name: 'Cool Down', duration: '5-10 min', description: 'Gradually reduce intensity followed by stretching.' }
            ]
          }
        ];
      } else if (workoutFrequency <= 5) {
        // 4-5 day general fitness
        workoutPlan = [
          {
            day: 'Day 1',
            focus: 'Upper Body Strength',
            exercises: [
              { name: 'Circuit (repeat 3 times)', duration: '30 min', description: '45 seconds work, 15 seconds rest for each exercise.' },
              { name: 'Push-ups', description: 'Start in plank position, lower chest to floor, then push back up. Modify as needed.' },
              { name: 'Tricep Dips', description: 'Using a chair or bench, lower body by bending elbows, then push back up.' },
              { name: 'Inverted Rows', description: 'Using a sturdy table or bar at waist height, hang underneath and pull chest toward the bar.' },
              { name: 'Pike Push-ups', description: 'Form an inverted V with body, head pointing down, then bend elbows to lower head toward ground and push back up.' },
              { name: 'Plank Shoulder Taps', description: 'In plank position, tap opposite shoulder with hand while maintaining stability.' }
            ]
          },
          {
            day: 'Day 2',
            focus: 'Cardio',
            exercises: [
              { name: 'Warm-up', duration: '5-10 min', description: 'Light cardio and dynamic stretching.' },
              { name: 'Cardio Option (choose one)', duration: '30-40 min', description: 'Either steady state cardio at moderate intensity or interval training.' },
              { name: 'Option A: Steady State', description: 'Walking, jogging, or cycling at a consistent moderate pace.' },
              { name: 'Option B: Intervals', description: '1 minute high intensity followed by 2 minutes low intensity, repeated 10 times.' },
              { name: 'Cool Down', duration: '5-10 min', description: 'Gradually reduce intensity followed by stretching.' }
            ]
          },
          {
            day: 'Day 3',
            focus: 'Lower Body Strength',
            exercises: [
              { name: 'Circuit (repeat 3 times)', duration: '30 min', description: '45 seconds work, 15 seconds rest for each exercise.' },
              { name: 'Bodyweight Squats', description: 'Stand with feet shoulder-width apart, lower down as if sitting in a chair, then stand back up.' },
              { name: 'Walking Lunges', description: 'Step forward into a lunge, then bring the back leg forward and repeat with the other leg.' },
              { name: 'Glute Bridges', description: 'Lie on back with knees bent, lift hips toward ceiling, squeeze glutes at top.' },
              { name: 'Calf Raises', description: 'Stand with feet hip-width apart, raise heels off ground, then lower.' },
              { name: 'Wall Sit', description: 'Lean against wall with legs bent at 90 degrees, hold position.' }
            ]
          },
          {
            day: 'Day 4',
            focus: 'Core and Flexibility',
            exercises: [
              { name: 'Core Circuit (repeat 3 times)', duration: '20 min', description: '45 seconds work, 15 seconds rest for each exercise.' },
              { name: 'Plank Variations', description: 'Standard plank, side planks, and plank with leg lifts.' },
              { name: 'Bicycle Crunches', description: 'Lie on back, alternate bringing elbow to opposite knee while extending other leg.' },
              { name: 'Russian Twists', description: 'Sit with knees bent, lean back slightly, twist torso side to side.' },
              { name: 'Bird Dogs', description: 'On hands and knees, simultaneously extend opposite arm and leg, maintain balance, then switch sides.' },
              { name: 'Stretching Routine', duration: '15-20 min', description: 'Deep stretching focusing on all major muscle groups.' }
            ]
          },
          {
            day: 'Day 5',
            focus: 'Full Body Circuit',
            exercises: [
              { name: 'Circuit (repeat 3-4 times)', duration: '35 min', description: '45 seconds work, 15 seconds rest for each exercise.' },
              { name: 'Jumping Jacks', description: 'Start with feet together and arms at sides, jump to position with legs apart and arms overhead, then return to starting position.' },
              { name: 'Bodyweight Squats', description: 'Stand with feet shoulder-width apart, lower down as if sitting in a chair, then stand back up.' },
              { name: 'Push-ups', description: 'Start in plank position, lower chest to floor, then push back up. Modify as needed.' },
              { name: 'Mountain Climbers', description: 'Start in plank position, alternate bringing knees toward chest in a running motion.' },
              { name: 'Walking Lunges', description: 'Step forward into a lunge, then bring the back leg forward and repeat with the other leg.' },
              { name: 'Plank', description: 'Hold a forearm or hand plank position, keeping body straight and core engaged.' }
            ]
          }
        ];
      } else {
        // 6-7 day general fitness
        workoutPlan = [
          {
            day: 'Day 1',
            focus: 'Upper Body Push',
            exercises: [
              { name: 'Push-ups (Various Hand Positions)', sets: 4, reps: '10-15', description: 'Perform push-ups with hands at different widths to target different parts of the chest and shoulders.' },
              { name: 'Pike Push-ups', sets: 3, reps: '8-12', description: 'Form an inverted V with body, head pointing down, then bend elbows to lower head toward ground and push back up.' },
              { name: 'Tricep Dips', sets: 3, reps: '12-15', description: 'Using a chair or bench, lower body by bending elbows, then push back up.' },
              { name: 'Plank to Push-up', sets: 3, reps: '8-10', description: 'Start in forearm plank, push up to hand plank, then return to forearm plank.' },
              { name: 'Lateral Raises with Household Items', sets: 3, reps: '12-15', description: 'Hold light objects (water bottles, books) and raise arms out to sides.' }
            ]
          },
          {
            day: 'Day 2',
            focus: 'Cardio - Steady State',
            exercises: [
              { name: 'Warm-up', duration: '5-10 min', description: 'Light cardio and dynamic stretching.' },
              { name: 'Steady State Cardio (Walking, Jogging, Cycling)', duration: '30-45 min', description: 'Maintain a moderate pace where you can talk but feel challenged.' },
              { name: 'Cool Down', duration: '5-10 min', description: 'Gradually reduce intensity followed by stretching.' }
            ]
          },
          {
            day: 'Day 3',
            focus: 'Upper Body Pull and Core',
            exercises: [
              { name: 'Inverted Rows', sets: 4, reps: '10-12', description: 'Using a sturdy table or bar at waist height, hang underneath and pull chest toward the bar.' },
              { name: 'Superman Pulls', sets: 3, reps: '15', description: 'Lie face down with arms extended, pull elbows back as if rowing while lifting chest.' },
              { name: 'Doorway Curls', sets: 3, reps: '12-15', description: 'Using resistance band or towel in doorway, perform bicep curls.' },
              { name: 'Plank Variations', sets: 3, duration: '45-60 sec each', description: 'Perform standard plank, side planks, and plank with leg lifts.' },
              { name: 'Bicycle Crunches', sets: 3, reps: '15 each side', description: 'Lie on back, alternate bringing elbow to opposite knee while extending other leg.' }
            ]
          },
          {
            day: 'Day 4',
            focus: 'Cardio - Intervals',
            exercises: [
              { name: 'Warm-up', duration: '5-10 min', description: 'Light cardio and dynamic stretching.' },
              { name: 'Interval Training', duration: '25-30 min', description: '30 seconds high intensity, 90 seconds low intensity, repeated 10 times.' },
              { name: 'Cool Down', duration: '5-10 min', description: 'Gradually reduce intensity followed by stretching.' }
            ]
          },
          {
            day: 'Day 5',
            focus: 'Lower Body',
            exercises: [
              { name: 'Bodyweight Squats', sets: 4, reps: '15-20', description: 'Stand with feet shoulder-width apart, lower down as if sitting in a chair, then stand back up.' },
              { name: 'Walking Lunges', sets: 3, reps: '12 each leg', description: 'Step forward into a lunge, then bring the back leg forward and repeat with the other leg.' },
              { name: 'Bulgarian Split Squats', sets: 3, reps: '10 each leg', description: 'With back foot elevated on bench or chair, lower into a lunge, then push back up.' },
              { name: 'Glute Bridges', sets: 3, reps: '15-20', description: 'Lie on back with knees bent, lift hips toward ceiling, squeeze glutes at top.' },
              { name: 'Calf Raises', sets: 3, reps: '20', description: 'Stand with feet hip-width apart, raise heels off ground, then lower.' }
            ]
          },
          {
            day: 'Day 6',
            focus: 'Full Body Circuit',
            exercises: [
              { name: 'Circuit (repeat 3-4 times)', duration: '35-40 min', description: '45 seconds work, 15 seconds rest for each exercise.' },
              { name: 'Jumping Jacks', description: 'Start with feet together and arms at sides, jump to position with legs apart and arms overhead, then return to starting position.' },
              { name: 'Push-ups', description: 'Start in plank position, lower chest to floor, then push back up. Modify as needed.' },
              { name: 'Bodyweight Squats', description: 'Stand with feet shoulder-width apart, lower down as if sitting in a chair, then stand back up.' },
              { name: 'Mountain Climbers', description: 'Start in plank position, alternate bringing knees toward chest in a running motion.' },
              { name: 'Walking Lunges', description: 'Step forward into a lunge, then bring the back leg forward and repeat with the other leg.' },
              { name: 'Plank', description: 'Hold a forearm or hand plank position, keeping body straight and core engaged.' },
              { name: 'Bicycle Crunches', description: 'Lie on back, alternate bringing elbow to opposite knee while extending other leg.' }
            ]
          },
          {
            day: 'Day 7',
            focus: 'Active Recovery',
            exercises: [
              { name: 'Light Walking', duration: '20-30 min', description: 'Casual walking at a comfortable pace.' },
              { name: 'Yoga or Deep Stretching', duration: '20-30 min', description: 'Gentle yoga flow or deep stretching focusing on all major muscle groups.' },
              { name: 'Foam Rolling (if available)', duration: '10-15 min', description: 'Self-myofascial release for tight muscles.' }
            ]
          }
        ];
      }
    }
    
    // Adjust workout plan based on workout duration
    if (workoutDuration < 30) {
      // For shorter workouts, reduce the number of exercises or sets
      workoutPlan = workoutPlan.map(day => {
        // Keep focus and day the same
        return {
          ...day,
          exercises: day.exercises.slice(0, Math.min(4, day.exercises.length))
        };
      });
    } else if (workoutDuration >= 60) {
      // For longer workouts, increase sets or duration
      workoutPlan = workoutPlan.map(day => {
        return {
          ...day,
          exercises: day.exercises.map(exercise => {
            if (exercise.sets) {
              return { ...exercise, sets: exercise.sets + 1 };
            }
            if (exercise.duration && !exercise.duration.includes('min')) {
              return exercise;
            }
            if (exercise.duration && exercise.duration.includes('min')) {
              const currentDuration = parseInt(exercise.duration.split('-')[0]);
              const newDuration = Math.round(currentDuration * 1.3);
              return { ...exercise, duration: `${newDuration}-${newDuration + 5} min` };
            }
            return exercise;
          })
        };
      });
    }
    
    // Adjust for workout frequency
    return workoutPlan.slice(0, workoutFrequency);
  };

  const workoutPlan = generateWorkoutPlan();

  // Generate workout tips based on goals and level
  const getWorkoutTips = () => {
    const { fitnessGoals, activityLevel } = formData;
    const tips = [];

    // General tips for everyone
    tips.push('Always warm up before exercise and cool down afterward.');
    tips.push('Stay hydrated before, during, and after workouts.');
    tips.push('Listen to your body and rest when needed.');

    // Goal-specific tips
    if (fitnessGoals.includes('weight_loss')) {
      tips.push('Focus on creating a calorie deficit through both diet and exercise.');
      tips.push('Combine strength training and cardio for optimal fat loss.');
      tips.push('Consider tracking your workouts to ensure progressive overload.');
    } else if (fitnessGoals.includes('muscle_gain')) {
      tips.push('Ensure you\'re eating enough protein and calories to support muscle growth.');
      tips.push('Focus on proper form rather than lifting heavier weights.');
      tips.push('Allow 48 hours of recovery for muscle groups before training them again.');
    } else if (fitnessGoals.includes('endurance')) {
      tips.push('Gradually increase duration before increasing intensity.');
      tips.push('Incorporate both long, slow sessions and shorter, more intense workouts.');
      tips.push('Proper nutrition timing can improve endurance performance.');
    }

    // Activity level-specific tips
    if (activityLevel === 'sedentary' || activityLevel === 'light') {
      tips.push('Start slowly and gradually increase workout intensity and duration.');
      tips.push('Focus on building consistency before pushing intensity.');
      tips.push('Don\'t be discouraged if progress seems slow at first.');
    } else if (activityLevel === 'very_active' || activityLevel === 'active') {
      tips.push('Ensure adequate recovery between intense workouts.');
      tips.push('Consider incorporating more structured rest days.');
      tips.push('Pay attention to signs of overtraining such as persistent fatigue or decreased performance.');
    }

    return tips;
  };

  const workoutTips = getWorkoutTips();

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Workout Plan</h2>
      
      {/* Overview */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 flex items-center p-3 bg-white rounded-lg shadow-sm">
            <Clock className="text-blue-500 mr-3" size={20} />
            <div>
              <p className="text-sm text-gray-600">Workout Duration</p>
              <p className="font-semibold">{formData.workoutDuration} minutes</p>
            </div>
          </div>
          <div className="flex-1 flex items-center p-3 bg-white rounded-lg shadow-sm">
            <Calendar className="text-blue-500 mr-3" size={20} />
            <div>
              <p className="text-sm text-gray-600">Frequency</p>
              <p className="font-semibold">{formData.workoutFrequency} days per week</p>
            </div>
          </div>
          <div className="flex-1 flex items-center p-3 bg-white rounded-lg shadow-sm">
            <Dumbbell className="text-blue-500 mr-3" size={20} />
            <div>
              <p className="text-sm text-gray-600">Primary Focus</p>
              <p className="font-semibold">
                {formData.fitnessGoals[0]?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Workout Plans */}
      <div className="space-y-6 mb-8">
        {workoutPlan.map((day, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-blue-50 px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800">{day.day}: {day.focus}</h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {day.exercises.map((exercise, i) => (
                  <div key={i} className={i % 2 === 0 ? 'bg-gray-50 p-3 rounded-lg' : 'p-3'}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h4 className="font-medium text-gray-800">{exercise.name}</h4>
                      <div className="text-sm text-gray-600">
                        {exercise.sets && exercise.reps && `${exercise.sets} sets × ${exercise.reps}`}
                        {exercise.sets && exercise.duration && `${exercise.sets} sets × ${exercise.duration}`}
                        {!exercise.sets && exercise.duration && `${exercise.duration}`}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{exercise.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Tips and Precautions */}
      <div className="border border-orange-200 rounded-lg bg-orange-50 p-4 mb-6">
        <div className="flex items-start">
          <AlertCircle className="text-orange-500 mr-3 mt-1" size={20} />
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Important Reminders</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Consult with a healthcare provider before starting a new exercise program</li>
              <li>Start at a level appropriate for your current fitness ability</li>
              <li>Modify exercises as needed based on any physical limitations</li>
              <li>Stop any exercise that causes pain (beyond normal muscle fatigue)</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Workout Tips */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Tips for Success</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {workoutTips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkoutPlan;