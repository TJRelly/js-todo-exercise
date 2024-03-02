# js-todo-exercise

[Live Site](https://tjrelly.github.io/js-todo-exercise/)

Dealing with duplicates was indeed a challenge. Following the guidance from the solution guide, I implemented dynamic IDs. Each new element was assigned a unique ID using the data attribute, and I compared it to the ID of the event target to ensure accurate handling. I also made sure to use proper comparison techniques, especially when managing events like removal and marking as completed, to avoid unintended issues with duplicate items. Finally, I updated the list for local storage to ensure that new elements received the correct IDs even after a page refresh.
