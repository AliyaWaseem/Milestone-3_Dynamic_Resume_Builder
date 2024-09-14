var _a, _b, _c;
var currentResumeData = null;
// Variables to keep track of the number of entries
var workExperienceCount = 1;
var educationCount = 1;
// Function to add more work experience fields
(_a = document.getElementById('add-work-experience')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    workExperienceCount++;
    var container = document.getElementById('work-experience-container');
    var newExperience = document.createElement('div');
    newExperience.classList.add('work-experience-item');
    newExperience.innerHTML = "\n        <label for=\"job-title-".concat(workExperienceCount, "\">Job Title:</label>\n        <input type=\"text\" id=\"job-title-").concat(workExperienceCount, "\" placeholder=\"Job Title\" required>\n\n        <label for=\"company-").concat(workExperienceCount, "\">Company:</label>\n        <input type=\"text\" id=\"company-").concat(workExperienceCount, "\" placeholder=\"Company Name\" required>\n\n        <label for=\"duration-").concat(workExperienceCount, "\">Duration:</label>\n        <input type=\"text\" id=\"duration-").concat(workExperienceCount, "\" placeholder=\"Duration (e.g., 2019-2021)\" required>\n    ");
    container.appendChild(newExperience);
});
// Function to add more education fields
(_b = document.getElementById('add-education')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    educationCount++;
    var container = document.getElementById('education-container');
    var newEducation = document.createElement('div');
    newEducation.classList.add('education-item');
    newEducation.innerHTML = "\n        <label for=\"degree-".concat(educationCount, "\">Degree:</label>\n        <input type=\"text\" id=\"degree-").concat(educationCount, "\" placeholder=\"Degree\" required>\n\n        <label for=\"institution-").concat(educationCount, "\">Institution:</label>\n        <input type=\"text\" id=\"institution-").concat(educationCount, "\" placeholder=\"Institution Name\" required>\n\n        <label for=\"year-").concat(educationCount, "\">Year:</label>\n        <input type=\"text\" id=\"year-").concat(educationCount, "\" placeholder=\"Year of Graduation\" required>\n    ");
    container.appendChild(newEducation);
});
// Function to handle form submission and generate the resume
(_c = document.getElementById('resume-form')) === null || _c === void 0 ? void 0 : _c.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    var name = document.getElementById('name').value;
    var jobTitle = document.getElementById('job-title').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var skills = document.getElementById('skills').value.split(',').map(function (skill) { return skill.trim(); });
    var profilePicInput = document.getElementById('profile-pic');
    var profilePicFile = (_a = profilePicInput.files) === null || _a === void 0 ? void 0 : _a[0];
    var reader = new FileReader();
    reader.onload = function (event) {
        var _a;
        var profilePicUrl = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
        // Collect work experience data
        var workExperience = [];
        for (var i = 1; i <= workExperienceCount; i++) {
            var jobTitleInput = document.getElementById("job-title-".concat(i));
            var companyInput = document.getElementById("company-".concat(i));
            var durationInput = document.getElementById("duration-".concat(i));
            if (jobTitleInput && companyInput && durationInput) {
                workExperience.push({
                    jobTitle: jobTitleInput.value,
                    company: companyInput.value,
                    duration: durationInput.value
                });
            }
        }
        // Collect education data
        var education = [];
        for (var i = 1; i <= educationCount; i++) {
            var degreeInput = document.getElementById("degree-".concat(i));
            var institutionInput = document.getElementById("institution-".concat(i));
            var yearInput = document.getElementById("year-".concat(i));
            if (degreeInput && institutionInput && yearInput) {
                education.push({
                    degree: degreeInput.value,
                    institution: institutionInput.value,
                    year: yearInput.value
                });
            }
        }
        var resumeData = {
            name: name,
            jobTitle: jobTitle,
            email: email,
            phone: phone,
            skills: skills,
            profilePicUrl: profilePicUrl,
            workExperience: workExperience,
            education: education
        };
        currentResumeData = resumeData;
        generateResume(resumeData);
    };
    if (profilePicFile) {
        reader.readAsDataURL(profilePicFile);
    }
    else {
        if (currentResumeData && currentResumeData.profilePicUrl) {
            var profilePicUrl = currentResumeData.profilePicUrl;
            // Collect work experience and education data as above
            var resumeData = {
                name: name,
                jobTitle: jobTitle,
                email: email,
                phone: phone,
                skills: skills,
                profilePicUrl: profilePicUrl,
                workExperience: currentResumeData.workExperience,
                education: currentResumeData.education
            };
            currentResumeData = resumeData;
            generateResume(resumeData);
        }
        else {
            alert('Please upload a profile picture.');
        }
    }
});
// Function to generate the resume and make it editable
function generateResume(data) {
    currentResumeData = data;
    var resumeSection = document.getElementById('resume');
    // Clear previous content
    resumeSection.innerHTML = '';
    // Generate Work Experience HTML
    var workExperienceHtml = '';
    data.workExperience.forEach(function (exp, index) {
        workExperienceHtml += "\n            <div class=\"work-item\">\n                               <p id=\"job-title-".concat(index + 1, "\" class=\"job-title\" contenteditable=\"true\">").concat(exp.jobTitle, "</p>\n\n                <p id=\"company-").concat(index + 1, "\" class=\"company\" contenteditable=\"true\">at ").concat(exp.company, "</p>\n                <p id=\"duration-").concat(index + 1, "\" class=\"duration\" contenteditable=\"true\">").concat(exp.duration, "</p>\n            </div>\n        ");
    });
    // Generate Education HTML
    var educationHtml = '';
    data.education.forEach(function (edu, index) {
        educationHtml += "\n            <div class=\"education-item\">\n                <p id=\"degree-".concat(index + 1, "\" class=\"degree\" contenteditable=\"true\"><strong>").concat(edu.degree, "</strong></p>\n                <p id=\"institution-").concat(index + 1, "\" class=\"institution\" contenteditable=\"true\">from ").concat(edu.institution, "</p>\n                <p id=\"year-").concat(index + 1, "\" class=\"year\" contenteditable=\"true\">").concat(edu.year, "</p>\n            </div>\n        ");
    });
    // Construct the resume HTML
    resumeSection.innerHTML = "\n        <div class=\"resume-details\">\n            <img src=\"".concat(data.profilePicUrl, "\" alt=\"Profile Picture\" class=\"profile-pic\">\n            <h2 id=\"name-section\">").concat(data.name, "</h2>\n            <h4 id=\"job-title-section\">").concat(data.jobTitle, "</h4>\n            <p id=\"email-section\">Email: ").concat(data.email, "</p>\n            <p id=\"phone-section\">Phone: ").concat(data.phone, "</p>\n\n            <h3>Skills</h3>\n            <p id=\"skills-section\">").concat(data.skills.join(', '), "</p>\n\n            <h3>Work Experience</h3>\n            ").concat(workExperienceHtml, "\n\n            <h3>Education</h3>\n            ").concat(educationHtml, "\n        </div>\n    ");
    // Enable in-place editing
    enableEditing(data);
}
// Function to enable in-place editing for each section
function enableEditing(data) {
    // Personal Information
    ['name-section', 'job-title-section', 'email-section', 'phone-section'].forEach(function (id) {
        var element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', function () {
                makeSectionEditable(id, element.innerText, function (newValue) {
                    switch (id) {
                        case 'name-section':
                            data.name = newValue;
                            break;
                        case 'job-title-section':
                            data.jobTitle = newValue;
                            break;
                        case 'email-section':
                            data.email = newValue;
                            break;
                        case 'phone-section':
                            data.phone = newValue;
                            break;
                    }
                });
            });
        }
    });
    // Skills
    var skillsElement = document.getElementById('skills-section');
    if (skillsElement) {
        skillsElement.addEventListener('click', function () {
            makeSectionEditable('skills-section', data.skills.join(', '), function (newValue) {
                data.skills = newValue.split(',').map(function (skill) { return skill.trim(); });
            });
        });
    }
    // Work Experience
    data.workExperience.forEach(function (exp, index) {
        var idx = index + 1;
        ['job-title', 'company', 'duration'].forEach(function (field) {
            var elementId = "".concat(field, "-").concat(idx);
            var element = document.getElementById(elementId);
            if (element) {
                element.addEventListener('click', function () {
                    makeSectionEditable(elementId, element.innerText, function (newValue) {
                        exp[field] = newValue;
                    });
                });
            }
        });
    });
    // Education
    data.education.forEach(function (edu, index) {
        var idx = index + 1;
        ['degree', 'institution', 'year'].forEach(function (field) {
            var elementId = "".concat(field, "-").concat(idx);
            var element = document.getElementById(elementId);
            if (element) {
                element.addEventListener('click', function () {
                    makeSectionEditable(elementId, element.innerText, function (newValue) {
                        edu[field] = newValue;
                    });
                });
            }
        });
    });
}
// Utility function to make a section editable
function makeSectionEditable(sectionId, initialValue, onSave) {
    var sectionElement = document.getElementById(sectionId);
    if (!sectionElement)
        return;
    var inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.value = initialValue;
    inputElement.style.width = '100%';
    sectionElement.innerHTML = '';
    sectionElement.appendChild(inputElement);
    inputElement.focus();
    inputElement.addEventListener('blur', function () {
        var newValue = inputElement.value;
        sectionElement.innerText = newValue;
        onSave(newValue);
    });
    inputElement.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            inputElement.blur();
        }
    });
}
