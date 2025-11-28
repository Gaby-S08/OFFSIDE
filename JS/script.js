// --- VARIÁVEIS GLOBAIS ---
let cartItems = [];

// Aguarda o HTML carregar completamente
document.addEventListener("DOMContentLoaded", function() {
    
    // --- MENU MOBILE (HAMBÚRGUER) ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const menuLinks = document.getElementById('menu-links');

    if (mobileMenuBtn && menuLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            menuLinks.classList.toggle('active');
        });
    }

    // LÓGICA DO CARRINHO (ABRIR/FECHAR) 
    const btnCarrinho = document.getElementById('cartButton');
    const dropdownCarrinho = document.getElementById('cartDropdown');
    const listaCarrinho = document.getElementById('cartList');

    if (btnCarrinho && dropdownCarrinho) {
        btnCarrinho.addEventListener('click', (e) => {
            e.stopPropagation();
            if (dropdownCarrinho.style.display === 'block') {
                dropdownCarrinho.style.display = 'none';
            } else {
                dropdownCarrinho.style.display = 'block';
            }
        });

        // Fechar ao clicar fora
        document.addEventListener('click', (e) => {
            if (!btnCarrinho.contains(e.target) && !dropdownCarrinho.contains(e.target)) {
                dropdownCarrinho.style.display = 'none';
            }
        });
    }

    // FUNÇÕES DO CARRINHO (ADICIONAR/REMOVER) ---
    
    // Função para atualizar o visual da lista
    function renderCart() {
        if (!listaCarrinho) return;

        if (cartItems.length === 0) {
            listaCarrinho.innerHTML = '<p style="text-align: center; color: #fff;">Carrinho vazio.</p>';
            return;
        }

        // Gera o HTML de cada item
        listaCarrinho.innerHTML = cartItems.map((item, index) => `
            <div class="dropdown-item" style="display: flex; justify-content: space-between; margin-bottom: 10px; color: white;">
                <span>${item.name}</span>
                <button class="remove-btn" data-index="${index}" style="background: red; color: white; border: none; cursor: pointer; border-radius: 4px;">X</button>
            </div>
        `).join('');

        // Reativa os botões de remover
        const removeButtons = listaCarrinho.querySelectorAll('.remove-btn');
        removeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const indexToRemove = this.getAttribute('data-index');
                removeItem(indexToRemove);
            });
        });
    }

    // Função Global para Adicionar Item
    window.addItem = function(id, name) {
        // Adiciona ao array
        cartItems.push({ id, name });
        
        // Atualiza a lista visual
        renderCart();
        
        // Abre o carrinho automaticamente para mostrar que funcionou
        if (dropdownCarrinho) {
            dropdownCarrinho.style.display = 'block';
        }
    };

    // Função para Remover Item
    function removeItem(index) {
        cartItems.splice(index, 1); 
    }

    // CARROSSEL E BOTÕES DE COMPRA ---
    
    function setupCarousel(carouselId) {
        const carousel = document.getElementById(carouselId);
        if (!carousel) return;

        // Injeta os botões de "Adicionar" em cada item
        const items = carousel.querySelectorAll('.item');
        items.forEach(item => {
            const actionsContainer = item.querySelector('.item-actions');
            const id = item.getAttribute('data-id');
            const name = item.getAttribute('data-name');

            // HTML do botão de carrinho
            if (actionsContainer) {
                actionsContainer.innerHTML = `
                    <button class="action-btn cart-action" title="Adicionar ao Carrinho">
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    </button>
                `;

                // Adiciona o clique no botão que acabamos de criar
                const btnAdd = actionsContainer.querySelector('.cart-action');
                if (btnAdd) {
                    btnAdd.addEventListener('click', (e) => {
                        e.stopPropagation(); // Não deixa clicar na foto do produto
                        addItem(id, name);   // Chama a função de adicionar
                    });
                }
            }
        });

        //  Botões de Navegação (Setinhas)
        const wrap = carousel.parentElement;
        const prevBtn = wrap.querySelector('[data-action="prev"]');
        const nextBtn = wrap.querySelector('[data-action="next"]');

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                carousel.scrollBy({ left: -300, behavior: 'smooth' });
            });
            nextBtn.addEventListener('click', () => {
                carousel.scrollBy({ left: 300, behavior: 'smooth' });
            });
        }
    }

    // Inicializa todos os carrosseis
    setupCarousel('carousel1');
    setupCarousel('carousel2');
    setupCarousel('carousel3');

    // Inicializa o carrinho vazio
    renderCart();
});

// --- LÓGICA DO CARROSSEL ---

function initializeItemActions(carousel) {
    carousel.querySelectorAll('.item').forEach(item => {
        const actionsContainer = item.querySelector('.item-actions');
        const id = item.getAttribute('data-id');
        const name = item.getAttribute('data-name');

        // Cria o botão de Adicionar ao Carrinho
        const cartHtml = `
            <button class="action-btn cart-action" title="Adicionar ao Carrinho">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </button>
        `;

        actionsContainer.innerHTML = cartHtml;

        // Adiciona evento para o botão do carrinho
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

    // Inicializa os botões de ação (Carrinho) nos itens
    initializeItemActions(carousel);

    // Seletor genérico para os botões de navegação (prev/next) dentro do wrap
    const navButtons = wrap.querySelectorAll('button[data-action]');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const firstItem = carousel.querySelector('.item');
            if (!firstItem) return;

            // Pega o valor do CSS Custom Property --gap
            const rootStyle = getComputedStyle(document.documentElement);
            const gap = parseFloat(rootStyle.getPropertyValue('--gap')) || 0;
            
            const itemWidth = firstItem.getBoundingClientRect().width;
            const singleSlideWidth = itemWidth + gap;
            
            // Rola 3 itens 
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
    setupCarouselScroll('carousel3'); 
    
    renderCart();
};

//  MENU MOBILE (HAMBÚRGUER) ---
const mobileMenuBtn = document.getElementById('mobile-menu');
const menuLinks = document.getElementById('menu-links');

if (mobileMenuBtn && menuLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        // Isso aqui adiciona ou remove a classe "active" do CSS acima
        menuLinks.classList.toggle('active');
    });
}
