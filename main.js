(() => {
  const studentsArray = [
    new Student('Алексей', 'Сидоров', 'Иванович', new Date(1998, 4, 20), 2019, 'Гуманитарный'),
    new Student('Владимир', 'Поляков', 'Александрович', new Date(2000, 7, 2), 2021, 'Юридический'),
    new Student('Елена', 'Смирнова', 'Анатольевна', new Date(1999, 0, 16), 2020, 'Юридический'),
    new Student('Анна', 'Новикова', 'Сергеевна', new Date(1996, 10, 18), 2018, 'Гуманитарный'),
    new Student('Сергей', 'Архипов', 'Владимирович', new Date(1995, 3, 9), 2017, 'Юридический'),
    new Student('Ирина', 'Смирнова', 'Михайловна', new Date(2001, 6, 15), 2020, 'Экономический'),
  ];

  const $studentsList = document.getElementById('studentsList');

  const $inputNameAdd = document.getElementById('nameAdd');
  const $inputSurnameAdd = document.getElementById('surnameAdd');
  const $inputMiddleNameAdd = document.getElementById('middleNameAdd');
  const $inputBirthDateAdd = document.getElementById('birthDateAdd');
  const $inputStudyStartAdd = document.getElementById('studyStartAdd');
  const $inputFacultyAdd = document.getElementById('facultyAdd');

  const $inputNameHelp = document.getElementById('nameHelp');
  const $inputSurnameHelp = document.getElementById('surnameHelp');
  const $inputMiddleNameHelp = document.getElementById('middleNameHelp');
  const $inputBirthDateHelp = document.getElementById('birthDateHelp');
  const $inputStudyStartHelp = document.getElementById('studyStartHelp');
  const $inputFacultyHelp = document.getElementById('facultyHelp');

  let studentsArrayCopy = [];
  let column;

  function Student(name, surname, middleName, birthDate, studyStart, faculty) {
    this.name = name;
    this.surname = surname;
    this.middleName = middleName;
    this.birthDate = birthDate;
    this.studyStart = studyStart;
    this.faculty = faculty;

    this.getFullName = () => {
      return this.surname + ' ' + this.name + ' ' + this.middleName;
    }

    this.getBirthDateString = () => {
      const year = this.birthDate.getFullYear();
      let month = this.birthDate.getMonth() + 1;
      let day = this.birthDate.getDate();

      if (day < 10) day = '0' + day;

      if (month < 10) month = '0' + month;

      return day + '.' + month + '.' + year;
    }

    this.getAge = () => {
      const currentDate = new Date();
      const month = currentDate.getMonth() - this.birthDate.getMonth();
      let age = currentDate.getFullYear() - this.birthDate.getFullYear();

      if (month < 0 || (month === 0 && currentDate.getDate() < this.birthDate.getDate())) age--;

      return age;
    }

    this.getUnitAge = (age) => {
      let unit;
      let count = age % 100;

      if (count >= 5 && count <= 20) unit = 'лет';
      else {
        count = count % 10;
        if (count == 1) unit = 'год';
        else if (count >= 2 && count <= 4) unit = 'года';
        else unit = 'лет';
      }

      return unit;
    }

    this.getStudyTime = () => {
      return this.studyStart + '-' + (this.studyStart + 4);
    }

    this.getStudyCourse = () => {
      const currentDate = new Date();
      let course = currentDate.getFullYear() - this.studyStart;

      if (currentDate.getMonth() >= 8) course++;

      const studyCourse = course > 4 ? 'Закончил' : `${course} курс`;

      return studyCourse;
    }
  }

  function newStudentTR(student) {
    const $studentTR = document.createElement('tr');
    const $fullNameTD = document.createElement('td');
    const $facultyTD = document.createElement('td');
    const $birthDateTD = document.createElement('td');
    const $studyTimeTD = document.createElement('td');

    $fullNameTD.textContent = student.getFullName();
    $facultyTD.textContent = student.faculty;
    $birthDateTD.textContent = student.getBirthDateString() + ` (${student.getAge()} ${student.getUnitAge(student.getAge())})`;
    $studyTimeTD.textContent = student.getStudyTime() + ` (${student.getStudyCourse()})`;

    $studentTR.append($fullNameTD);
    $studentTR.append($facultyTD);
    $studentTR.append($birthDateTD);
    $studentTR.append($studyTimeTD);

    return $studentTR;
  }

  function checkValidation() {
    if ($inputSurnameAdd.value === '') {
      $inputSurnameAdd.classList.add('is-invalid');
      $inputSurnameHelp.classList.add('invalid-feedback');
      $inputSurnameHelp.classList.remove('valid-feedback');
    } else {
      $inputSurnameAdd.classList.remove('is-invalid');
      $inputSurnameHelp.classList.add('valid-feedback');
      $inputSurnameHelp.classList.remove('invalid-feedback');
    }

    if ($inputNameAdd.value === '') {
      $inputNameAdd.classList.add('is-invalid');
      $inputNameHelp.classList.add('invalid-feedback');
      $inputNameHelp.classList.remove('valid-feedback');
    } else {
      $inputNameAdd.classList.remove('is-invalid');
      $inputNameHelp.classList.add('valid-feedback');
      $inputNameHelp.classList.remove('invalid-feedback');
    }

    if ($inputMiddleNameAdd.value === '') {
      $inputMiddleNameAdd.classList.add('is-invalid');
      $inputMiddleNameHelp.classList.add('invalid-feedback');
      $inputMiddleNameHelp.classList.remove('valid-feedback');
    } else {
      $inputMiddleNameAdd.classList.remove('is-invalid');
      $inputMiddleNameHelp.classList.add('valid-feedback');
      $inputMiddleNameHelp.classList.remove('invalid-feedback');
    }

    if ($inputFacultyAdd.value === '') {
      $inputFacultyAdd.classList.add('is-invalid');
      $inputFacultyHelp.classList.add('invalid-feedback');
      $inputFacultyHelp.classList.remove('valid-feedback');
    } else {
      $inputFacultyAdd.classList.remove('is-invalid');
      $inputFacultyHelp.classList.add('valid-feedback');
      $inputFacultyHelp.classList.remove('invalid-feedback');
    }

    if ($inputBirthDateAdd.valueAsDate < new Date(1900, 0, 1) || $inputBirthDateAdd.valueAsDate > new Date() || $inputBirthDateAdd.valueAsDate === null) {
      $inputBirthDateAdd.classList.add('is-invalid');
      $inputBirthDateHelp.classList.add('invalid-feedback');
      $inputBirthDateHelp.classList.remove('valid-feedback');
    } else {
      $inputBirthDateAdd.classList.remove('is-invalid');
      $inputBirthDateHelp.classList.add('valid-feedback');
      $inputBirthDateHelp.classList.remove('invalid-feedback');
    }

    if (Number($inputStudyStartAdd.value) < 2000 || Number($inputStudyStartAdd.value) > new Date().getFullYear() || Number($inputStudyStartAdd.value) === new Date().getFullYear() && new Date().getMonth() < 8) {
      $inputStudyStartAdd.classList.add('is-invalid');
      $inputStudyStartHelp.classList.add('invalid-feedback');
      $inputStudyStartHelp.classList.remove('valid-feedback');
    } else {
      $inputStudyStartAdd.classList.remove('is-invalid');
      $inputStudyStartHelp.classList.add('valid-feedback');
      $inputStudyStartHelp.classList.remove('invalid-feedback');
    }
  }

  function getSortStudents(prop) {
    studentsArrayCopy = studentsArrayCopy.sort((a, b) => {
      if (prop === 'fullName') {
        if (a.getFullName() < b.getFullName()) return -1;
        else if (a.getFullName() > b.getFullName()) return 1;
        else return 0;
      } else {
        if (a[prop] < b[prop]) return -1;
        else if (a[prop] > b[prop]) return 1;
        else return 0;
      }
    });

    return studentsArrayCopy;
  }

  function getFilterStudents() {
    const $InputFullNameFilter = document.getElementById('fullNameFilter').value.toLowerCase().trim();
    const $InputFacultyFilter = document.getElementById('facultyFilter').value.toLowerCase().trim();
    const $InputStudyStartFilter = Number(document.getElementById('studyStartFilter').value);
    const $InputStudyEndFilter = Number(document.getElementById('studyEndFilter').value);

    if ($InputFullNameFilter) {
      studentsArrayCopy = studentsArrayCopy.filter(students => students.getFullName().toLowerCase().includes($InputFullNameFilter));
    }

    if ($InputFacultyFilter) {
      studentsArrayCopy = studentsArrayCopy.filter(students => students.faculty.toLowerCase().includes($InputFacultyFilter));
    }

    if ($InputStudyStartFilter) {
      studentsArrayCopy = studentsArrayCopy.filter(students => students.studyStart === $InputStudyStartFilter);
    }

    if ($InputStudyEndFilter) {
      studentsArrayCopy = studentsArrayCopy.filter(students => (students.studyStart + 4) === $InputStudyEndFilter);
    }

    return studentsArrayCopy;
  }

  function renderList() {
    if (studentsArrayCopy.length !== studentsArray.length) {
      studentsArrayCopy = studentsArray.slice();
      getSortStudents('fullName');
    }

    studentsArrayCopy = getSortStudents(column);

    studentsArrayCopy = getFilterStudents();

    $studentsList.innerHTML = '';

    for (const student of studentsArrayCopy) {
      $studentsList.append(newStudentTR(student));
    }
  }

  document.querySelectorAll('#studentsTable th').forEach(item => {
    item.addEventListener('click', function() {
      column = this.dataset.column;
      renderList();
    });
  });

  document.getElementById('studentsFilter').addEventListener('input', () => {
    renderList();
  });

  document.getElementById('studentAdd').addEventListener('submit', function(e) {
    e.preventDefault();

    checkValidation();

    const errorCount = document.querySelectorAll('#studentAdd .invalid-feedback');

    if (errorCount.length !== 0) return;

    const newName = $inputNameAdd.value.trim();
    const newSurname = $inputSurnameAdd.value.trim();
    const newMiddleName = $inputMiddleNameAdd.value.trim();
    const newBirthDate = new Date($inputBirthDateAdd.value);
    const newStudyStart = Number($inputStudyStartAdd.value);
    const newFaculty = $inputFacultyAdd.value.trim();

    const newStudent = new Student(
      newName[0].toUpperCase() + newName.substr(1).toLowerCase(),
      newSurname[0].toUpperCase() + newSurname.substr(1).toLowerCase(),
      newMiddleName[0].toUpperCase() + newMiddleName.substr(1).toLowerCase(),
      newBirthDate,
      newStudyStart,
      newFaculty[0].toUpperCase() + newFaculty.substr(1),
    );

    studentsArray.push(newStudent);

    $studentsList.append(newStudentTR(newStudent));

    document.querySelectorAll('#studentAdd input').forEach(item => {
      item.value = '';
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    renderList();
  });
})();
