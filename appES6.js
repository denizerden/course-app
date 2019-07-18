
//Course Class
class Course {
    constructor(title,instructor,image){
        this.courseId = Math.floor(Math.random()*10000);
        this.title = title;
        this.instructor = instructor;
        this.image = image;
    }
}
//UI Class
class UI {
    addCourseToList(course){
        const list = document.getElementById('course-list');

        let html = `
            <tr>
                <td><img style="max-width:100% ; max-height:20%" src="img/${course.image}"/></td>
                <td>${course.title}</td>
                <td>${course.instructor}</td>
                <td><a href="#" data-id="${course.courseId}" class="btn btn-danger btn-sm delete">Delete</a></td>
            </tr>
        `;
        list.innerHTML += html;
    }

    clearControls(){
        const title = $("#title").val("");
        const instructor = $("#instructor").val("");
        const image = $("#image").val("");
    }

    deleteCourse(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
            return true;

        }
    }

    showAlert(message, className){
        let alert = `<div class="alert alert-${className}">
        ${message}
        </div> `;
    
        const row = document.querySelector('.row');
    //beforeBegin, afterBegin, beforeEnd, afterEnd
        row.insertAdjacentHTML('beforeBegin',alert);
    
        setTimeout(() => {
            document.querySelector('.alert').remove();
        },3000)
    }
}

//Storage Class
class Storage{
    static getCourses(){
        let courses;
        let cookie = localStorage.getItem('courses');
       
        if(cookie===null){
            courses = [];
        }else{
            
            courses = JSON.parse(cookie);
            console.log(courses);
        }
        return courses;
    }

    static displayCourses(){
        const courses = Storage.getCourses();
        console.log("display courses");
        courses.forEach(course => {
            const ui = new UI();
            ui.addCourseToList(course);
        });
       
    }

    static addCourse(course){
        const courses = Storage.getCourses();
        courses.push(course);
        localStorage.setItem('courses',JSON.stringify(courses)); 
    }
    static deleteCourse(element){
        if(element.classList.contains('delete')){
            const id = element.getAttribute('data-id');
            // console.log(id);

            const courses = Storage.getCourses();

            courses.forEach((course,index) => {
                if(course.courseId == id){
                   courses.splice(index,1); 
                }
            });
            localStorage.setItem('courses', JSON.stringify(courses));
        }
    }
}

// $(function(){
//     Storage.displayCourses();
//   });

document.addEventListener('DOMContentLoaded', Storage.displayCourses);


$("#save-button").click(function(event){
    const title = $("#title").val();
    const instructor = $("#instructor").val();
    const image = $("#image").val();
    
    console.log(title,instructor,image);

    //create course object
    const course = new Course(title,instructor,image);

   
    //create ui
    const ui = new UI();


    if(title === '' || instructor === '' || image === ''){
        ui.showAlert('Please complete the form', 'warning')
    }
    else{
         //add course to list
    ui.addCourseToList(course);

    //save to Local Storage
    Storage.addCourse(course);

    //clear controls
    ui.clearControls();
    ui.showAlert('The course has been added','success')
    }
   
    event.preventDefault();
});


$("#course-list").click(function(e){
    const ui = new UI();
    //delete course
    if(ui.deleteCourse(e.target)==true){
        //delete from Local Storage
        Storage.deleteCourse(e.target);
        ui.showAlert('The course has been deleted','danger')
    }

  
});