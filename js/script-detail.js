document.addEventListener('DOMContentLoaded', () => {
    // Mengambil nama resep dari parameter URL
    const urlParams = new URLSearchParams(window.location.search);
    const recipeName = decodeURIComponent(urlParams.get('name'));

    // Ubah title halaman sesuai dengan nama resep
    document.title = `Resep ${recipeName}`;

    // Mengambil data dari file JSON eksternal untuk detail resep
    fetch('./json/detail-resep.json')
        .then(response => response.json())
        .then(data => {
            // Mencari resep berdasarkan nama
            const recipe = data.recipes.find(r => r.name === recipeName);

            if (recipe) {
                // Menampilkan nama resep
                document.getElementById('recipe-name').textContent = recipe.name;

                // Menampilkan gambar resep
                const recipeImage = document.getElementById('recipe-image');
                recipeImage.src = recipe.image;
                recipeImage.alt = recipe.name;

                // Menampilkan bahan-bahan
                const ingredientsList = document.getElementById('ingredients-list');
                recipe.ingredients.main.forEach(ingredient => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${ingredient.item} - ${ingredient.quantity}`;
                    ingredientsList.appendChild(listItem);
                });

                // Menampilkan bumbu halus
                const spicesList = document.getElementById('spices-list');
                recipe.ingredients.spices.forEach(spice => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${spice.item} - ${spice.quantity}`;
                    spicesList.appendChild(listItem);
                });

                // Menampilkan bahan pelengkap
                const garnishesList = document.getElementById('garnishes-list');
                recipe.ingredients.garnishes.forEach(garnish => {
                    const listItem = document.createElement('li');
                    listItem.textContent = garnish;
                    garnishesList.appendChild(listItem);
                });

                // Menampilkan langkah-langkah
                const stepsList = document.getElementById('steps-list');
                recipe.steps.forEach(step => {
                    const listItem = document.createElement('li');
                    listItem.textContent = step;
                    stepsList.appendChild(listItem);
                });

                // Menampilkan video tutorial
                const videoTutorial = document.getElementById('video-tutorial');
                videoTutorial.src = recipe.video_link;

                // Menambahkan Resep Lainnya
                addOtherRecipes(data.recipes, recipeName);
            } else {
                console.error('Recipe not found:', recipeName);
            }
        })
        .catch(error => console.error('Error fetching the recipe details:', error));
});

// Fungsi untuk menambahkan resep lainnya
function addOtherRecipes(recipes, currentRecipeName) {
    const otherRecipesContainer = document.getElementById('other-recipes');
    
    // Mengambil indeks resep saat ini
    const currentIndex = recipes.findIndex(recipe => recipe.name === currentRecipeName);
    const numberOfRecipes = recipes.length;
    const otherRecipes = [];

    // Mengambil 3 resep berikutnya
    for (let i = 1; i <= 3; i++) {
        // Hitung indeks dengan pembungkus (modulus) untuk kembali ke awal
        const nextIndex = (currentIndex + i) % numberOfRecipes;
        otherRecipes.push(recipes[nextIndex]);
    }

    otherRecipes.forEach(recipe => {
        const recipeCard = document.createElement('a');
        recipeCard.href = `detail-resep.html?name=${encodeURIComponent(recipe.name)}`;
        
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('recipe-card');

        const recipeImage = document.createElement('img');
        recipeImage.src = recipe.image;
        recipeImage.alt = recipe.name;

        const recipeName = document.createElement('p');
        recipeName.textContent = recipe.name;

        cardDiv.appendChild(recipeImage);
        cardDiv.appendChild(recipeName);
        recipeCard.appendChild(cardDiv);

        // Menambahkan resep lainnya ke kontainer
        otherRecipesContainer.appendChild(recipeCard);
    });
}

