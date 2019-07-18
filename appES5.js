
//course constructor
function Course(title,instructor,image){
    this.title = title;
    this.instructor = instructor;
    this.image = image;
}
//ui constructor
function UI(){
    
}

UI.prototype.addCourseToList = function(course){
    const list = document.getElementById('course-list');

    let html = `
        <tr>
            <td><img style="max-width:100% ; max-height:20%" src="img/${course.image}"/></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
        </tr>
    `;
    list.innerHTML += html;
}
UI.prototype.clearControls = function(){
    const title = $("#title").val("");
    const instructor = $("#instructor").val("");
    const image = $("#image").val("");
}

UI.prototype.deleteCourse = function(element){
    if(element.classList.contains('delete')){
        element.parentElement.parentElement.remove();
    }
}

UI.prototype.showAlert = function(message,className){
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

    //clear controls
    ui.clearControls();
    ui.showAlert('The course has been added','success')
    }
   




    event.preventDefault();
});


$("#course-list").click(function(e){
    const ui = new UI();
    ui.deleteCourse(e.target);
    ui.showAlert('The course has been deleted','danger')
});