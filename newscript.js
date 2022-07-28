var coursesAPI = "http://localhost:3000/courses";

function start() {
  getCourses(renderCourses);
  handleCreateCourse();
}
start();

//get courses from the database
function getCourses(callback) {
  fetch(coursesAPI)
    .then((response) => response.json())
    .then(callback);
}

// render courses to the interface
function renderCourses(courses) {
  var listCoursesBlocks = document.querySelector("#list-courses");
  const htmls = courses.map((course) => {
    return `
    <li id="list-courses-block-${course.id}">
        <h3>${course.name}</h3>
        <p>${course.discription}</p>
        <button onclick=handleDeleteCourse(${course.id})>Delete</button>
    
    </li>    `;
  });

  listCoursesBlocks.innerHTML = htmls.join("");
}
// handle delete course
function handleDeleteCourse(courseId) {
  var option = {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(coursesAPI + "/" + courseId, option)
    .then((response) => response.json())
    .then(function () {
      var courseBlocks = document.querySelector(
        `#list-courses-block-${courseId}`
      );
      courseBlocks.remove();
    });
}

// create new course
function createCourse(data, callback) {
  var option = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(coursesAPI, option)
    .then((response) => response.json())
    .then(function (courses) {
      callback(courses);
    });
}
// handle create courses
function handleCreateCourse() {
  var createBtn = document.querySelector("#create");
  createBtn.onclick = function () {
    var courseName = document.querySelector('input[name="name"]').value;
    var courseDiscription = document.querySelector(
      'input[name="discription"]'
    ).value;
    var courseData = {
      name: courseName,
      discription: courseDiscription,
    };
    createCourse(courseData, function (courses) {
      getCourses(renderCourses);
    });
  };
}
