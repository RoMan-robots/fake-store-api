$(async function () {
    await fetch('https://api.escuelajs.co/api/v1/products')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(element => {
                let div = document.createElement('div');
                let img = document.createElement('img');
                let h3 = document.createElement('h3');
                let p2 = document.createElement('p');
                let p = document.createElement('p');
                let button = document.createElement('button');
                div.classList.add('product');
                img.src = element.images[0];
                h3.textContent = element.title;
                p.textContent = element.price + ' $';
                p2.textContent = element.description;
                button.textContent = 'Додати в кошик';
                button.addEventListener('click', () => {
                    let cart = document.querySelector('.cart');
                    let div = document.createElement('div');
                    let img = document.createElement('img');
                    let h3 = document.createElement('h3');
                    let p = document.createElement('p');
                    let p2 = document.createElement('p');
                    let button = document.createElement('button');
                    div.classList.add('product');
                    img.src = element.images[0];
                    h3.textContent = element.title;
                    p.textContent = element.price + ' $';
                    p2.textContent = element.description;
                    button.textContent = 'Прибрати з кошика';
                    button.addEventListener('click', () => {
                        div.remove();
                    });
                    div.appendChild(img);
                    div.appendChild(h3);
                    div.appendChild(p);
                    div.appendChild(button);
                    cart.appendChild(div);
                });
                div.appendChild(img);
                div.appendChild(h3);
                div.appendChild(p);
                div.appendChild(p2);
                div.appendChild(button);
                document.body.appendChild(div);
            });
        });
});