import { btns, trigoBtns, firstRowBtns } from "./data.js";
import varManager from "./manager.js"

/*
This is IIFE used to Design the Web Page 
*/

(
    function () {
        firstRowBtns.forEach(element => {
            let lastRow = document.querySelector(".row:last-child") as HTMLElement;
            lastRow.innerHTML += `<button id="${element.text}" class="${element.operation}">${element.text}</button>`;
        })


        btns.forEach(element => {

            if (varManager.getBtnCount() % varManager.getBtnPerRow() === 0) {
                varManager.changeInputContainer(`<div class="row"></div>`)
            }

            let lastRow = document.querySelector(".row:last-child") as HTMLElement;

            lastRow.innerHTML += `<button id="${element.text}" class="${element.operation}">${element.text}</button>`;

            varManager.btnCountIncrement();
        })

        let firstRow = document.querySelector(".input-container") as HTMLElement;

        let newDiv = document.createElement("div");
        newDiv.classList.add("row");
        newDiv.classList.add("new-row");


        // This is main Container for trigo functions
        let trigoDiv = document.createElement("div");
        trigoDiv.classList.add("trigo");

        //This is main Container for Function div
        let fnDiv = document.createElement("div");
        fnDiv.classList.add("fn");

        // this is trigo switch
        let trigoSwitch = document.createElement("p");
        trigoSwitch.innerHTML = `<i class="bi bi-triangle-half"></i>Trigonometry<i class="bi bi-caret-down-fill"></i>`;

        // This is Function Switch
        let fnSwitch = document.createElement("p")
        fnSwitch.innerHTML = `<i class="bi bi-triangle-half"></i>Functions<i class="bi bi-caret-down-fill"></i>`

        // this is div for all trigo options
        let trigoBtnOptions = document.createElement("div");
        trigoBtnOptions.classList.add("trigo-options");

        // this is div for all fn options
        let fnBtnOptions = document.createElement("div");
        fnBtnOptions.classList.add("fn-options");

        let trigobtnString = ""
        // this is to add trigo buttons to options
        trigoBtns.forEach((btn) => {
            trigobtnString += `<div>
            <button id=${btn.text} class=${btn.type}Btn>${btn.text}</button>
            </div>`
            // let newBtn = document.createElement("button");
            // newBtn.id = btn.text;
            // newBtn.innerHTML = btn.text
            // trigoBtnOptions.appendChild(newBtn)
            trigoBtnOptions.innerHTML = trigobtnString

        })


        // this is to handle display of trigo functions
        let showTrigo = false;
        trigoBtnOptions.style.display = "none";

        // appending all things in main trigo div
        trigoDiv.appendChild(trigoSwitch);
        trigoDiv.appendChild(trigoBtnOptions);

        // appending all things in main trigo div
        fnDiv.appendChild(fnSwitch);

        // this is to insert trigo at second line
        firstRow.insertBefore(newDiv, firstRow.childNodes[2]);
        newDiv.appendChild(trigoDiv)
        newDiv.appendChild(fnDiv)


        //hide and Show Trigo.
        let toggleTrigo = () => {

            if (showTrigo) {
                trigoBtnOptions.style.display = "none";
            }
            else {
                trigoBtnOptions.style.display = "inline-block";
            }
            showTrigo = !showTrigo
        }

        trigoSwitch.addEventListener("click", toggleTrigo)



        // this is code for adding click event to all the buttons
        let allButtons = document.querySelectorAll("button");

        allButtons.forEach(btn => {
            btn.addEventListener("click", varManager.clickCallback)
        })
    }
)();