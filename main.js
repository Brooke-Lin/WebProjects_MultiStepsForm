// TODO: insert content dynamically, i.e. page title && description && plan types(yearly/monthly)

// TODO: insert classes dynamically

// TODO: switch button > radio button ?? input(radio).value

// TODO: in each step, plan must be selected to progress to the next

const nameInput = document.getElementById("name");
const mailInput = document.getElementById("mail");
const phoneInput = document.getElementById("phone");

const nameError= document.getElementById("name-error");
const mailError= document.getElementById("mail-error");
const phoneError= document.getElementById("phone-error");

const newOrder = {
    clientDetails:{
        name:'',
        email:'',
        phone:''
    },
    plan:{
        planTypes: '',
        planOptions: ''
    },
    addons:[],
    // push whatever been selected

    // remove(filter) whatever has been toggled off
    totalPrice: 0,
}

const newPlan = {
    yearly:{
        arcade: {
            price: 90
        },
        advanced: {
            price: 120
        },
        pro: {
            price: 150
        }
    },
    monthly:{
        arcade: {
            price: 9
        },
        advanced: {
            price: 12
        },
        pro: {
            price: 15
        }
    }
}



const newAddOns = {
    yearly:{
        onlineService:{
            price: 10
        },
        largerStorage:{
            price: 20
        },
        customizableProfile:{
            price: 20
        }
    },
    monthly:{
        onlineService:{
            price: 1
        },
        largerStorage:{
            price: 2
        },
        customizableProfile:{
            price: 2
        }
    } 
};
console.warn(newOrder);


console.log(newOrder.totalPrice + newAddOns.yearly.onlineService.price);

const personalInfo = document.querySelector("#personal-info");
let personalInfoPage = parseInt(personalInfo.dataset.page);

const selectPlan = document.querySelector("#select-plan");
let selectPlanPage = parseInt(selectPlan.dataset.page);

const addOns = document.querySelector("#add-ons");
let addOnsPage = parseInt(addOns.dataset.page);
//console.log(addOnsPage);

const summary = document.querySelector("#summary");
let summaryPage = parseInt(summary.dataset.page);

const thankYou = document.querySelector("#thank-you-page");
let thankYouPage = parseInt(thankYou.dataset.page);
// console.log(thankYouPage);



const pageContent = {
    page1:{
        title: "Personal info",
        description: "Please provide your name, email address, and phone number.",
    },
    page2:{
        title: "Select your plan",
        description: "You have the option of monthly or yearly billing.",
    },
    page3:{
        title: "Pick add-ons",
        description: "Add-ons help enhance your gaming experience.",
    },
    page4:{
        title: "Finishing up",
        description: "Double-check everything looks OK before confirming.",
    },
    page5:{
        title:"",
        description:"",
    }
}
const title = document.querySelector(".title");
const description = document.querySelector(".description");



//console.log(summaryPage);



let pageNumber = 1;
const MaxStep = 5;
const MinStep = 1;

const numberList = document.querySelectorAll(".number-list");
const nextStep = document.querySelector(".next-nav");
const prevStep = document.querySelector(".prev-nav");

init();

function init(){
    updateContent();
    updatePage();
}


nextStep.addEventListener("click", function(e){
    if(pageNumber === MinStep){
        if(!validatePersonalInfo()){ //if the personal info is false (not valid) 
            return; //prevent moving to the next step if valodation fails
        }
    }

    if (pageNumber === selectPlanPage) {
        const planOptions = document.querySelectorAll('input[name="plan-options"]');
        let selectedPlan = false;

        // Check if any radio button is checked
        for (const button of planOptions) { //The JavaScript for of statement loops through the values of an iterable object.
            if (button.checked) {
                selectedPlan = true;
                break; //The break statement "jumps out" of a loop.
            }
        }

        // If no plan is selected, prevent advancing and display message
        if (!selectedPlan) { //means "if selectedPlan is false"
            alert("Please select a plan before proceeding.");
            return;
        }
    }

    if(pageNumber == MaxStep){
        return;
    }else{
        pageNumber++;
    }
    updatePage();
    updateContent();
    updateButtonStates();
});


prevStep.addEventListener("click", function(e){
    if(pageNumber == MinStep){
        return
    }else{
        pageNumber--;
    }
    updatePage();
    updateContent();
    updateButtonStates();
});

const changeButton = document.querySelector(".change-button");
changeButton.addEventListener("click", function(){
//reset the previously selected plan option
    const radioButton = document.querySelectorAll('input[name="radio-button"]');
    radioButton.forEach(function(item){
        item.checked = false; //uncheck all radio buttons
    })

    const addOnServiceCheckboxes = document.querySelectorAll('#add-ons input[type="checkbox"]');
    addOnServiceCheckboxes.forEach(function(item){
        item.checked = false;
    });

    pageNumber = selectPlanPage; //automatically navigate back to page 2
    updatePage();
    updateContent();
    updateButtonStates();
});

    
function updatePage(){
    // console.log(pageNumber);
    //let the background color of the sidebar step change
    numberList.forEach(function(item, index){
        if(index + 1 === pageNumber){  
            item.classList.add("active");
        }else{
            item.classList.remove("active");
        }
    });

    //change page title and description
    const currentTitleAndDescription = pageContent[`page${pageNumber}`];
    title.textContent = currentTitleAndDescription.title;
    description.textContent = currentTitleAndDescription.description;
}

function updateContent(){
    console.warn("pageNumber:" ,pageNumber);
    //change the content on the page
    const contentDetails = document.querySelectorAll(".content-details");
    contentDetails.forEach(function(item){
        let currentPageData = parseInt(item.dataset.page)

        if(currentPageData === pageNumber){
            item.style.display = "grid";
            
        }else{
            item.style.display = "none";
        }
        
    })
}

function updateButtonStates(){
    // let the go back button of page 1 be disabled
    if(pageNumber > MinStep){
        prevStep.classList.remove("disabled");
    }else{
        prevStep.classList.add("disabled");
    }

    // change next step button text to "confirm" on page 4
    if(pageNumber === 4){
        nextStep.textContent = "Confirm";
    }else{
        nextStep.textContent = "Next Step";
    }

    // hide next step button and previous button on page 5
    if(pageNumber === MaxStep){
        nextStep.style.display = "none";
        prevStep.style.display = "none";
    } 
}

function validatePersonalInfo(){
    let isValid = true; //this variable will be used to track whether the personal info is valid or not

    if(nameInput.value.trim() === "") {
        nameError.style.display = "block";
        isValid = false;
    }else{
        newOrder.clientDetails.name = nameInput.value.trim();
        console.log(newOrder.clientDetails.name);
        nameError.style.display = "none";
    }

    const email = mailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //ensure the email address contains characters before and after the @ symbol, separated by a dot, and does not contain any whitespace
    if (email === "" || !emailRegex.test(email)) { //check if the email entered by the user is empty or does not match the defined email regular expression
        mailError.textContent = "Please enter a valid email address";
        mailError.style.display = "block";
        isValid = false;
    } else {
        newOrder.clientDetails.email = email;
        console.log(newOrder.clientDetails.email);
        mailError.style.display = "none";
    }

    /*if(mailInput.value.trim() === "") {
        mailError.style.display = "block";
        isValid = false;
    }else{
        mailError.style.display = "none";
    }*/

    if(phoneInput.value.trim() === "") {
        phoneError.style.display = "block";
        isValid = false;
    }else{
        newOrder.clientDetails.phone = phoneInput.value.trim();
        console.log(newOrder.clientDetails.phone);
        phoneError.style.display = "none";
    }

    return isValid; //if all fields are filled, it will return 'true'; if any field is empty, it will return 'false'
}







const planType = document.getElementById("toggle");
const arcadePrice = document.querySelector(".arcade-price");
const advancedPrice = document.querySelector(".advanced-price");
const proPrice = document.querySelector(".pro-price");
const planUnit = document.querySelectorAll(".plan-unit");
const annualFeePromotion = document.querySelectorAll(".annual-fee-promotion");

const onlineServicePrice = document.querySelector(".online-service-price");
const largerStoragePrice = document.querySelector(".larger-storage-price");
const customizableProfilePrice = document.querySelector(".customizable-profile-price");

const planTypeResult = document.getElementById("plan-type__result");
const planTypeTotalResult = document.getElementById("plan-type__total-result");
// console.log(onlineServicePrice, largerStoragePrice, customizableProfilePrice);


planType.addEventListener("change", function(){
    
    // save selected data
    let paymentType = planType.checked ? 'yearly' : 'monthly';
    newOrder.plan.planTypes = paymentType;
    console.log(newOrder);

    if(planType.checked){ //if toggle is checked (yearly), update prices, units, and promotion to yearly values
        arcadePrice.innerText = `$${newPlan.yearly.arcade.price}`;
        advancedPrice.innerText = `$${newPlan.yearly.advanced.price}`;
        proPrice.innerText = `$${newPlan.yearly.pro.price}`;

        onlineServicePrice.innerText = `+$${newAddOns.yearly.onlineService.price}`;
        largerStoragePrice.innerText = `+$${newAddOns.yearly.largerStorage.price}`;
        customizableProfilePrice.innerText = `+$${newAddOns.yearly.customizableProfile.price}`;

        planUnit.forEach(function(item){
            item.innerText = "yr";
        })
        annualFeePromotion.forEach(function(item){
            item.style.display = "block";
        })

        planTypeResult.innerText = "Yearly";//newOrder.plan.planType[0]; // hoping to return yearly
        planTypeTotalResult.innerText = "per year";

    }else{ //if toggle is not checked (monthly)
        arcadePrice.innerText = `$${newPlan.monthly.arcade.price}`;
        advancedPrice.innerText = `$${newPlan.monthly.advanced.price}`;
        proPrice.innerText = `$${newPlan.monthly.pro.price}`;

        onlineServicePrice.innerText = `+$${newAddOns.monthly.onlineService.price}`;
        largerStoragePrice.innerText = `+$${newAddOns.monthly.largerStorage.price}`;
        customizableProfilePrice.innerText = `+$${newAddOns.monthly.customizableProfile.price}`;

        planUnit.forEach(function(item){
            item.innerText = "mo";
        })
        annualFeePromotion.forEach(function(item){
            item.style.display = "none";
        })

        planTypeResult.innerText = "Monthly";//newOrder.plan.planType[1];
        planTypeTotalResult.innerText = "per month";
    }
});




function toCamelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) { 
        return index === 0 ? word.toLowerCase() : word.toUpperCase(); //check if the matched character is the first character of a word. If it is, it converts the character to lowercase. Otherwise, it converts it to uppercase.
    }).replace(/\s+/g, ''); //remove any spaces
}
//The replace() method searches a string for a value or a regular expression, returns a new string with the value(s) replaced, and does not change the original string.


function formatText(string) {
    // Split the string into words
    const words = string.split(/(?=[A-Z])/); // Split before capital letters
    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    // Join the words back together with a space between them
    return capitalizedWords.join(' ');
}




const addOnsCheckbox = document.querySelectorAll(".add-ons-checkbox");
console.log(addOnsCheckbox);

addOnsCheckbox.forEach(function(item) {
    item.addEventListener("change", function() {
        if (item.checked) {
            const formattedAddon = toCamelCase(item.value);
            newOrder.addons.push(formattedAddon);
        } else {
            newOrder.addons = newOrder.addons.filter(addon => addon !== toCamelCase(item.value));
        }
        updateAddOnsSummary();
        updateTotalPrice();
    });
});


function updateAddOnsSummary(){
    const addOnService = document.querySelectorAll(".add-on-service");
    const addOnPrice = document.querySelectorAll(".add-on-price");

    addOnService.forEach(function(addOnService, i) {
        if (newOrder.addons[i]) {
            const formattedText = formatText(newOrder.addons[i]);
            const price = getPriceForAddon(newOrder.addons[i]); // Function to get the price for the add-on
            addOnService.innerText = formattedText;
            addOnPrice[i].innerText = `+$${price}`;
            addOnService.parentElement.style.display = "flex";
        }else{
            addOnService.innerText = "";
            addOnPrice[i].innerText = "";
            addOnService.parentElement.style.display = "none";
        }  
    });
}


function getPriceForAddon(addon) {
    const planType = newOrder.plan.planTypes;
    return newAddOns[planType][addon].price;
}






function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Get a reference to the radio buttons
var planOptions = document.getElementsByName("plan-options");
console.log(planOptions);
const summaryPlanPrice = document.getElementById("summary__plan-price");
const totalPrice = document.querySelector(".total-price");


// Add event listeners to each radio button
planOptions.forEach(function(planOption) {
    planOption.addEventListener("change", function() {
        // Check which radio button is selected
        if (planOption.checked) {
            // Log the selected value to the console
            console.log("Selected value:", planOption.value);
            newOrder.plan.planOptions = planOption.value;
            console.log(newOrder);

            const planType = newOrder.plan.planTypes;
            const selectedOption = planOption.value;

            const planSelectionResult = document.getElementById("plan-selection__result");
            console.log(planSelectionResult);
            // Set inner text with first letter capitalized
            planSelectionResult.innerText = capitalizeFirstLetter(planOption.value);

            let price;

            if(planType == "yearly"){
                price = newPlan.yearly[selectedOption].price;
            }else{
                price = newPlan.monthly[selectedOption].price;
            }

            summaryPlanPrice.innerText = `$${price}`;

            updateTotalPrice();
            
        }
        
    });
});

function updateTotalPrice() {
    const planType = newOrder.plan.planTypes;
    const selectedOption = newOrder.plan.planOptions;

    let totalPrice = 0;

    // Add plan price
    if (planType === "yearly") {
        totalPrice += newPlan.yearly[selectedOption].price;
    } else {
        totalPrice += newPlan.monthly[selectedOption].price;
    }

    // Add add-on prices
    newOrder.addons.forEach(function(addon) {
        totalPrice += getPriceForAddon(addon);
    });

    // Update HTML element with total price
    const totalPriceElement = document.querySelector(".total-price");
    totalPriceElement.innerText = `$${totalPrice}`;
}

// Call the updateTotalPrice function initially to display the correct total price















































