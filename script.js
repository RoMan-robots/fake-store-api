$(async function () {
    await loadProducts();

    $('#sort').on('change', function () {
        sortProducts($(this).val());
    });

    $('#min, #max').on('change', function () {
        filterByPrice();
    });

    $('#category').on('change', function () {
        filterByCategory($(this).val());
    });

    async function loadProducts() {
        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/products');
            const data = await response.json();
            displayProducts(data);
        } catch (error) {
            console.error('Error loading products:', error);
        }
    }

    function displayProducts(data) {
        $('.products').empty();
        data.forEach(element => {
            $('.products').append(
                $('<div>')
                .addClass('product')
                
                .append($('<h3>').text(element.title))
                .append($('<p>').addClass('price').text(element.price + ' $'))
                .append($('<p>').addClass('description').text(element.description))
                .append($('<button>').text('Додати'))
                .append($('<img>').attr('src', element.images[0]))
                .append($('<p>').addClass('category-tag').text("Категорія: " + element.category.name))
            );
                
    });
    }
    
function sortProducts(value) {
    let products = [];
    $(".products .product").each(function () {
        products.push($(this));
    });

    if (value === 'category') {
        products.sort(function (a, b) {
            const categoryA = a.find('.category-tag').text();
            const categoryB = b.find('.category-tag').text();
            return categoryA.localeCompare(categoryB);
        });
    } else if (value === 'price') {
        products.sort(function (a, b) {
            const priceA = parseFloat(a.find('.price').text().replace(' $', ''));
            const priceB = parseFloat(b.find('.price').text().replace(' $', ''));
            return priceA - priceB;
        });
    }

    $('.products').empty();
    products.forEach(element => $('.products').append(element));
}

function filterByPrice() {
    const minPrice = parseFloat($('#min').val()) || 0;
    const maxPrice = parseFloat($('#max').val()) || Infinity;

    $('.product').each(function () {
        const price = parseFloat($(this).find('.price').text().replace(' $', ''));
        if (price >= minPrice && price <= maxPrice) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

function filterByCategory(category) {
    if (category === 'all') {
        $('.product').show();
    } else {
        $('.product').each(function () {
            const productCategory = $(this).find('.category-tag').text().replace('Категорія: ', '');
            if (productCategory === category) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
}
});