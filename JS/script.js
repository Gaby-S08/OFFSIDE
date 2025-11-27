// --- VARIÁVEIS GLOBAIS DE ESTADO ---
let cartItems = [];
let favItems = [];

// --- ELEMENTOS DO DOM ---
const cartButton = document.getElementById("cartButton");
const cartDropdown = document.getElementById("cartDropdown");
const cartList = document.getElementById("cartList");

const favButton = document.getElementById("favButton");
const favDropdown = document.getElementById("favDropdown");
const favList = document.getElementById("favList");

// --- FUNÇÕES DE RENDERIZAÇÃO ---

// Atualiza a lista de itens no dropdown do Carrinho
function renderCart() {
    if (!cartList) return; 
    if (cartItems.length === 0) {
        cartList.innerHTML = '<p style="text-align: center; color: #999;">Carrinho vazio.</p>';
        return;
    }

    cartList.innerHTML = cartItems.map(item => `
        <div class="dropdown-item">
            <span>${item.name}</span>
            <button class="remove-btn" data-id="${item.id}" data-type="cart">Remover</button>
        </div>
    `).join('');

    // Adiciona listener para remover itens do carrinho
    cartList.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', removeItem);
    });
}

// Atualiza a lista de itens no dropdown de Favoritos
function renderFav() {
    if (!favList) return;
    if (favItems.length === 0) {
        favList.innerHTML = '<p style="text-align: center; color: #999;">Ainda sem itens favoritos.</p>';
        return;
    }

    favList.innerHTML = favItems.map(item => `
        <div class="dropdown-item">
            <span>${item.name}</span>
            <button class="remove-btn" data-id="${item.id}" data-type="fav">Remover</button>
        </div>
    `).join('');
    
    // Adiciona listener para remover itens dos favoritos
    favList.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', removeItem);
    });
}

// --- LÓGICA DE INTERAÇÃO (Adicionar/Remover) ---

function addItem(id, name, type) {
    const item = { id, name };
    if (type === 'cart') {
        cartItems.push(item);
        renderCart();
        if(cartDropdown) cartDropdown.style.display = 'block';
        if(favDropdown) favDropdown.style.display = 'none';
    } else if (type === 'fav') {
        if (!favItems.some(i => i.id === id)) {
            favItems.push(item);
            renderFav();
        }
        if(favDropdown) favDropdown.style.display = 'block';
        if(cartDropdown) cartDropdown.style.display = 'none';
    }
}

function removeItem(event) {
    const button = event.target;
    const id = button.getAttribute('data-id');
    const type = button.getAttribute('data-type');
    
    if (type === 'cart') {
        const index = cartItems.findIndex(item => item.id === id);
        if (index > -1) {
            cartItems.splice(index, 1);
            renderCart();
        }
    } else if (type === 'fav') {
        favItems = favItems.filter(item => item.id !== id);
        renderFav();
    }
}

// --- LÓGICA DE ABERTURA DOS DROPDOWNS ---

function toggleDropdown(dropdownToToggle, otherDropdown) {
    if(!dropdownToToggle) return;
    const isVisible = dropdownToToggle.style.display === "block";
    dropdownToToggle.style.display = isVisible ? "none" : "block";
    if(otherDropdown) otherDropdown.style.display = "none";
}

if(cartButton) {
    cartButton.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleDropdown(cartDropdown, favDropdown);
    });
}

if(favButton) {
    favButton.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleDropdown(favDropdown, cartDropdown);
    });
}

// Fecha tudo ao clicar fora
document.addEventListener("click", (e) => {
    if (cartButton && cartDropdown && !cartButton.contains(e.target) && !cartDropdown.contains(e.target)) {
        cartDropdown.style.display = "none";
    }
    if (favButton && favDropdown && !favButton.contains(e.target) && !favDropdown.contains(e.target)) {
        favDropdown.style.display = "none";
    }
});


// --- LÓGICA DO CARROSSEL ---

function initializeItemActions(carousel) {
    carousel.querySelectorAll('.item').forEach(item => {
        const actionsContainer = item.querySelector('.item-actions');
        const id = item.getAttribute('data-id');
        const name = item.getAttribute('data-name');


        const cartHtml = `
            <button class="action-btn cart-action" title="Adicionar ao Carrinho">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </button>
        `;

        actionsContainer.innerHTML = cartHtml;

        // Adiciona evento apenas para o botão do carrinho
        const btnCart = actionsContainer.querySelector('.cart-action');
        if(btnCart){
            btnCart.addEventListener('click', (e) => {
                e.stopPropagation(); 
                addItem(id, name, 'cart');
            });
        }
    });
}

function setupCarouselScroll(id) {
    const carousel = document.getElementById(id);
    if (!carousel) return; 
    const wrap = carousel.parentElement;

    initializeItemActions(carousel);

    wrap.querySelectorAll('.btn-nav').forEach(btn => {
       
    });

    // Seletor genérico para os botões de navegação (prev/next) dentro do wrap
    const navButtons = wrap.querySelectorAll('button[data-action]');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const firstItem = carousel.querySelector('.item');
            if (!firstItem) return;

            const gap = parseFloat(getComputedStyle(carousel).gap || '0');
            const itemWidth = firstItem.getBoundingClientRect().width;
            const singleSlideWidth = itemWidth + gap;
            
            // AQUI ESTÁ A MUDANÇA: Sempre rola 3 itens
            const multiplier = 3; 
            const scrollAmount = singleSlideWidth * multiplier;

            if (btn.dataset.action === 'next') {
                carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            } else {
                carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        });
    });
}

// --- INICIALIZAÇÃO ---
window.onload = function() {
    setupCarouselScroll('carousel1');
    setupCarouselScroll('carousel2');
    setupCarouselScroll('carousel3'); // Remova se não tiver o carousel3 no HTML
    
    renderCart();
    renderFav();
};