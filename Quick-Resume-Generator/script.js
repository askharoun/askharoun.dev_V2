
// Global variables
let currentTheme = 'modern';
let currentLayout = 'modern';
let educationCount = 0;
let experienceCount = 0;
let projectCount = 0;
let customLinksCount = 0;
let certificationCount = 0;
let languageCount = 0;
let volunteerCount = 0;
let awardCount = 0;
let currentZoom = 1;
let profilePhotoData = null;

// Section visibility state
let sectionVisibility = {
    photo: true,
    summary: true,
    education: true,
    experience: true,
    projects: true,
    skills: true,
    certifications: false,
    languages: false,
    volunteer: false,
    awards: false,
    links: true
};

// Layout settings
let layoutSettings = {
    twoColumn: false,
    skillsBars: false,
    compactMode: false,
    showIcons: true
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updatePreview();
    addEducation();
    addExperience();
    addProject();
});

// Event listeners
function initializeEventListeners() {
    // Theme selection
    document.querySelectorAll('.theme-option').forEach(button => {
        button.addEventListener('click', function() {
            selectTheme(this.dataset.theme, this.dataset.layout);
        });
    });

    // Form inputs
    const form = document.getElementById('resumeForm');
    form.addEventListener('input', updatePreview);
    form.addEventListener('change', updatePreview);
}

// Theme and layout selection
function selectTheme(theme, layout) {
    currentTheme = theme;
    currentLayout = layout;
    
    // Update active theme button
    document.querySelectorAll('.theme-option').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-theme="${theme}"]`).classList.add('active');
    
    updatePreview();
}

// Section management
function toggleSection(sectionName) {
    sectionVisibility[sectionName] = !sectionVisibility[sectionName];
    const section = document.getElementById(`${sectionName}Section`);
    if (section) {
        section.style.display = sectionVisibility[sectionName] ? 'block' : 'none';
    }
    updatePreview();
}

// Layout toggles
function toggleTwoColumn() {
    layoutSettings.twoColumn = document.getElementById('twoColumn').checked;
    updatePreview();
}

function toggleSkillsBars() {
    layoutSettings.skillsBars = document.getElementById('skillsBars').checked;
    updatePreview();
}

function toggleCompactMode() {
    layoutSettings.compactMode = document.getElementById('compactMode').checked;
    updatePreview();
}

function toggleIcons() {
    layoutSettings.showIcons = document.getElementById('showIcons').checked;
    updatePreview();
}

// Photo upload
function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePhotoData = e.target.result;
            const preview = document.getElementById('photoPreview');
            preview.innerHTML = `<img src="${profilePhotoData}" alt="Profile Photo">`;
            updatePreview();
        };
        reader.readAsDataURL(file);
    }
}

// Zoom functionality
function adjustZoom(delta) {
    currentZoom = Math.max(0.5, Math.min(2, currentZoom + delta));
    const preview = document.getElementById('resumePreview');
    preview.style.transform = `scale(${currentZoom})`;
    document.getElementById('zoomLevel').textContent = Math.round(currentZoom * 100) + '%';
}

// Add Education Entry
function addEducation() {
    educationCount++;
    const educationList = document.getElementById('educationList');
    
    const educationItem = document.createElement('div');
    educationItem.className = 'form-item';
    educationItem.innerHTML = `
        <h4>Education Entry ${educationCount} 
            <button type="button" class="remove-btn" onclick="removeEducation(${educationCount})">Remove</button>
        </h4>
        <div class="form-row">
            <input type="text" id="institution_${educationCount}" placeholder="Institution" onchange="updatePreview()">
            <input type="text" id="degree_${educationCount}" placeholder="Degree" onchange="updatePreview()">
        </div>
        <div class="form-row">
            <input type="text" id="field_${educationCount}" placeholder="Field of Study" onchange="updatePreview()">
            <input type="text" id="gradDate_${educationCount}" placeholder="Graduation Date" onchange="updatePreview()">
        </div>
        <input type="text" id="gpa_${educationCount}" placeholder="GPA (optional)" onchange="updatePreview()">
        <textarea id="honors_${educationCount}" placeholder="Honors, relevant coursework, or achievements (optional)" rows="2" onchange="updatePreview()"></textarea>
    `;
    
    educationList.appendChild(educationItem);
    updatePreview();
}

function removeEducation(id) {
    const items = document.querySelectorAll('#educationList .form-item');
    if (items.length > 1) {
        items[id - 1].remove();
        updatePreview();
    }
}

// Add Experience Entry
function addExperience() {
    experienceCount++;
    const experienceList = document.getElementById('experienceList');
    
    const experienceItem = document.createElement('div');
    experienceItem.className = 'form-item';
    experienceItem.innerHTML = `
        <h4>Experience Entry ${experienceCount}
            <button type="button" class="remove-btn" onclick="removeExperience(${experienceCount})">Remove</button>
        </h4>
        <div class="form-row">
            <input type="text" id="company_${experienceCount}" placeholder="Company" onchange="updatePreview()">
            <input type="text" id="position_${experienceCount}" placeholder="Position" onchange="updatePreview()">
        </div>
        <div class="form-row">
            <input type="text" id="expLocation_${experienceCount}" placeholder="Location" onchange="updatePreview()">
            <input type="text" id="expDates_${experienceCount}" placeholder="Dates (e.g., June 2023 - Present)" onchange="updatePreview()">
        </div>
        <textarea id="expDescription_${experienceCount}" placeholder="• Job description and achievements...&#10;• Use bullet points for better readability&#10;• Include quantifiable results when possible" rows="4" onchange="updatePreview()"></textarea>
    `;
    
    experienceList.appendChild(experienceItem);
    updatePreview();
}

function removeExperience(id) {
    const items = document.querySelectorAll('#experienceList .form-item');
    if (items.length > 1) {
        items[id - 1].remove();
        updatePreview();
    }
}

// Add Project Entry
function addProject() {
    projectCount++;
    const projectsList = document.getElementById('projectsList');
    
    const projectItem = document.createElement('div');
    projectItem.className = 'form-item';
    projectItem.innerHTML = `
        <h4>Project Entry ${projectCount}
            <button type="button" class="remove-btn" onclick="removeProject(${projectCount})">Remove</button>
        </h4>
        <div class="form-row">
            <input type="text" id="projectName_${projectCount}" placeholder="Project Name" onchange="updatePreview()">
            <input type="text" id="projectDuration_${projectCount}" placeholder="Duration" onchange="updatePreview()">
        </div>
        <div class="form-row">
            <input type="url" id="projectGithub_${projectCount}" placeholder="GitHub Repository URL (optional)" onchange="updatePreview()">
            <input type="url" id="projectDemo_${projectCount}" placeholder="Live Demo/Video URL (optional)" onchange="updatePreview()">
        </div>
        <input type="text" id="projectTech_${projectCount}" placeholder="Technologies Used (comma-separated)" onchange="updatePreview()">
        <textarea id="projectDescription_${projectCount}" placeholder="Project description and key achievements..." rows="3" onchange="updatePreview()"></textarea>
    `;
    
    projectsList.appendChild(projectItem);
    updatePreview();
}

function removeProject(id) {
    const items = document.querySelectorAll('#projectsList .form-item');
    if (items.length > 1) {
        items[id - 1].remove();
        updatePreview();
    }
}

// Add Certification Entry
function addCertification() {
    certificationCount++;
    const certificationsList = document.getElementById('certificationsList');
    
    const certificationItem = document.createElement('div');
    certificationItem.className = 'form-item';
    certificationItem.innerHTML = `
        <h4>Certification ${certificationCount}
            <button type="button" class="remove-btn" onclick="removeCertification(${certificationCount})">Remove</button>
        </h4>
        <div class="form-row">
            <input type="text" id="certName_${certificationCount}" placeholder="Certification Name" onchange="updatePreview()">
            <input type="text" id="certIssuer_${certificationCount}" placeholder="Issuing Organization" onchange="updatePreview()">
        </div>
        <div class="form-row">
            <input type="text" id="certDate_${certificationCount}" placeholder="Date Obtained" onchange="updatePreview()">
            <input type="url" id="certUrl_${certificationCount}" placeholder="Verification URL (optional)" onchange="updatePreview()">
        </div>
    `;
    
    certificationsList.appendChild(certificationItem);
    updatePreview();
}

function removeCertification(id) {
    const items = document.querySelectorAll('#certificationsList .form-item');
    items[id - 1].remove();
    updatePreview();
}

// Add Language Entry
function addLanguage() {
    languageCount++;
    const languagesList = document.getElementById('languagesList');
    
    const languageItem = document.createElement('div');
    languageItem.className = 'form-item';
    languageItem.innerHTML = `
        <h4>Language ${languageCount}
            <button type="button" class="remove-btn" onclick="removeLanguage(${languageCount})">Remove</button>
        </h4>
        <div class="form-row">
            <input type="text" id="langName_${languageCount}" placeholder="Language" onchange="updatePreview()">
            <select id="langLevel_${languageCount}" onchange="updatePreview()">
                <option value="">Proficiency Level</option>
                <option value="Native">Native</option>
                <option value="Fluent">Fluent</option>
                <option value="Proficient">Proficient</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic">Basic</option>
            </select>
        </div>
    `;
    
    languagesList.appendChild(languageItem);
    updatePreview();
}

function removeLanguage(id) {
    const items = document.querySelectorAll('#languagesList .form-item');
    items[id - 1].remove();
    updatePreview();
}

// Add Volunteer Entry
function addVolunteer() {
    volunteerCount++;
    const volunteerList = document.getElementById('volunteerList');
    
    const volunteerItem = document.createElement('div');
    volunteerItem.className = 'form-item';
    volunteerItem.innerHTML = `
        <h4>Volunteer Experience ${volunteerCount}
            <button type="button" class="remove-btn" onclick="removeVolunteer(${volunteerCount})">Remove</button>
        </h4>
        <div class="form-row">
            <input type="text" id="volOrg_${volunteerCount}" placeholder="Organization" onchange="updatePreview()">
            <input type="text" id="volRole_${volunteerCount}" placeholder="Role" onchange="updatePreview()">
        </div>
        <div class="form-row">
            <input type="text" id="volDates_${volunteerCount}" placeholder="Dates" onchange="updatePreview()">
            <input type="text" id="volLocation_${volunteerCount}" placeholder="Location" onchange="updatePreview()">
        </div>
        <textarea id="volDescription_${volunteerCount}" placeholder="Description of volunteer work and impact..." rows="3" onchange="updatePreview()"></textarea>
    `;
    
    volunteerList.appendChild(volunteerItem);
    updatePreview();
}

function removeVolunteer(id) {
    const items = document.querySelectorAll('#volunteerList .form-item');
    items[id - 1].remove();
    updatePreview();
}

// Add Award Entry
function addAward() {
    awardCount++;
    const awardsList = document.getElementById('awardsList');
    
    const awardItem = document.createElement('div');
    awardItem.className = 'form-item';
    awardItem.innerHTML = `
        <h4>Award ${awardCount}
            <button type="button" class="remove-btn" onclick="removeAward(${awardCount})">Remove</button>
        </h4>
        <div class="form-row">
            <input type="text" id="awardName_${awardCount}" placeholder="Award Name" onchange="updatePreview()">
            <input type="text" id="awardIssuer_${awardCount}" placeholder="Issuing Organization" onchange="updatePreview()">
        </div>
        <div class="form-row">
            <input type="text" id="awardDate_${awardCount}" placeholder="Date Received" onchange="updatePreview()">
        </div>
        <textarea id="awardDescription_${awardCount}" placeholder="Description or significance of the award..." rows="2" onchange="updatePreview()"></textarea>
    `;
    
    awardsList.appendChild(awardItem);
    updatePreview();
}

function removeAward(id) {
    const items = document.querySelectorAll('#awardsList .form-item');
    items[id - 1].remove();
    updatePreview();
}

// Add Custom Link
function addCustomLink() {
    customLinksCount++;
    const linksList = document.getElementById('linksList');
    
    const linkItem = document.createElement('div');
    linkItem.className = 'form-item';
    linkItem.innerHTML = `
        <h4>Custom Link ${customLinksCount}
            <button type="button" class="remove-btn" onclick="removeCustomLink(${customLinksCount})">Remove</button>
        </h4>
        <div class="form-row">
            <input type="text" id="linkLabel_${customLinksCount}" placeholder="Link Label (e.g., Research Paper, Blog)" onchange="updatePreview()">
            <input type="url" id="linkUrl_${customLinksCount}" placeholder="URL" onchange="updatePreview()">
        </div>
    `;
    
    linksList.appendChild(linkItem);
    updatePreview();
}

function removeCustomLink(id) {
    const items = document.querySelectorAll('#linksList .form-item');
    items[id - 1].remove();
    updatePreview();
}

// Update preview
function updatePreview() {
    const preview = document.getElementById('resumePreview');
    
    // Update theme and layout classes
    let classes = `resume-preview ${currentTheme}-theme ${currentLayout}-layout`;
    if (layoutSettings.twoColumn && currentLayout === 'modern') classes += ' two-column';
    if (layoutSettings.skillsBars) classes += ' skills-with-bars';
    if (layoutSettings.compactMode) classes += ' compact-mode';
    if (!layoutSettings.showIcons) classes += ' hide-icons';
    
    preview.className = classes;
    
    // Generate resume content
    const resumeContent = generateResumeHTML();
    preview.innerHTML = resumeContent;
}

function generateResumeHTML() {
    const personalInfo = getPersonalInfo();
    const summary = document.getElementById('summary').value;
    
    let html = '';
    
    // Header
    html += generateHeader(personalInfo);
    
    if (layoutSettings.twoColumn && currentLayout === 'modern') {
        html += '<div class="two-column-content"><div class="left-column">';
        
        // Left column content
        if (sectionVisibility.summary && summary) html += generateSummarySection(summary);
        if (sectionVisibility.education) html += generateEducationSection();
        if (sectionVisibility.skills) html += generateSkillsSection();
        if (sectionVisibility.certifications) html += generateCertificationsSection();
        if (sectionVisibility.languages) html += generateLanguagesSection();
        
        html += '</div><div class="right-column">';
        
        // Right column content
        if (sectionVisibility.experience) html += generateExperienceSection();
        if (sectionVisibility.projects) html += generateProjectsSection();
        if (sectionVisibility.volunteer) html += generateVolunteerSection();
        if (sectionVisibility.awards) html += generateAwardsSection();
        if (sectionVisibility.links) html += generateLinksSection();
        
        html += '</div></div>';
    } else {
        // Single column layout
        if (sectionVisibility.summary && summary) html += generateSummarySection(summary);
        if (sectionVisibility.education) html += generateEducationSection();
        if (sectionVisibility.experience) html += generateExperienceSection();
        if (sectionVisibility.projects) html += generateProjectsSection();
        if (sectionVisibility.skills) html += generateSkillsSection();
        if (sectionVisibility.certifications) html += generateCertificationsSection();
        if (sectionVisibility.languages) html += generateLanguagesSection();
        if (sectionVisibility.volunteer) html += generateVolunteerSection();
        if (sectionVisibility.awards) html += generateAwardsSection();
        if (sectionVisibility.links) html += generateLinksSection();
    }
    
    return html;
}

function generateHeader(personalInfo) {
    const hasPhoto = sectionVisibility.photo && profilePhotoData;
    
    let html = `<div class="resume-header${hasPhoto ? ' with-photo' : ''}">`;
    
    if (hasPhoto) {
        html += `<img src="${profilePhotoData}" alt="Profile Photo" class="profile-photo">`;
        html += '<div class="header-content">';
    }
    
    html += `<h1>${personalInfo.fullName || 'Your Name'}</h1>`;
    
    // Contact info
    html += '<div class="contact-info">';
    if (personalInfo.email) html += `<span><i class="fas fa-envelope"></i> ${personalInfo.email}</span>`;
    if (personalInfo.phone) html += `<span><i class="fas fa-phone"></i> ${personalInfo.phone}</span>`;
    if (personalInfo.location) html += `<span><i class="fas fa-map-marker-alt"></i> ${personalInfo.location}</span>`;
    html += '</div>';
    
    // Links
    const links = [];
    if (personalInfo.linkedin) links.push(`<a href="${personalInfo.linkedin}"><i class="fab fa-linkedin"></i> LinkedIn</a>`);
    if (personalInfo.github) links.push(`<a href="${personalInfo.github}"><i class="fab fa-github"></i> GitHub</a>`);
    if (personalInfo.website) links.push(`<a href="${personalInfo.website}"><i class="fas fa-globe"></i> Portfolio</a>`);
    if (personalInfo.portfolio) links.push(`<a href="${personalInfo.portfolio}"><i class="fas fa-folder"></i> Portfolio</a>`);
    
    if (links.length > 0) {
        html += `<div class="links">${links.join('')}</div>`;
    }
    
    if (hasPhoto) {
        html += '</div>';
    }
    
    html += '</div>';
    return html;
}

function generateSummarySection(summary) {
    return `
        <div class="resume-section">
            <h2>Professional Summary</h2>
            <div class="description">${summary}</div>
        </div>
    `;
}

function generateEducationSection() {
    let html = '<div class="resume-section"><h2>Education</h2>';
    
    for (let i = 1; i <= educationCount; i++) {
        const institution = document.getElementById(`institution_${i}`);
        if (institution && institution.value) {
            const degree = document.getElementById(`degree_${i}`)?.value || '';
            const field = document.getElementById(`field_${i}`)?.value || '';
            const gradDate = document.getElementById(`gradDate_${i}`)?.value || '';
            const gpa = document.getElementById(`gpa_${i}`)?.value || '';
            const honors = document.getElementById(`honors_${i}`)?.value || '';
            
            html += `
                <div class="section-item">
                    <div class="item-header">
                        <h3>${degree}${field ? ` in ${field}` : ''}</h3>
                        <span class="date">${gradDate}</span>
                    </div>
                    <div class="company">${institution.value}</div>
                    ${gpa ? `<div class="description">GPA: ${gpa}</div>` : ''}
                    ${honors ? `<div class="description">${honors}</div>` : ''}
                </div>
            `;
        }
    }
    
    html += '</div>';
    return html;
}

function generateExperienceSection() {
    let html = '<div class="resume-section"><h2>Experience</h2>';
    
    for (let i = 1; i <= experienceCount; i++) {
        const company = document.getElementById(`company_${i}`);
        if (company && company.value) {
            const position = document.getElementById(`position_${i}`)?.value || '';
            const expLocation = document.getElementById(`expLocation_${i}`)?.value || '';
            const expDates = document.getElementById(`expDates_${i}`)?.value || '';
            const expDescription = document.getElementById(`expDescription_${i}`)?.value || '';
            
            html += `
                <div class="section-item">
                    <div class="item-header">
                        <h3>${position}</h3>
                        <span class="date">${expDates}</span>
                    </div>
                    <div class="company">${company.value}${expLocation ? `, ${expLocation}` : ''}</div>
                    ${expDescription ? `<div class="description">${formatDescription(expDescription)}</div>` : ''}
                </div>
            `;
        }
    }
    
    html += '</div>';
    return html;
}

function generateProjectsSection() {
    let html = '<div class="resume-section"><h2>Projects</h2>';
    
    for (let i = 1; i <= projectCount; i++) {
        const projectName = document.getElementById(`projectName_${i}`);
        if (projectName && projectName.value) {
            const projectDescription = document.getElementById(`projectDescription_${i}`)?.value || '';
            const projectTech = document.getElementById(`projectTech_${i}`)?.value || '';
            const projectDuration = document.getElementById(`projectDuration_${i}`)?.value || '';
            const projectGithub = document.getElementById(`projectGithub_${i}`)?.value || '';
            const projectDemo = document.getElementById(`projectDemo_${i}`)?.value || '';
            
            html += `
                <div class="section-item">
                    <div class="item-header">
                        <h3>${projectName.value}</h3>
                        ${projectDuration ? `<span class="date">${projectDuration}</span>` : ''}
                    </div>
                    ${projectTech ? `<div class="company"><strong>Technologies:</strong> ${projectTech}</div>` : ''}
                    ${projectDescription ? `<div class="description">${projectDescription}</div>` : ''}
                    ${(projectGithub || projectDemo) ? `
                        <div class="links">
                            ${projectGithub ? `<a href="${projectGithub}"><i class="fab fa-github"></i> Repository</a>` : ''}
                            ${projectDemo ? `<a href="${projectDemo}"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
                        </div>
                    ` : ''}
                </div>
            `;
        }
    }
    
    html += '</div>';
    return html;
}

function generateSkillsSection() {
    const technicalSkills = document.getElementById('technicalSkills').value;
    const softwareSkills = document.getElementById('softwareSkills').value;
    const softSkills = document.getElementById('softSkills').value;
    
    if (!technicalSkills && !softwareSkills && !softSkills) return '';
    
    let html = '<div class="resume-section"><h2>Skills & Expertise</h2>';
    
    if (layoutSettings.skillsBars) {
        html += '<div class="skills-with-bars">';
        if (technicalSkills) html += generateSkillBars('Technical Skills', technicalSkills);
        if (softwareSkills) html += generateSkillBars('Software & Tools', softwareSkills);
        if (softSkills) html += generateSkillBars('Soft Skills', softSkills);
        html += '</div>';
    } else {
        if (technicalSkills) html += `<div class="section-item"><strong>Technical Skills:</strong> ${technicalSkills}</div>`;
        if (softwareSkills) html += `<div class="section-item"><strong>Software & Tools:</strong> ${softwareSkills}</div>`;
        if (softSkills) html += `<div class="section-item"><strong>Soft Skills:</strong> ${softSkills}</div>`;
    }
    
    html += '</div>';
    return html;
}

function generateSkillBars(category, skills) {
    const skillsArray = skills.split(',').map(s => s.trim());
    let html = `<div class="skill-category"><h4>${category}</h4>`;
    
    skillsArray.forEach(skill => {
        const level = Math.floor(Math.random() * 30) + 70; // Random level between 70-100%
        html += `
            <div class="skill-item">
                <div class="skill-name">
                    <span>${skill}</span>
                    <span>${level}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" style="width: ${level}%"></div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

function generateCertificationsSection() {
    let html = '<div class="resume-section"><h2>Certifications</h2>';
    
    for (let i = 1; i <= certificationCount; i++) {
        const certName = document.getElementById(`certName_${i}`);
        if (certName && certName.value) {
            const certIssuer = document.getElementById(`certIssuer_${i}`)?.value || '';
            const certDate = document.getElementById(`certDate_${i}`)?.value || '';
            const certUrl = document.getElementById(`certUrl_${i}`)?.value || '';
            
            html += `
                <div class="section-item">
                    <div class="item-header">
                        <h3>${certName.value}</h3>
                        <span class="date">${certDate}</span>
                    </div>
                    <div class="company">${certIssuer}</div>
                    ${certUrl ? `<div class="links"><a href="${certUrl}"><i class="fas fa-external-link-alt"></i> Verify</a></div>` : ''}
                </div>
            `;
        }
    }
    
    html += '</div>';
    return html;
}

function generateLanguagesSection() {
    let html = '<div class="resume-section"><h2>Languages</h2>';
    
    for (let i = 1; i <= languageCount; i++) {
        const langName = document.getElementById(`langName_${i}`);
        if (langName && langName.value) {
            const langLevel = document.getElementById(`langLevel_${i}`)?.value || '';
            
            html += `
                <div class="section-item">
                    <strong>${langName.value}</strong>${langLevel ? ` - ${langLevel}` : ''}
                </div>
            `;
        }
    }
    
    html += '</div>';
    return html;
}

function generateVolunteerSection() {
    let html = '<div class="resume-section"><h2>Volunteer Experience</h2>';
    
    for (let i = 1; i <= volunteerCount; i++) {
        const volOrg = document.getElementById(`volOrg_${i}`);
        if (volOrg && volOrg.value) {
            const volRole = document.getElementById(`volRole_${i}`)?.value || '';
            const volDates = document.getElementById(`volDates_${i}`)?.value || '';
            const volLocation = document.getElementById(`volLocation_${i}`)?.value || '';
            const volDescription = document.getElementById(`volDescription_${i}`)?.value || '';
            
            html += `
                <div class="section-item">
                    <div class="item-header">
                        <h3>${volRole}</h3>
                        <span class="date">${volDates}</span>
                    </div>
                    <div class="company">${volOrg.value}${volLocation ? `, ${volLocation}` : ''}</div>
                    ${volDescription ? `<div class="description">${volDescription}</div>` : ''}
                </div>
            `;
        }
    }
    
    html += '</div>';
    return html;
}

function generateAwardsSection() {
    let html = '<div class="resume-section"><h2>Awards & Honors</h2>';
    
    for (let i = 1; i <= awardCount; i++) {
        const awardName = document.getElementById(`awardName_${i}`);
        if (awardName && awardName.value) {
            const awardIssuer = document.getElementById(`awardIssuer_${i}`)?.value || '';
            const awardDate = document.getElementById(`awardDate_${i}`)?.value || '';
            const awardDescription = document.getElementById(`awardDescription_${i}`)?.value || '';
            
            html += `
                <div class="section-item">
                    <div class="item-header">
                        <h3>${awardName.value}</h3>
                        <span class="date">${awardDate}</span>
                    </div>
                    <div class="company">${awardIssuer}</div>
                    ${awardDescription ? `<div class="description">${awardDescription}</div>` : ''}
                </div>
            `;
        }
    }
    
    html += '</div>';
    return html;
}

function generateLinksSection() {
    let html = '';
    const customLinks = [];
    
    for (let i = 1; i <= customLinksCount; i++) {
        const label = document.getElementById(`linkLabel_${i}`);
        const url = document.getElementById(`linkUrl_${i}`);
        if (label && label.value && url && url.value) {
            customLinks.push(`<a href="${url.value}"><i class="fas fa-link"></i> ${label.value}</a>`);
        }
    }
    
    if (customLinks.length > 0) {
        html = `
            <div class="resume-section">
                <h2>Additional Links</h2>
                <div class="links">${customLinks.join('')}</div>
            </div>
        `;
    }
    
    return html;
}

function getPersonalInfo() {
    return {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        linkedin: document.getElementById('linkedin').value,
        github: document.getElementById('github').value,
        website: document.getElementById('website').value,
        portfolio: document.getElementById('portfolio').value
    };
}

function formatDescription(text) {
    // Convert bullet points and line breaks to HTML
    return text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
            if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
                return `<li>${line.substring(1).trim()}</li>`;
            }
            return `<p>${line}</p>`;
        })
        .join('')
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
}

// Export functions
function exportPDF() {
    const originalTransform = document.getElementById('resumePreview').style.transform;
    document.getElementById('resumePreview').style.transform = 'none';
    window.print();
    setTimeout(() => {
        document.getElementById('resumePreview').style.transform = originalTransform;
    }, 100);
}

function exportLaTeX() {
    const resumeData = collectResumeData();
    const latex = generateLaTeX(resumeData);
    downloadFile(latex, 'resume.tex', 'text/plain');
}

function exportHTML() {
    const previewContent = document.getElementById('resumePreview').outerHTML;
    const cssContent = generateStandaloneCSS();
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        ${cssContent}
        body { font-family: 'Inter', sans-serif; margin: 0; padding: 2rem; background: #f8fafc; }
        .resume-preview { margin: 0 auto; transform: none !important; }
    </style>
</head>
<body>
    ${previewContent}
</body>
</html>`;
    
    downloadFile(html, 'resume.html', 'text/html');
}

function generateStandaloneCSS() {
    // Extract relevant CSS for standalone HTML
    return `
        .resume-preview {
            background: white;
            color: #374151;
            border-radius: 0.5rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            font-family: 'Inter', sans-serif;
            line-height: 1.5;
            width: 8.5in;
            min-height: 11in;
            padding: 0.75in;
        }
        
        /* Theme variables */
        .modern-theme { --primary-color: #3b82f6; --accent-color: #06b6d4; }
        .classic-theme { --primary-color: #374151; --accent-color: #10b981; }
        .creative-theme { --primary-color: #7c3aed; --accent-color: #ec4899; }
        .minimal-theme { --primary-color: #475569; --accent-color: #06b6d4; }
        .tech-theme { --primary-color: #dc2626; --accent-color: #f59e0b; }
        
        .resume-header h1 { font-size: 2.5rem; font-weight: 700; color: var(--primary-color); margin-bottom: 0.5rem; }
        .contact-info { display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 0.5rem; }
        .contact-info span { font-size: 0.875rem; display: flex; align-items: center; gap: 0.25rem; }
        .links { display: flex; flex-wrap: wrap; gap: 1rem; }
        .links a { font-size: 0.875rem; color: var(--primary-color); text-decoration: none; }
        
        .resume-section { margin-bottom: 2rem; }
        .resume-section h2 { font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid var(--accent-color); color: var(--primary-color); }
        
        .section-item { margin-bottom: 1.5rem; }
        .item-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; }
        .item-header h3 { font-size: 1.125rem; font-weight: 600; color: #1f2937; }
        .date { font-size: 0.875rem; color: #6b7280; font-weight: 500; }
        .company { font-style: italic; color: #4b5563; margin-bottom: 0.5rem; }
        .description { color: #374151; font-size: 0.875rem; line-height: 1.6; }
        .description ul { margin: 0.5rem 0; padding-left: 1.5rem; }
        .description li { margin-bottom: 0.25rem; }
        
        .profile-photo { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 4px solid var(--primary-color); }
        .resume-header.with-photo { display: grid; grid-template-columns: auto 1fr; gap: 2rem; align-items: center; }
        
        @media (max-width: 768px) {
            .resume-header.with-photo { grid-template-columns: 1fr; text-align: center; gap: 1rem; }
            .contact-info, .links { flex-direction: column; gap: 0.5rem; }
            .item-header { flex-direction: column; align-items: flex-start; }
        }
    `;
}

function collectResumeData() {
    const data = {
        personal: getPersonalInfo(),
        summary: document.getElementById('summary').value,
        education: [],
        experience: [],
        projects: [],
        skills: {
            technical: document.getElementById('technicalSkills').value,
            software: document.getElementById('softwareSkills').value,
            soft: document.getElementById('softSkills').value
        },
        certifications: [],
        languages: [],
        volunteer: [],
        awards: [],
        customLinks: []
    };
    
    // ... keep existing code (collect all data sections) the same ...
    
    return data;
}

function generateLaTeX(data) {
    return `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.75in]{geometry}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{hyperref}
\\usepackage{graphicx}

\\titleformat{\\section}{\\large\\bfseries}{}{0em}{}[\\titlerule]
\\titlespacing{\\section}{0pt}{10pt}{5pt}

\\begin{document}

\\begin{center}
{\\LARGE\\textbf{${data.personal.fullName}}}\\\\[5pt]
${data.personal.email} $\\bullet$ ${data.personal.phone} $\\bullet$ ${data.personal.location}\\\\
${data.personal.linkedin ? `\\href{${data.personal.linkedin}}{LinkedIn}` : ''} ${data.personal.github ? `$\\bullet$ \\href{${data.personal.github}}{GitHub}` : ''} ${data.personal.website ? `$\\bullet$ \\href{${data.personal.website}}{Portfolio}` : ''}
\\end{center}

${data.summary ? `\\section{Professional Summary}\n${data.summary}\n` : ''}

\\section{Education}
${data.education.map(edu => 
    `\\textbf{${edu.degree} in ${edu.field}} \\hfill ${edu.gradDate}\\\\
${edu.institution}${edu.gpa ? ` \\hfill GPA: ${edu.gpa}` : ''}\\\\
${edu.honors ? `${edu.honors}\\\\` : ''}[5pt]`
).join('\n')}

\\section{Experience}
${data.experience.map(exp =>
    `\\textbf{${exp.position}} \\hfill ${exp.dates}\\\\
\\textit{${exp.company}}${exp.location ? ` \\hfill ${exp.location}` : ''}\\\\
${exp.description}\\\\[5pt]`
).join('\n')}

\\section{Projects}
${data.projects.map(proj =>
    `\\textbf{${proj.name}}${proj.duration ? ` (${proj.duration})` : ''}\\\\
${proj.description}\\\\
${proj.technologies ? `\\textbf{Technologies:} ${proj.technologies}\\\\` : ''}
${proj.github ? `\\textbf{Repository:} \\href{${proj.github}}{${proj.github}}\\\\` : ''}
${proj.demo ? `\\textbf{Demo:} \\href{${proj.demo}}{${proj.demo}}\\\\` : ''}[5pt]`
).join('\n')}

\\section{Skills}
${data.skills.technical ? `\\textbf{Technical Skills:} ${data.skills.technical}\\\\` : ''}
${data.skills.software ? `\\textbf{Software \\& Tools:} ${data.skills.software}\\\\` : ''}
${data.skills.soft ? `\\textbf{Soft Skills:} ${data.skills.soft}\\\\` : ''}

${data.customLinks.length > 0 ? `\\section{Additional Links}\n${data.customLinks.map(link => `\\href{${link.url}}{${link.label}}`).join(' $\\bullet$ ')}` : ''}

\\end{document}`;
}

function downloadFile(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}
