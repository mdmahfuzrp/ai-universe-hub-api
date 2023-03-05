// Loader before load every data
window.onload = function () {
    const parentDiv = document.getElementById('loader');
    const preloader = document.getElementById("loader-img");
    setTimeout(() => {
        parentDiv.style.display = 'none';
        preloader.style.display = 'none';
    }, 200);
    loadAiData(6);
};


// Api data loaded from here
const loadAiData = async (dataLimit, isSorting) => {
    try {
        const url = `https://openapi.programming-hero.com/api/ai/tools`;
        const res = await fetch(url);
        const allApiData = await res.json();
        displayAiData(allApiData.data.tools, dataLimit);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        console.log('Successfully execute');
    }
}

// Api data disply in dom
const displayAiData = (allAiData, dataLimit) => {
    // Parent div of all card
    const aiContainer = document.getElementById('ai-container');
    aiContainer.textContent = '';

    // Show all data or only 6 - Functionality is here
    const showAll = document.getElementById('show-all-data');
    if (dataLimit && allAiData.length > 6) {
        allAiData = allAiData.slice(0, 6);
        showAll.classList.remove('hidden');
    }
    else {
        showAll.classList.add('hidden');
    }

    // get individual data and set innerHTML from here
    allAiData.forEach(aiData => {

        // Create and append card for show in document of single api data
        const card = document.createElement('div');
        card.classList.add('dateDivs', 'card', 'p-5', 'w-full', 'bg-base-100', 'border');

        card.innerHTML = `
            <figure class="" style="height:200px;">
                <img src="${aiData.image}"
                    alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body p-0 mt-5 text-left">
                <h2 class="text-2xl font-semibold text-default-color">Features</h2>
                <ol class="pl-5 pb-3">
                    <li class="list-decimal">${aiData.features[0]}</li>
                    <li class="list-decimal">${aiData.features[1]}</li>
                    <li class="list-decimal">${aiData.features[2] ? aiData.features[2] : 'No data Found'}</li>
                </ol>
                <div class="border-t pt-4 flex items-center justify-between">
                    <div id="left">
                        <h2 class="text-2xl font-semibold text-default-color">${aiData.name}</h2>
                        <p class="pt-3"><i class="fa-solid fa-calendar-days mr-1"></i> <span class="myDate">${aiData.published_in}</span></p>
                    </div>
                    <label id="right-icon" onclick="aiDetails('${aiData.id}')" for="other-details" class="bg-red-100/50">
                        <i id="details-icon" class="fa-solid fa-arrow-right text-lg my-color"></i>
                    </label>
                </div>
            </div>
        `;
        // New element append here
        aiContainer.appendChild(card);
    });
}


// get ai detials from invidual ai api
const aiDetails = async (uniqueId) => {
    try {
        const individualAi = `https://openapi.programming-hero.com/api/ai/tool/${uniqueId}`;
        const res = await fetch(individualAi);
        const data = await res.json();
        displayAiDetails(data.data);
    }
    catch (error) {
        console.log(error);
    }
    finally{
        console.log('Successfully execute');
    }
}
// display ai details in modal
const displayAiDetails = aiDetails => {
    // For showing acuracy in modal right side
        let accuracy = aiDetails.accuracy.score + '';
        let newAccuracy = accuracy.replace('0.', '');
        let setAccuracy = '';
        if(newAccuracy === 'null'){
            setAccuracy = 'No accuracy found';
        }
        else{
            setAccuracy = newAccuracy + '% accuracy';
        }

    // Parent of card who have the ai more dtails
    const modalInfoParent = document.getElementById('modal-body');
    modalInfoParent.innerHTML = '';

    // Create a div for append all information of parentDive
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container', 'grid', 'grid-cols-1', 'lg:grid-cols-2', 'w-full', 'gap-5', 'p-2');

    modalContainer.innerHTML = `
        <div class="card p-5 w-full bg-red-50 border border-red-500" style="color: #585858;">
            <div class="card-body p-0 text-left">
                <h2 class="text-2xl font-semibold text-default-color">${aiDetails.description}</h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-5 mx-auto">
                    <div id="plan-box" class="plan-box bg-white rounded-xl">
                        <h3 class="text-lg font-bold text-green-500 text-center">${aiDetails?.pricing && aiDetails.pricing[0]?.price ? aiDetails.pricing[0].price : 'Free of Cost/'}</h3>
                        <h3 class="text-lg font-bold text-green-500 text-center">${aiDetails?.pricing && aiDetails.pricing[0]?.plan ? aiDetails.pricing[0].plan : 'Basic'}</h3>
                    </div>
                    <div id="plan-box" class="plan-box bg-white rounded-xl">
                        <h3 class="text-lg font-bold text-orange-400 text-center">${aiDetails?.pricing && aiDetails.pricing[1]?.price ? aiDetails.pricing[1].price : 'Free of Cost/'}</h3>
                        <h3 class="text-lg font-bold text-orange-400 text-center">${aiDetails?.pricing && aiDetails.pricing[1]?.plan ? aiDetails.pricing[1].plan : 'Pro'}</h3>
                    </div>
                    <div id="plan-box" class="plan-box bg-white rounded-xl">
                        <h3 class="text-lg font-bold text-red-500 text-center">${aiDetails?.pricing && aiDetails.pricing[2]?.price ? aiDetails.pricing[2].price : 'Free of Cost/'}</h3>
                        <h3 class="text-lg font-bold text-red-500 text-center">${aiDetails?.pricing && aiDetails.pricing[2]?.plan ? aiDetails.pricing[2].plan : 'Enterprice'}</h3>
                    </div>
                </div>
                <div class="flex gap-5">
                    <div id="modal-features">
                        <h1 class="text-2xl font-semibold pt-4 pb-3 text-default-color">Features</h1>
                        <ol class="pl-5">
                            <li class="list-disc">${aiDetails.features[1].feature_name}</li>
                            <li class="list-disc my-1">${aiDetails.features[2].feature_name}</li>
                            <li class="list-disc">${aiDetails.features[3].feature_name}</li>
                        </ol>
                    </div>
                    <div id="modal-integrations">
                        <h1 class="text-2xl font-semibold pt-4 pb-3 text-default-color">Integrations</h1>
                        <ol class="pl-5">
                            <li class="list-disc">${aiDetails.integrations && aiDetails.integrations[0] ? aiDetails.integrations[0] : 'No data Found'}</li>
                            <li class="list-disc">${aiDetails.integrations && aiDetails.integrations[1] ? aiDetails.integrations[1] : 'No data Found'}</li>
                            <li class="list-disc">${aiDetails.integrations && aiDetails.integrations[2] ? aiDetails.integrations[2] : 'No data Found'}</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <div class="card p-5 w-full bg-base-100 border">
            <figure class="relative">
                <button id="acuracy" class="btn my-bg-hover gap-2 border-none">
                    ${setAccuracy}
                </button>
                <img src="${aiDetails.image_link[0]}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body p-0 mt-5">
                <h2 class="text-2xl font-semibold text-center text-default-color">${aiDetails?.input_output_examples && aiDetails.input_output_examples[1]?.input ? aiDetails.input_output_examples[1].input : 'Can you give any example?'}</h2>
                <p class="text-center">${aiDetails?.input_output_examples && aiDetails.input_output_examples[0]?.output ? aiDetails.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
            </div>
        </div>
    `;
    modalInfoParent.appendChild(modalContainer);
}


// Show all ai card from here
const showAllBtn = document.getElementById('show-all-data');
showAllBtn.addEventListener('click', function () {
    loadAiData();
});

// Sort By Date and Show the display 
const sortByDate = ()=>{
    const cardContainer = document.getElementById('ai-container');
    const cards = Array.from(cardContainer.querySelectorAll('.dateDivs'));

    cards.sort((a, b) => {
        const dateA = new Date(a.querySelector('span').textContent);
        const dateB = new Date(b.querySelector('span').textContent);
        return dateA - dateB;
      });
      
    cards.forEach(card => cardContainer.appendChild(card));
}

// Sort by dat3 function calling via srot by date button
const sortByDataBtn = document.getElementById('sortByDataBtn');
sortByDataBtn.addEventListener('click', function(){
    sortByDate();
})