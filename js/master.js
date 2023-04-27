//Check if there is local-storage color option
let mainColor = localStorage.getItem("color_option");
if (mainColor !== null) {
    document.documentElement.style.setProperty('--mainColor', mainColor);
    //Check for active class
    document.querySelectorAll(".settings-container .colors-list li").forEach((el) => {
        if (el.dataset.color === mainColor) {
            if (!el.classList.contains("active"))
                el.classList.add("active");
        }
        else
            el.classList.remove("active");
    });
}
//Check on backgroundChange in  local-storage
let backgroundChange = localStorage.getItem('background-change');
if (backgroundChange !== null) {
    backgroundChange = backgroundChange === "true" ? true : false;
}
else {
    backgroundChange = true;
}
document.querySelectorAll('.random-background span').forEach(element => {
    if (element.dataset.background === 'yes') {
        if (backgroundChange === true)
            element.classList.contains('active') ? ' ' : element.classList.add('active');
        else
            element.classList.remove('active');
    }
    else {
        if (backgroundChange === false)
            element.classList.contains('active') ? ' ' : element.classList.add('active');
        else
            element.classList.remove('active');
    }
});
//Check on show bullets 
let showBullets = localStorage.getItem('show-bullets');
if (showBullets !== null) {
    let navBullets = document.querySelector('.nav-bullets');
    if (showBullets === 'true') {
        navBullets.style.display = 'block';
    }
    else
        navBullets.style.display = 'none';
    document.querySelectorAll('.option-box .show-bullets span').forEach(el => {
        if (showBullets === 'true') {
            if (el.classList.contains('yes'))
                el.classList.contains('active') ? '' : el.classList.add('active');
            else
                el.classList.remove('active');
        }
        else {
            if (el.classList.contains('no'))
                el.classList.contains('active') ? '' : el.classList.add('active');
            else
                el.classList.remove('active');
        }
    });
}
//Scroll to section Function
function scrollToSection(section) {
    if (section[0] != '.')
        section = `.${section}`;
    document.querySelector(section).scrollIntoView({
        behavior: 'smooth'
    });
}

//Navigate header area links
let headerLinks = document.querySelectorAll('.header-area .links li').forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection(e.target.dataset.section);
    });
});

// Nav-Bullets moves to section handling
let navBullets = document.querySelectorAll('.nav-bullets .bullet');
navBullets.forEach(element => {
    element.addEventListener('click', (e) => {
        scrollToSection(e.target.children[0].dataset.section);
    });
});

//Switch navigation bullets
document.querySelectorAll('.option-box .show-bullets span').forEach(el => {
    el.addEventListener('click', (e) => {
        e.target.parentElement.querySelectorAll('.active').forEach(el => {
            el.classList.remove('active');
        });
        e.target.classList.add('active');
        if (e.target.classList.contains('no')) {
            document.querySelector('.nav-bullets').style.display = 'none';
            localStorage.setItem('show-bullets', false);
        }
        else {
            document.querySelector('.nav-bullets').style.display = 'block';
            localStorage.setItem('show-bullets', true);
        }
    });
});


//Select landing page element
let landingPage = document.querySelector(".landing-page");
//Get Array of images
let imagesArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

//Toggle the settings window and spin gear
document.querySelector(".settings-box .icon").onclick = function () {
    this.children[0].classList.toggle("fa-spin");
    this.parentElement.classList.toggle("open");
};

//Switch Color
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((el) => {
    el.addEventListener("click", (e) => {
        //Set color on root 
        document.documentElement.style.setProperty('--mainColor', `${e.target.dataset.color}`);
        //remove active class from all li's
        colorsLi.forEach((el) => {
            if (el.classList.contains("active"))
                el.classList.remove("active");
        });
        //add active class to the current element
        e.target.classList.add("active");
        //Save the color to local storage
        localStorage.setItem('color_option', `${e.target.dataset.color}`);
    });
});



//Change background image url
let backgroundInterval;
function randomizeImages() {
    if (backgroundChange === true)
        backgroundInterval = setInterval(() => {
            let num = Math.floor(Math.random() * imagesArray.length);
            landingPage.style.backgroundImage = `url(\"images/${imagesArray[num]}\")`;
        }, 5000);
}
randomizeImages();

//Switch Background random option
const randomBackEl = document.querySelectorAll(".random-background span");
randomBackEl.forEach((el) => {
    el.addEventListener("click", (e) => {
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
        e.target.classList.add("active");

        if (e.target.dataset.background === 'yes') {
            backgroundChange = true;
            randomizeImages();
            localStorage.setItem('background-change', true);
        }
        else {
            backgroundChange = false;
            clearInterval(backgroundInterval);
            localStorage.setItem('background-change', false);
        }
    });

});

//Animate skills when reaching Skills Section
let ourSkills = document.querySelector('.skills');

window.onscroll = function () {
    //skills offset top
    let skillsOfsetTop = ourSkills.offsetTop;

    //skills Outer height 
    let skillsOuterHeight = ourSkills.offsetHeight;

    //Window Height
    let windowHeight = this.innerHeight;

    //window Scroll top
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOfsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll('.skills .skill-box .skill-progress span');
        allSkills.forEach(element => {
            element.style.width = element.dataset.progress;
        });
    }
};

//Make popup when clicking on  image
let ourGallery = document.querySelectorAll(".gallery .images-box img");

ourGallery.forEach(element => {
    element.addEventListener("click", (e) => {
        //Create Overlay
        let overlay = document.createElement('div');
        //Add class to overlay and append it to body
        overlay.className = 'popup-overlay';
        document.body.append(overlay);

        //Create popup
        let popUpBox = document.createElement('div');
        popUpBox.className = 'popup-box';

        //Add Heading Text
        if (element.alt !== null) {
            //Create Heading
            let popUpHeading = document.createElement('h3');
            //Create Text for heading
            let popUpHeadingText = document.createTextNode(element.alt);
            //append text to heading
            popUpHeading.appendChild(popUpHeadingText);
            //append heading to popUp box
            popUpBox.appendChild(popUpHeading);
        }

        //Create image
        let popUpImage = document.createElement('img');
        //Set image src
        popUpImage.src = element.src;
        //Add image to popUp box
        popUpBox.appendChild(popUpImage);

        //Create close button
        let popUpCloseBtn = document.createElement('i');
        popUpCloseBtn.className = "fa-solid fa-circle-xmark";
        popUpCloseBtn.classList.add('popup-close');
        popUpBox.append(popUpCloseBtn);

        //Append popup box to the body
        console.log(popUpBox);
        document.body.appendChild(popUpBox);
        popUpCloseBtn.addEventListener('click', () => {
            popUpBox.remove();
            overlay.remove();
        });
    });
});

//Reset button in settings box
document.querySelector('.settings-box .reset-option').onclick = () => {
    localStorage.removeItem('color_option');
    localStorage.removeItem('background-change');
    localStorage.removeItem('show-bullets');
    window.location.reload();
};
//Toggle Menu
let toggleButton = document.querySelector('.toggle-menu');
let tLinks = document.querySelector('.links');
toggleButton.onclick = function (e) {
    this.classList.toggle('menu-active');
    tLinks.classList.toggle('open');
    e.stopPropagation();
};
//Click any where outside menu and toggle button
document.addEventListener('click', (e) => {
    if (e.target !== toggleButton && e.target !== tLinks && e.target !== toggleButton) {
        if (toggleButton.classList.contains('menu-active')) {
            toggleButton.classList.remove('menu-active');
            tLinks.classList.remove('open');
        }
    }
});

