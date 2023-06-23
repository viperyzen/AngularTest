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
  persons = [
    {
      id: 'person1',
      name: 'Person X',
      tasks: [
        { id: 'task1', name: 'Task 1', isDuplicate: false, isDropped: false },
        { id: 'task2', name: 'Task 2', isDuplicate: false, isDropped: false },
        { id: 'task3', name: 'Task 3', isDuplicate: false, isDropped: false }
      ]
    },
    {
      id: 'person2',
      name: 'Person Y',
      tasks: [
        { id: 'task4', name: 'Task 4', isDuplicate: false, isDropped: false },
        { id: 'task5', name: 'Task 5', isDuplicate: false, isDropped: false },
        { id: 'task6', name: 'Task 6', isDuplicate: false, isDropped: false }
      ]
    },
    {
      id: 'person3',
      name: 'Person Z',
      tasks: [
        { id: 'task7', name: 'Task 7', isDuplicate: false, isDropped: false },
        { id: 'task8', name: 'Task 8', isDuplicate: false, isDropped: false },
        { id: 'task9', name: 'Task 9', isDuplicate: false, isDropped: false }
      ]
    }
  ];
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Create a duplicate task with a red background at the previous position
      const duplicateTask = { ...event.item.data, isDuplicate: true };
      event.previousContainer.data.splice(event.previousIndex, 0, duplicateTask);

      // Transfer the original task to the new position
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex + 1,
                        event.currentIndex);

      // Apply the isDropped property to the dropped task after the animation is over
      setTimeout(() => {
        event.container.data[event.currentIndex].isDropped = true;
      }, 250);
    }
  }
}
