var coursesAPI = "http://localhost:3000/courses";

function start() {
  getCourses(renderCourses);
  handleCreateForm();
}

start();
//getCourses
function getCourses(callback) {
  fetch(coursesAPI)
    .then((response) => response.json())
    .then(callback);
}

// renderCourses
function renderCourses(courses) {
  var listCoursesBlocks = document.querySelector("#list-courses");
  var htmls = courses.map(function (course) {
    return `
    <li class="list-courses-${course.id}">
        <h4>${course.name}</h4>
        <p>${course.discription}</p>
        <button onclick="handleDeleteCourse(${course.id})">&times;</button>
    </li>
    `;
  });

  listCoursesBlocks.innerHTML = htmls.join("");
}
// create a new course
function createCourse(data, callback) {
  var option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(coursesAPI, option)
    .then((response) => response.json())
    .then(callback);
}
// create handle course
function handleCreateForm() {
  var createBtn = document.querySelector("#create");
  createBtn.onclick = function () {
    var name = document.querySelector('input[name="name"]').value;
    var discription = document.querySelector('input[name="discription"]').value;
    var courseData = {
      name: name,
      discription: discription,
    };
    createCourse(courseData, function () {
      getCourses(renderCourses);
    });
  };
}
// delete handle course
function handleDeleteCourse(idcourses) {
  var option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    
  };
  fetch(coursesAPI + "/" + idcourses, option)
    .then((response) => response.json())
    .then(function () {
      var courseItem = document.querySelector(".course-item-" + idcourses);
      courseItem.remove();
    });
}
