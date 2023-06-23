import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularTest';
  MoviesList: string[] = [
    'Client1',
    'Client 2',
    'Client 3',
    'Client 4',
    'Client 5',
    'Client 6',
    'Client 7',
    'Client 8'
  ];
  MoviesWatched: string[] = [
  ];
  // persons = [
  //   {
  //     id: 'person1',
  //     name: 'Person X',
  //     tasks: [
  //       { id: 'task1', name: 'Task 1', isDuplicate: false, isDropped: false },
  //       { id: 'task2', name: 'Task 2', isDuplicate: false, isDropped: false },
  //       { id: 'task3', name: 'Task 3', isDuplicate: false, isDropped: false }
  //     ]
  //   },
  //   {
  //     id: 'person2',
  //     name: 'Person Y',
  //     tasks: [
  //       { id: 'task4', name: 'Task 4', isDuplicate: false, isDropped: false },
  //       { id: 'task5', name: 'Task 5', isDuplicate: false, isDropped: false },
  //       { id: 'task6', name: 'Task 6', isDuplicate: false, isDropped: false }
  //     ]
  //   },
  //   {
  //     id: 'person3',
  //     name: 'Person Z',
  //     tasks: [
  //       { id: 'task7', name: 'Task 7', isDuplicate: false, isDropped: false },
  //       { id: 'task8', name: 'Task 8', isDuplicate: false, isDropped: false },
  //       { id: 'task9', name: 'Task 9', isDuplicate: false, isDropped: false }
  //     ]
  //   }
  // ];
  // persons = [
  //   {
  //     id: 'p1',
  //     name: 'Person 1',
  //     tasks: [
  //       { id: 't1', name: 'Task 1', isDuplicate: false, isDropped: false, originId: null },
  //       { id: 't2', name: 'Task 2', isDuplicate: false, isDropped: false, originId: null },
  //       { id: 't3', name: 'Task 3', isDuplicate: false, isDropped: false, originId: null },
  //     ],
  //   },
  //   {
  //     id: 'p2',
  //     name: 'Person 2',
  //     tasks: [
  //       { id: 't4', name: 'Task 4', isDuplicate: false, isDropped: false, originId: null },
  //       { id: 't5', name: 'Task 5', isDuplicate: false, isDropped: false, originId: null },
  //     ],
  //   },
  //   {
  //     id: 'p3',
  //     name: 'Person 3',
  //     tasks: [
  //       { id: 't6', name: 'Task 6', isDuplicate: false, isDropped: false, originId: null },
  //       { id: 't7', name: 'Task 7', isDuplicate: false, isDropped: false, originId: null },
  //     ],
  //   },
  // ];
  persons: any[] = [
    {
      id: 'person1',
      name: 'Person X',
      tasks: [
        {
          id: 'task1',
          name: 'Task 1',
          originId: 'person1',
          isDropped: false,
          isDuplicate: false,
        },
        {
          id: 'task2',
          name: 'Task 2',
          originId: 'person1',
          isDropped: false,
          isDuplicate: false,
        },
      ],
    },
    {
      id: 'person2',
      name: 'Person Y',
      tasks: [
        {
          id: 'task3',
          name: 'Task 3',
          originId: 'person2',
          isDropped: false,
          isDuplicate: false,
        },
      ],
    },
    {
      id: 'person3',
      name: 'Person Z',
      tasks: [
        {
          id: 'task4',
          name: 'Task 4',
          originId: 'person3',
          isDropped: false,
          isDuplicate: false,
        },
      ],
    },
  ];
  // drop(event: CdkDragDrop<any[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     // Create a duplicate task with a red background at the previous position
  //     const duplicateTask = { ...event.item.data, isDuplicate: true };
  //     event.previousContainer.data.splice(event.previousIndex, 0, duplicateTask);
    
  //     // Transfer the original task to the new position
  //     transferArrayItem(event.previousContainer.data,
  //                       event.container.data,
  //                       event.previousIndex + 1,
  //                       event.currentIndex);
  
  //     // Update the originId of the task
  //     const movedTask = event.container.data[event.currentIndex];
  //     movedTask.originId = event.previousContainer.id;
  
  //     // Apply the isDropped property to the dropped task after the animation is over
  //     setTimeout(() => {
  //       movedTask.isDropped = true;
    
  //       // Remove the duplicate task from the original container when moving to a new container
  //       if (movedTask.originId) {
  //         const originContainer = this.persons.find(person => person.id === movedTask.originId);
  //         if (originContainer) {
  //           const duplicateIndex = originContainer.tasks.findIndex(task => task.id === movedTask.id && task.isDuplicate);
  //           if (duplicateIndex > -1) {
  //             originContainer.tasks.splice(duplicateIndex, 1);
  //           }
  //         }
  //       }
  //     }, 250);
  //   }
  // }
  lastDuplicateTask: { container: any, index: number } | null = null;

  persons_dupl=this.persons
drop(event: CdkDragDrop<any[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    // Remove the previous duplicate task if it exists
    if (this.lastDuplicateTask) {
      this.lastDuplicateTask.container.data.splice(this.lastDuplicateTask.index, 1);
      this.lastDuplicateTask = null;
    }

    // Create a duplicate task with a red background at the previous position
    const duplicateTask = { ...event.item.data, isDuplicate: true };
    event.previousContainer.data.splice(event.previousIndex, 0, duplicateTask);

    // Transfer the original task to the new position
    transferArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex + 1,
                      event.currentIndex);

    // Check if the task is moved back to its original container
    if (event.container.id === event.item.data.originId) {
      // Remove the duplicate task
      event.previousContainer.data.splice(event.previousIndex, 1);
      
      // Reset the background color of the moved task to white
      event.container.data[event.currentIndex].isDropped = false;
    } else {
      // Store the information about the current duplicate task
      this.lastDuplicateTask = {
        container: event.previousContainer,
        index: event.previousIndex,
      };

      // Apply the isDropped property to the dropped task after the animation is over
      setTimeout(() => {
        event.container.data[event.currentIndex].isDropped = true;
      }, 250);
    }
  }
}
  // drop(event: CdkDragDrop<any[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     // Create a duplicate task with a red background at the previous position
  //     const duplicateTask = { ...event.item.data, isDuplicate: true };
  //     event.previousContainer.data.splice(event.previousIndex, 0, duplicateTask);

  //     // Transfer the original task to the new position
  //     transferArrayItem(event.previousContainer.data,
  //                       event.container.data,
  //                       event.previousIndex + 1,
  //                       event.currentIndex);

  //     // Apply the isDropped property to the dropped task after the animation is over
  //     setTimeout(() => {
  //       event.container.data[event.currentIndex].isDropped = true;
  //     }, 250);
  //   }
  // }
  
}
