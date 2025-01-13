# **Angular for React Developers Part 3: Components and Presenting Data**

In the second part of this series, we added a form to the Login page. The form enabled a user to type their email address and password.

![Login Page](react-task-tutorial-02-login.png)

When the user presses Submit, the app checks the submitted credentials and authenticates the user. If the user’s credentials are valid, the application displays a message and navigates to the Task page. Now we will add a table to the page and display a list of tasks assigned to the user.

![Tasks Page](ng-task-tutorial-03-tasks.png)

For now, the page only displays a table with basic task information. In future installments, we will create the functionality to add, edit, and delete tasks. As with [Part 2](https://github.com/trider/ng-task-tutorial/tree/main/ng-task-tutorial-02), I have simplified the process of building the page by providing a list of tasks in a Javascript file. All the files referenced in this article, and the sample [React](https://github.com/trider/react-task-tutorial/tree/main/react-task-tutorial-03) and [Angular](https://github.com/trider/ng-task-tutorial/tree/main/ng-task-tutorial-03) code are available from GitHub.

## **React Components and Data Presentation**

As with Routing and Forms, React’s approach to building components and displaying data has many parallels to its Angular equivalent. Conversely, these parallels also highlight each framework’s contrasting approach. First, you declare all the referenced components at the top of the file. In this case, the userTasks file is the list of tasks and tableCols is the name of each table column.

```javascript
import { Link } from "react-router-dom";
import userTasks from "../data/tasks";
import tableCols from "../data/cols";
import "./_pages.css";
```

Following the references, you create the component definition. This is a single function that returns the entire component. This is written with React’s unique JavaScript XML (JSX) syntax. JSX presents data by mixing static HTML elements with Javascript code. For example, the following displays the table's top row. Inside the \<tr\>\</tr\> tags there are a pair of {} braces. Within the braces, the code uses a .map method to iterate through the list of column names and display them.

```javascript
const Tasks = () => {
 return (
   <div>
    <h1>Tasks</h1>
     <table>
      <thead>
       <tr>{tableCols.map((col) => ( <th key={col}>{col}</th>))}</tr>
      </thead>
      <tbody> {userTasks.map((task) => (
        <tr key={task.id}>{tableCols.map((col) => (
         <td key={col}>{task[col.toLowerCase()]}</td>
        ))}</tr>
       ))}
    </tbody>
   </table>
   <p><Link to="/">Logout</Link></p>
  </div>
 );
};
export default Tasks;
```

## **Angular Components and Data Presentation**

In an Angular component, there is a clear separation between the presentational elements, component model, and code. Presentation elements use HTML and Angular directives, and the component model and computation use Typescript. This will become more apparent when we update tasks.component.html.

### **Getting Started**

Let’s start by opening src/app/tasks.component.ts. In the first reference, add a reference to OnInit. This is an Angular lifecycle method that is used to initialize components, such as fetching data.

```javascript
import { Component, OnInit } from '@angular/core';
```

After the first reference, add a reference to the CommonModule. This will enable us to use Angular’s pipe functionality to format data.

```javascript
import { CommonModule } from '@angular/common';
```

Then, add a reference to the Tasks.ts data file. This file is the list of tasks assigned to the user. You can download the file from [GitHub](https://github.com/trider/ng-task-tutorial).

```javascript
import { Tasks } from '../data/tasks';
```

Next, we update @Component’s imports list to include CommonModule.

```javascript
@Component({
 selector: 'app-tasks',
 standalone: true,
 imports: [CommonModule,RouterLink],
 templateUrl: './tasks.component.html',
 styleUrl: './tasks.component.scss'
})
```

### **Extending TasksComponent**

After we have referenced the relevant components and files, we will extend the TasksComponent class so we can add a ngOnInit method. We extend the component class with the implements keyword, followed by OnInt.

```javascript
export class TasksComponent implements OnInit {}
```

### **Declaring Task and User Data**

Now let’s add the following variables. The tasks object is assigned the data from the imported Tasks list. Since we only want to display tasks created or assigned to the authenticated user, we will filter the tasks list by username and assign the data to the tableData object. The tableCols object is a list of the names of each table column. The user object holds the authenticated user profile.

```javascript
export class TasksComponent implements OnInit {
 tasks:any = Tasks;
 tableData:any = null
 tableCols: any = ['name','description','added','updated','status'];
 user:any = null;
}
```

### **Initializing the TasksComponent**

Following the variable declarations, we add a constructor method. While we are not currently using the constructor, we will need it in the future to consume Angular services. After the constructor, we add an empty ngOnInit method.

```javascript
constructor() { }
ngOnInit(): void {}
```

Will use ngOnInit to retrieve the persisted user profile from the browser’s session storage. The profile is assigned to the user object.

```javascript
ngOnInit(): void {
 this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
}
```

Finally, we filter the tasks object to include only tasks assigned to the authenticated user. The filtered tasks list is assigned to the tableData object. This object will be displayed in a table in the .html page.

```javascript
this.tableData = this.tasks.filter((task:any) =>
 task.user === this.user.userName
);
```

### **Presenting Tasks Data**

Open tasks.component.ts, and replace the file’s content with the following:

```html
<div class="container" >
 <h1>Tasks</h1>
 <p><a routerLink="/login">Go to login</a></p>
</div>
```

Following the \<h1\>Tasks\</h1\>, add a table.

```html
<h1>Tasks</h1>
<table></table>
```

In the table, add a table header with a single row. By embedding a \*ngFor directive in a \<th\> tag, we iterate through the tableCols object using cols as iterator. Using double braces, each value in tableCols is displayed using interpolation. To convert the col from lower to title case, we apply the titlecase pipe. This was made possible by referencing the CommonModule.

```html
<thead>
 <tr>
  <th *ngFor="let col of tableCols" scope="col">{{col|titlecase}}</th>
 </tr>
</thead>
```

After the table header, we add a table body with a single row and a single \<td\> tag. Here we embed two \*ngFor directive. The first directive iterates through the tasks list. The second iterates through the tableCols object and only displays each field in the object.

```html
<tbody>
 <tr *ngFor="let item of tableData">
  <td *ngFor="let col of tableCols">{{item[col]}}</td>
 </tr>
</tbody>
```

When you refresh the page in the browser, you should see a list of the user’s tasks displayed.

![Tasks Page](ng-task-tutorial-03-tasks.png)
