
const store = {};
global.localStorage = {
  getItem: (k) => store[k] || null,
  setItem: (k, v) => { store[k] = v; },
  removeItem: (k) => { delete store[k]; }
};

global.window = global;
global.fetch = () => Promise.resolve({ ok: true, json: () => Promise.resolve([]) });

function createMockElem(tag = 'div') {
  return {
    tagName: tag.toUpperCase(),
    classList: { add: () => {}, remove: () => {}, toggle: () => {} },
    style: {},
    options: [{ value: 'Copacabana', text: 'Copacabana', getAttribute: () => '7.00' }],
    selectedIndex: 0,
    value: '',
    textContent: '',
    innerHTML: '',
    appendChild: () => {},
    setAttribute: () => {},
    getAttribute: () => '',
    querySelector: () => null,
    querySelectorAll: () => [],
    closest: () => null
  };
}

const elements = {};
global.document = {
  getElementById: (id) => {
    if (!elements[id]) elements[id] = createMockElem();
    return elements[id];
  },
  createElement: (tag) => createMockElem(tag),
  querySelectorAll: () => [],
  addEventListener: () => {}
};


    // ── PRODUCTS & CLOUD DATABASE ──
    const FIREBASE_BASE_URL = 'https://nauj-doceria-default-rtdb.firebaseio.com';

    const DEFAULT_PRODUCTS = [
  {
    "id": "pastel-ninho",
    "category": "Pastéis",
    "name": "Pastel de Ninho com Nutella",
    "description": "Massa artesanal de Leite Ninho recheada com Nutella pura e cremosa.",
    "price": 10.0,
    "image": "images/pastel-ninho-opt.jpg",
    "options": [
      "Sem morango",
      "Com morango (+R$ 2,00)"
    ],
    "featured": true,
    "tag": "Top 1 Favorito",
    "paused": false
  },
  {
    "id": "acai-garrafa",
    "category": "Açaí",
    "name": "Açaí de Garrafa Completo",
    "description": "Açaí artesanal super cremoso na garrafinha com adesivo oficial Nauj. Escolha o tamanho:",
    "price": 13.0,
    "image": "images/acai-garrafa-real.jpg",
    "options": [
      "300 ml",
      "500 ml (+R$ 3,00)"
    ],
    "featured": true,
    "tag": "Mais Vendido",
    "paused": false
  },
  {
    "id": "acai-copo",
    "category": "Açaí",
    "name": "Açaí no Copo Simples",
    "description": "Copo de açaí artesanal servido na hora. Escolha o tamanho e personalize com caldas e adicionais:",
    "price": 9.0,
    "image": "images/acai-copo-ninho-real.jpg",
    "options": [
      "300 ml",
      "500 ml (+R$ 6,00)",
      "770 ml (+R$ 10,00)"
    ],
    "featured": false,
    "tag": "",
    "paused": false
  },
  {
    "id": "batida-tradicional",
    "category": "Batidas",
    "name": "Batida Tradicional",
    "description": "Batida artesanal cremosa e refrescante (sem álcool). Sabores Morango ou Maracujá:",
    "price": 14.0,
    "image": "images/batidas-garrafa-real.jpg",
    "options": [
      "300 ml (Morango)",
      "300 ml (Maracujá)",
      "500 ml (Morango) (+R$ 3,00)",
      "500 ml (Maracujá) (+R$ 3,00)"
    ],
    "featured": false,
    "tag": "Sem Álcool",
    "paused": false
  },
  {
    "id": "batida-alcoolica",
    "category": "Batidas",
    "name": "Batida Alcoólica (+18)",
    "description": "Batida artesanal cremosa com toque alcoólico especial. Sabores Morango ou Maracujá:",
    "price": 16.0,
    "image": "images/batidas-garrafa-real.jpg",
    "options": [
      "300 ml (Morango)",
      "300 ml (Maracujá)",
      "500 ml (Morango) (+R$ 3,00)",
      "500 ml (Maracujá) (+R$ 3,00)"
    ],
    "ageRestricted": true,
    "featured": false,
    "tag": "+18",
    "paused": false
  },
  {
    "id": "coxinha-artesanal",
    "category": "Salgados",
    "name": "Coxinha Gourmet com Catupiry®",
    "description": "Massa crocante e sequinha recheada com recheio nobre e Catupiry® cremoso. Escolha o sabor:",
    "price": 12.0,
    "image": "images/coxinha-camarao-aberta.jpg",
    "options": [
      "Costela com Catupiry",
      "Camarão com Catupiry"
    ],
    "featured": true,
    "tag": "Crocante R$ 12",
    "paused": false
  }
];

    const ACAI_CALDAS = [
      { id: "calda-morango", name: "Calda de Morango", price: 0.00 },
      { id: "calda-condensado", name: "Leite Condensado", price: 0.00 },
      { id: "calda-chocolate", name: "Calda de Chocolate", price: 0.00 }
    ];

    const ACAI_COMPLEMENTS = [
      { id: "comp-leite-po", name: "Leite em Pó", price: 0.00 },
      { id: "comp-amendoim", name: "Amendoim", price: 0.00 },
      { id: "comp-granulado", name: "Granulado Colorido", price: 0.00 },
      { id: "comp-pacoca", name: "Paçoca", price: 0.00 },
      { id: "comp-nutella", name: "Nutella", price: 2.00 },
      { id: "comp-bis", name: "Bis (Branco ou Preto)", price: 1.00 },
      { id: "comp-fini", name: "Fini Dentadura", price: 2.00 },
      { id: "comp-kitkat", name: "KitKat", price: 2.00 },
      { id: "comp-condensado", name: "Leite Condensado", price: 2.00 }
    ];

    if (!localStorage.getItem('nauj_products_v7')) {
      localStorage.setItem('nauj_products_v7', JSON.stringify(DEFAULT_PRODUCTS));
    }
    if (!localStorage.getItem('nauj_caldas_v7')) {
      localStorage.setItem('nauj_caldas_v7', JSON.stringify(ACAI_CALDAS));
    }
    if (!localStorage.getItem('nauj_complements_v7')) {
      localStorage.setItem('nauj_complements_v7', JSON.stringify(ACAI_COMPLEMENTS));
    }

    let cart = [];
    const selectedOptionsMap = {};

    // DOM Elements
    const stickyCartBar = document.getElementById('stickyCartBar');
    const floatingWaBtn = document.getElementById('floatingWaBtn');
    const headerCartBadge = document.getElementById('headerCartBadge');
    const barQtyBubble = document.getElementById('barQtyBubble');
    const barItemCount = document.getElementById('barItemCount');
    const barTotalAmount = document.getElementById('barTotalAmount');
    const cartModal = document.getElementById('cartModal');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartModalTotal = document.getElementById('cartModalTotal');
    const toastMsg = document.getElementById('toastMsg');
    const toastText = document.getElementById('toastText');

    function toggleMobileDrawer() {
      document.getElementById('mobileDrawer').classList.toggle('open');
      document.getElementById('drawerOverlay').classList.toggle('open');
    }

    function applyStoreConfig() {
      const cfg = JSON.parse(localStorage.getItem('nauj_config_v7') || '{}');
      const waNumber = cfg.whatsappNumber || '5521976846682';
      const insta = cfg.instagram || '@nauj.doceria_';
      const hours = cfg.operatingHours || 'Segunda a Domingo, das 11h00 às 00h00';
      const delivery = cfg.deliveryText || 'Delivery no Rio de Janeiro e Retirada no Local';

      const waLinks = [
        document.getElementById('headerWaBtn'),
        document.getElementById('heroWaBtn'),
        document.getElementById('drawerWaBtn'),
        document.getElementById('floatingWaBtn'),
        document.getElementById('footerWaLink')
      ];

      const defaultMsg = encodeURIComponent('Olá! Vim pelo cardápio da Nauj Doceria e gostaria de fazer um pedido 🧁');
      waLinks.forEach(l => {
        if (l) l.href = `https://wa.me/${waNumber}?text=${defaultMsg}`;
      });

      const phoneLink = document.getElementById('infoPhoneLink');
      if (phoneLink) {
        phoneLink.href = `tel:+${waNumber}`;
        phoneLink.textContent = `+${waNumber.slice(0,2)} ${waNumber.slice(2,4)} ${waNumber.slice(4,9)}-${waNumber.slice(9)}`;
      }

      const instaLink = document.getElementById('footerInstaLink');
      if (instaLink) {
        instaLink.textContent = `📸 Instagram: ${insta}`;
        instaLink.href = `https://www.instagram.com/${insta.replace('@','')}`;
      }

      if (document.getElementById('infoHoursText')) document.getElementById('infoHoursText').textContent = hours;
      if (document.getElementById('infoDeliveryText')) document.getElementById('infoDeliveryText').textContent = delivery;

      const closedBanner = document.getElementById('closedBanner');
      if (closedBanner) {
        if (cfg.isOpen === false) closedBanner.classList.add('show');
        else closedBanner.classList.remove('show');
      }
    }

    // ── DYNAMIC CATALOG RENDERING ──
    let activeCategory = 'todos';

    function filterCategory(catName, btnEl) {
      activeCategory = catName;
      document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
      btnEl.classList.add('active');

      const blocks = document.querySelectorAll('.category-block');
      blocks.forEach(block => {
        const cat = block.getAttribute('data-category');
        if (activeCategory === 'todos' || cat === activeCategory) {
          block.classList.remove('hidden');
        } else {
          block.classList.add('hidden');
        }
      });
    }

    function renderDynamicCatalog() {
      const products = JSON.parse(localStorage.getItem('nauj_products_v7') || '[]');
      const activeProducts = products.filter(p => !p.paused);

            // Featured Section (Only displays if items are explicitly marked as featured)
      const featuredSection = document.getElementById('secao-destaques');
      const featuredGrid = document.getElementById('featuredGridDynamic');
      const featuredItems = activeProducts.filter(p => p.featured);

      if (featuredSection && featuredGrid) {
        if (featuredItems.length === 0) {
          featuredSection.style.display = 'none';
        } else {
          featuredSection.style.display = 'block';
          featuredGrid.innerHTML = featuredItems.map(p => {
            const tagText = p.tag || 'Destaque';
            const optionsHtml = p.options && p.options.length ? `
              <div class="variant-selector-wrap" data-prod-id="feat-${p.id}" style="margin-top:12px;">
                <span class="variant-prompt">Opções:</span>
                <div class="variant-options-list">
                  ${p.options.map((opt, i) => `
                    <button type="button" class="option-chip ${i === 0 ? 'selected' : ''}" onclick="selectOptionChip(this, '${p.id}', '${opt}', ${p.price}, 'feat-price-${p.id}')">
                      ${opt}
                    </button>
                  `).join('')}
                </div>
              </div>
            ` : '';

            return `
              <article class="featured-product-card">
                ${tagText ? `<span class="featured-badge-top">${tagText}</span>` : ''}
                <div class="product-img-box">
                  <img src="${p.image || 'images/pastel-ninho-opt.jpg'}" alt="${p.name}" class="product-img-elem">
                </div>
                <div class="featured-card-body">
                  <div>
                    <h3 class="product-title">${p.name}</h3>
                    <p class="product-description" style="margin-top:4px;">${p.description || ''}</p>
                    ${optionsHtml}
                  </div>

                  <div class="product-footer-row">
                    <div class="product-price-tag">
                      <span class="price-label">Preço</span>
                      <span class="price-value" id="feat-price-${p.id}">R$ ${(parseFloat(p.price) || 0).toFixed(2).replace('.', ',')}</span>
                    </div>
                    <button class="btn-add-item" onclick="handleAddProductToCart('${p.id}')">
                      <span>+ Adicionar</span>
                    </button>
                  </div>
                </div>
              </article>
            `;
          }).join('');
        }
      }

      // Group full menu by categories
      const categories = ['Pastéis', 'Açaí', 'Batidas', 'Salgados', 'Outros'];
      const menuContainer = document.getElementById('fullMenuContainer');
      if (menuContainer) {
        menuContainer.innerHTML = '';

        categories.forEach(cat => {
          const catProducts = activeProducts.filter(p => p.category === cat);
          if (catProducts.length === 0) return;

          const block = document.createElement('div');
          block.className = 'category-block' + (activeCategory !== 'todos' && activeCategory !== cat ? ' hidden' : '');
          block.setAttribute('data-category', cat);

          const itemsHtml = catProducts.map(p => {
            const optionsHtml = p.options && p.options.length ? `
              <div class="variant-selector-wrap" data-prod-id="menu-${p.id}">
                <span class="variant-prompt">Escolha sua opção:</span>
                <div class="variant-options-list">
                  ${p.options.map((opt, i) => `
                    <button type="button" class="option-chip ${i === 0 ? 'selected' : ''}" onclick="selectOptionChip(this, '${p.id}', '${opt}', ${p.price}, 'menu-price-${p.id}')">
                      ${opt}
                    </button>
                  `).join('')}
                </div>
              </div>
            ` : '';

            return `
              <div class="menu-card">
                <div class="card-main-content">
                  <div class="card-photo-box">
                    <img src="${p.image || 'images/pastel-ninho-opt.jpg'}" alt="${p.name}" class="card-photo-img">
                  </div>
                  <div class="card-info">
                    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:2px;">
                      ${p.ageRestricted ? '<span class="badge-18">🔞 Venda proibida -18</span>' : ''}
                      ${p.tag ? `<span style="font-size:0.68rem;font-weight:800;background:var(--color-rose-soft);color:var(--color-terracotta);padding:2px 8px;border-radius:var(--radius-full);text-transform:uppercase;letter-spacing:0.5px;">${p.tag}</span>` : ''}
                    </div>
                    <h4 class="card-name">${p.name}</h4>
                    <p class="card-desc">${p.description || ''}</p>
                  </div>
                </div>

                ${optionsHtml}

                <div class="card-action-bar">
                  <span class="card-price-display" id="menu-price-${p.id}">R$ ${(parseFloat(p.price) || 0).toFixed(2).replace('.', ',')}</span>
                  <button class="btn-card-add" onclick="handleAddProductToCart('${p.id}')">
                    <span>+ Adicionar</span>
                  </button>
                </div>
              </div>
            `;
          }).join('');

          block.innerHTML = `
            <div class="category-header">
              <h3 class="category-title">${cat}</h3>
              <span class="category-count">${catProducts.length} ${catProducts.length === 1 ? 'item' : 'itens'}</span>
            </div>
            <div class="menu-items-grid">
              ${itemsHtml}
            </div>
          `;

          menuContainer.appendChild(block);
        });
      }
    }

    function selectOptionChip(chipBtn, productId, optionText, basePrice, priceDisplayId) {
      const parent = chipBtn.closest('.variant-options-list');
      parent.querySelectorAll('.option-chip').forEach(c => c.classList.remove('selected'));
      chipBtn.classList.add('selected');

      let extra = 0;
      const match = optionText.match(/\+\s*R\$\s*([0-9]+(?:[,.][0-9]+)?)/i);
      if (match) {
        extra = parseFloat(match[1].replace(',', '.'));
      }

      const finalPrice = basePrice + extra;
      selectedOptionsMap[productId] = {
        option: optionText,
        price: finalPrice
      };

      const display = document.getElementById(priceDisplayId);
      if (display) {
        display.textContent = 'R$ ' + finalPrice.toFixed(2).replace('.', ',');
      }
    }

    function handleAddProductToCart(productId) {
      const products = JSON.parse(localStorage.getItem('nauj_products_v7') || '[]');
      const item = products.find(p => p.id === productId);
      if (!item) return;

      if (item.category === 'Açaí' || item.name.toLowerCase().includes('açaí') || item.name.toLowerCase().includes('acai')) {
        openAcaiCustomizer(productId);
        return;
      }

      const selected = selectedOptionsMap[productId] || {
        option: (item.options && item.options.length ? item.options[0] : ''),
        price: parseFloat(item.price)
      };

      const key = item.name + (selected.option ? ' - ' + selected.option : '');
      const existing = cart.find(i => i.key === key);

      if (existing) {
        existing.qty++;
      } else {
        cart.push({
          key,
          id: item.id,
          name: item.name,
          variant: selected.option,
          price: selected.price,
          qty: 1
        });
      }

      renderCart();
      showToast('"' + item.name + '" adicionado!');
    }

        // ── AÇAÍ CUSTOMIZER ──
    let currentCustomizingProduct = null;
    let selectedCaldas = [];
    let selectedComplements = [];

    function getCleanArray(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) return fallback;
        const parsed = JSON.parse(raw);
        if (!parsed) return fallback;
        return Array.isArray(parsed) ? parsed : Object.values(parsed);
      } catch (e) {
        return fallback;
      }
    }

    function openAcaiCustomizer(productId) {
      try {
        const products = getCleanArray('nauj_products_v7', DEFAULT_PRODUCTS);
        let item = products.find(p => p.id === productId);
        if (!item) {
          item = DEFAULT_PRODUCTS.find(p => p.id === productId) || products[0];
        }
        if (!item) return;

        const selectedOpt = selectedOptionsMap[productId] || {
          option: (item.options && item.options.length ? item.options[0] : ''),
          price: parseFloat(item.price) || 0
        };

        currentCustomizingProduct = {
          ...item,
          selectedOption: selectedOpt.option,
          basePrice: parseFloat(selectedOpt.price) || parseFloat(item.price) || 0
        };

        selectedCaldas = [];
        selectedComplements = [];

        const obsEl = document.getElementById('acaiModalObs');
        if (obsEl) obsEl.value = '';

        const titleEl = document.getElementById('acaiModalTitle');
        if (titleEl) titleEl.textContent = item.name + (selectedOpt.option ? ' (' + selectedOpt.option + ')' : '');

        const subEl = document.getElementById('acaiModalSubtitle');
        if (subEl) subEl.textContent = 'Preço base: R$ ' + (parseFloat(selectedOpt.price) || parseFloat(item.price) || 0).toFixed(2).replace('.', ',');

        renderAcaiOptions();
        updateAcaiModalTotal();

        const overlay = document.getElementById('acaiModalOverlay');
        if (overlay) {
          overlay.classList.add('open');
        }
      } catch (err) {
        console.error('Error opening Açaí modal:', err);
      }
    }

    function renderAcaiOptions() {
      const caldas = getCleanArray('nauj_caldas_v7', ACAI_CALDAS);
      const comps = getCleanArray('nauj_complements_v7', ACAI_COMPLEMENTS);

      const caldasGrid = document.getElementById('caldasListGrid');
      if (caldasGrid) {
        caldasGrid.innerHTML = caldas.map(c => {
          const isSelected = selectedCaldas.some(item => item.id === c.id || item.name === c.name);
          const priceLabel = parseFloat(c.price) > 0 ? `+R$ ${parseFloat(c.price).toFixed(2).replace('.',',')}` : 'Grátis';
          return `
            <button type="button" class="complement-item-btn ${isSelected ? 'selected' : ''}" onclick="toggleCalda('${c.id || c.name}')">
              <div>
                <div class="comp-name">${c.name}</div>
                <div class="comp-price">${priceLabel}</div>
              </div>
              <span class="comp-check-icon">✓</span>
            </button>
          `;
        }).join('');
      }

      const compsGrid = document.getElementById('complementsListGrid');
      if (compsGrid) {
        compsGrid.innerHTML = comps.map(comp => {
          const isSelected = selectedComplements.some(c => c.id === comp.id || c.name === comp.name);
          const priceLabel = parseFloat(comp.price) > 0 ? `+R$ ${parseFloat(comp.price).toFixed(2).replace('.',',')}` : 'Grátis';

          return `
            <button type="button" class="complement-item-btn ${isSelected ? 'selected' : ''}" onclick="toggleComplement('${comp.id || comp.name}')">
              <div>
                <div class="comp-name">${comp.name}</div>
                <div class="comp-price">${priceLabel}</div>
              </div>
              <span class="comp-check-icon">✓</span>
            </button>
          `;
        }).join('');
      }
    }

    function toggleCalda(caldaId) {
      const caldas = getCleanArray('nauj_caldas_v7', ACAI_CALDAS);
      const calda = caldas.find(c => c.id === caldaId || c.name === caldaId);
      if (!calda) return;

      const idx = selectedCaldas.findIndex(c => c.id === caldaId || c.name === caldaId);
      if (idx >= 0) {
        selectedCaldas.splice(idx, 1);
      } else {
        selectedCaldas.push(calda);
      }

      renderAcaiOptions();
      updateAcaiModalTotal();
    }

    function toggleComplement(compId) {
      const comps = getCleanArray('nauj_complements_v7', ACAI_COMPLEMENTS);
      const comp = comps.find(c => c.id === compId || c.name === compId);
      if (!comp) return;

      const idx = selectedComplements.findIndex(c => c.id === compId || c.name === compId);
      if (idx >= 0) {
        selectedComplements.splice(idx, 1);
      } else {
        selectedComplements.push(comp);
      }

      renderAcaiOptions();
      updateAcaiModalTotal();
    }

    function updateAcaiModalTotal() {
      if (!currentCustomizingProduct) return;
      const base = parseFloat(currentCustomizingProduct.basePrice || currentCustomizingProduct.price) || 0;
      const extras = selectedComplements.reduce((sum, c) => sum + (parseFloat(c.price) || 0), 0);
      const total = base + extras;
      document.getElementById('acaiModalTotalDisplay').textContent = 'R$ ' + total.toFixed(2).replace('.', ',');
    }

    function confirmAcaiWithComplements() {
      if (!currentCustomizingProduct) return;

      const item = currentCustomizingProduct;
      const base = parseFloat(item.basePrice || item.price) || 0;
      const extras = selectedComplements.reduce((sum, c) => sum + (parseFloat(c.price) || 0), 0);
      const finalPrice = base + extras;

      const caldasNames = selectedCaldas.map(c => c.name);
      const compsNames = selectedComplements.map(c => c.name);
      const obs = document.getElementById('acaiModalObs').value.trim();

      let parts = [];
      if (item.selectedOption) parts.push('Tamanho: ' + item.selectedOption);
      if (caldasNames.length > 0) parts.push('Caldas: ' + caldasNames.join(', '));
      if (compsNames.length > 0) parts.push('Complementos: ' + compsNames.join(', '));
      if (parts.length === 0) parts.push('Sem adicionais');
      if (obs) parts.push(`Obs: ${obs}`);

      const variantStr = parts.join(' | ');
      const key = `${item.name} [${variantStr}]`;
      const existing = cart.find(i => i.key === key);

      if (existing) {
        existing.qty++;
      } else {
        cart.push({
          key,
          id: item.id,
          name: item.name,
          variant: variantStr,
          price: finalPrice,
          qty: 1
        });
      }

      renderCart();
      closeAcaiModal();
      showToast('"' + item.name + '" adicionado ao pedido!');
    }

    function updateItemQty(key, delta) {
      const item = cart.find(i => i.key === key);
      if (!item) return;

      item.qty += delta;
      if (item.qty <= 0) {
        cart = cart.filter(i => i.key !== key);
      }
      renderCart();
    }

        function renderCart() {
      try {
        const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        const formattedTotal = 'R$ ' + totalPrice.toFixed(2).replace('.', ',');

        if (headerCartBadge) {
          if (totalQty > 0) {
            headerCartBadge.textContent = totalQty;
            headerCartBadge.classList.add('active');
          } else {
            headerCartBadge.classList.remove('active');
          }
        }

        if (stickyCartBar) {
          if (totalQty > 0) stickyCartBar.classList.add('active');
          else stickyCartBar.classList.remove('active');
        }

        if (floatingWaBtn) {
          if (totalQty > 0) floatingWaBtn.classList.add('hidden-by-cart');
          else floatingWaBtn.classList.remove('hidden-by-cart');
        }

        if (barQtyBubble) barQtyBubble.textContent = totalQty;
        if (barItemCount) barItemCount.textContent = totalQty + (totalQty === 1 ? ' item no pedido' : ' itens no pedido');
        if (barTotalAmount) barTotalAmount.textContent = formattedTotal;

        if (cartItemsList) {
          if (cart.length === 0) {
            cartItemsList.innerHTML = `
              <div class="cart-empty-state">
                <p>Seu carrinho está vazio.</p>
                <p style="font-size:0.82rem;margin-top:4px;">Escolha delícias no cardápio para adicionar!</p>
              </div>
            `;
          } else {
            cartItemsList.innerHTML = cart.map(item => `
              <div class="cart-item-row">
                <div class="cart-item-meta">
                  <div class="cart-item-name">${item.name}</div>
                  ${item.variant ? `<div class="cart-item-variant">${item.variant}</div>` : ''}
                  <div class="cart-item-price">R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</div>
                </div>
                <div class="cart-item-controls">
                  <button type="button" class="qty-btn" onclick="updateItemQty('${item.key}', -1)" aria-label="Diminuir quantidade">−</button>
                  <span class="qty-count">${item.qty}</span>
                  <button type="button" class="qty-btn" onclick="updateItemQty('${item.key}', 1)" aria-label="Aumentar quantidade">+</button>
                </div>
              </div>
            `).join('');
          }
        }

        updateOrderSummary();
        populateNeighborhoodSelect();
        loadCustomerProfile();
      } catch (err) {
        console.error('Error in renderCart:', err);
      }
    }

    
    function openCartModal() {
      const modal = document.getElementById('cartModal');
      const overlay = document.getElementById('cartOverlay');
      if (modal) modal.classList.add('open');
      if (overlay) overlay.classList.add('open');
    }

    function closeCartModal() {
      const modal = document.getElementById('cartModal');
      const overlay = document.getElementById('cartOverlay');
      if (modal) modal.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
    }

    function closeAcaiModal(event) {
      if (event && event.target && event.target.closest && event.target.closest('.complements-modal-card') && !event.target.classList.contains('drawer-close-btn')) {
        return;
      }
      const overlay = document.getElementById('acaiModalOverlay');
      if (overlay) overlay.classList.remove('open');
      currentCustomizingProduct = null;
      selectedCaldas = [];
      selectedComplements = [];
    }

    // Close on ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeCartModal();
        closeAcaiModal();
      }
    });


    function showToast(text) {
      toastText.textContent = text;
      toastMsg.classList.add('show');
      setTimeout(() => toastMsg.classList.remove('show'), 2200);
    }

    
    // ── IFOOD-STYLE CHECKOUT & DELIVERY AREAS SYSTEM ──
    const DEFAULT_DELIVERY_AREAS = [
      { id: "area-copacabana", name: "Copacabana", fee: 7.00, active: true },
      { id: "area-ipanema", name: "Ipanema", fee: 8.00, active: true },
      { id: "area-leblon", name: "Leblon", fee: 9.00, active: true },
      { id: "area-botafogo", name: "Botafogo", fee: 6.00, active: true },
      { id: "area-flamengo", name: "Flamengo / Catete", fee: 6.00, active: true },
      { id: "area-laranjeiras", name: "Laranjeiras", fee: 7.00, active: true },
      { id: "area-centro", name: "Centro", fee: 8.00, active: true },
      { id: "area-tijuca", name: "Tijuca", fee: 9.00, active: true },
      { id: "area-barra", name: "Barra da Tijuca", fee: 14.00, active: true }
    ];

    if (!localStorage.getItem('nauj_delivery_areas_v7')) {
      localStorage.setItem('nauj_delivery_areas_v7', JSON.stringify(DEFAULT_DELIVERY_AREAS));
    }

    let currentFulfillment = 'delivery'; // 'delivery' or 'pickup'
    let currentDeliveryFee = 0.00;

    function populateNeighborhoodSelect() {
      const areas = JSON.parse(localStorage.getItem('nauj_delivery_areas_v7') || JSON.stringify(DEFAULT_DELIVERY_AREAS));
      const activeAreas = areas.filter(a => a.active !== false);
      const select = document.getElementById('checkoutNeighborhood');
      if (!select) return;

      const currentVal = select.value;
      select.innerHTML = '<option value="">Selecione seu bairro...</option>' + activeAreas.map(a => `
        <option value="${a.name}" data-fee="${a.fee}">${a.name} — Taxa: R$ ${parseFloat(a.fee).toFixed(2).replace('.', ',')}</option>
      `).join('') + '<option value="Outro" data-fee="0">Outro bairro (A consultar taxa)</option>';

      if (currentVal) select.value = currentVal;
    }

    function setFulfillment(type) {
      currentFulfillment = type;
      const btnDel = document.getElementById('btnFulfillDelivery');
      const btnPic = document.getElementById('btnFulfillPickup');
      const delBox = document.getElementById('deliveryAddressBox');
      const picBox = document.getElementById('pickupInfoBox');

      if (type === 'delivery') {
        btnDel.classList.add('active');
        btnPic.classList.remove('active');
        delBox.style.display = 'flex';
        picBox.style.display = 'none';
        updateDeliveryFeeFromSelect();
      } else {
        btnPic.classList.add('active');
        btnDel.classList.remove('active');
        delBox.style.display = 'none';
        picBox.style.display = 'block';
        currentDeliveryFee = 0.00;
        updateOrderSummary();
      }
    }

    function updateDeliveryFeeFromSelect() {
      if (currentFulfillment !== 'delivery') {
        currentDeliveryFee = 0.00;
      } else {
        const select = document.getElementById('checkoutNeighborhood');
        const opt = select.options[select.selectedIndex];
        if (opt && opt.getAttribute('data-fee')) {
          currentDeliveryFee = parseFloat(opt.getAttribute('data-fee')) || 0;
        } else {
          currentDeliveryFee = 0.00;
        }
      }
      updateOrderSummary();
    }

    function togglePayMethod() {
      const method = document.querySelector('input[name="payMethod"]:checked')?.value;
      const changeBox = document.getElementById('changeForBox');
      if (changeBox) {
        changeBox.style.display = (method === 'Dinheiro') ? 'block' : 'none';
      }
    }

    
    // ── VIACEP INSTANT AUTO-COMPLETE ──
    function handleCepInput(input) {
      let val = input.value.replace(/\D/g, '');
      if (val.length > 5) {
        val = val.slice(0, 5) + '-' + val.slice(5, 8);
      }
      input.value = val;

      const rawCep = val.replace(/\D/g, '');
      if (rawCep.length === 8) {
        fetchAddressFromViaCep(rawCep);
      }
    }

    function searchCepManual() {
      const input = document.getElementById('checkoutCep');
      if (!input) return;
      const rawCep = input.value.replace(/\D/g, '');
      if (rawCep.length !== 8) {
        alert('Por favor, digite um CEP válido com 8 dígitos.');
        return;
      }
      fetchAddressFromViaCep(rawCep);
    }

    async function fetchAddressFromViaCep(rawCep) {
      const statusEl = document.getElementById('cepStatusMsg');
      if (statusEl) statusEl.textContent = '⏳ Buscando endereço nos Correios...';

      try {
        const res = await fetch('https://viacep.com.br/ws/' + rawCep + '/json/');
        const data = await res.json();

        if (data.erro) {
          if (statusEl) statusEl.textContent = '⚠️ CEP não encontrado. Preencha os campos abaixo manualmente.';
          return;
        }

        if (document.getElementById('checkoutStreet')) {
          document.getElementById('checkoutStreet').value = data.logradouro || '';
        }

        // Match neighborhood in select
        const neighborhoodSelect = document.getElementById('checkoutNeighborhood');
        if (neighborhoodSelect && data.bairro) {
          let matched = false;
          for (let i = 0; i < neighborhoodSelect.options.length; i++) {
            const optText = neighborhoodSelect.options[i].text.toLowerCase();
            const valText = neighborhoodSelect.options[i].value.toLowerCase();
            const apiBairro = data.bairro.toLowerCase();

            if (optText.includes(apiBairro) || valText.includes(apiBairro) || apiBairro.includes(valText)) {
              neighborhoodSelect.selectedIndex = i;
              matched = true;
              break;
            }
          }

          if (!matched) {
            neighborhoodSelect.value = 'Outro';
          }
          updateDeliveryFeeFromSelect();
        }

        if (statusEl) {
          statusEl.textContent = '✅ ' + (data.logradouro || 'Rua') + ', ' + (data.bairro || 'Bairro') + ' - ' + (data.localidade || 'RJ');
        }

        const numInput = document.getElementById('checkoutNumber');
        if (numInput && !numInput.value) {
          numInput.focus();
        }
      } catch (err) {
        console.error('ViaCEP error:', err);
        if (statusEl) statusEl.textContent = 'Não foi possível buscar automaticamente. Preencha manualmente.';
      }
    }


        function loadCustomerProfile() {
      const profile = JSON.parse(localStorage.getItem('nauj_customer_profile') || '{}');
      if (profile.name && document.getElementById('checkoutName')) document.getElementById('checkoutName').value = profile.name;
      if (profile.phone && document.getElementById('checkoutPhone')) document.getElementById('checkoutPhone').value = profile.phone;
      if (profile.email && document.getElementById('checkoutEmail')) document.getElementById('checkoutEmail').value = profile.email;
      if (profile.cep && document.getElementById('checkoutCep')) document.getElementById('checkoutCep').value = profile.cep;
      if (profile.street && document.getElementById('checkoutStreet')) document.getElementById('checkoutStreet').value = profile.street;
      if (profile.number && document.getElementById('checkoutNumber')) document.getElementById('checkoutNumber').value = profile.number;
      if (profile.comp && document.getElementById('checkoutComp')) document.getElementById('checkoutComp').value = profile.comp;
      if (profile.ref && document.getElementById('checkoutRef')) document.getElementById('checkoutRef').value = profile.ref;
      if (profile.neighborhood && document.getElementById('checkoutNeighborhood')) {
        document.getElementById('checkoutNeighborhood').value = profile.neighborhood;
        updateDeliveryFeeFromSelect();
      }
    }

    function saveCustomerProfile(data) {
      localStorage.setItem('nauj_customer_profile', JSON.stringify(data));
    }

    function updateOrderSummary() {
      const itemsSubtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
      const total = itemsSubtotal + currentDeliveryFee;

      if (document.getElementById('summarySubtotalDisplay')) {
        document.getElementById('summarySubtotalDisplay').textContent = 'R$ ' + itemsSubtotal.toFixed(2).replace('.', ',');
      }
      if (document.getElementById('summaryDeliveryFeeDisplay')) {
        document.getElementById('summaryDeliveryFeeDisplay').textContent = currentFulfillment === 'delivery' 
          ? (currentDeliveryFee > 0 ? 'R$ ' + currentDeliveryFee.toFixed(2).replace('.', ',') : 'A consultar')
          : 'Grátis (Retirada)';
      }
      if (document.getElementById('summaryTotalDisplay')) {
        document.getElementById('summaryTotalDisplay').textContent = 'R$ ' + total.toFixed(2).replace('.', ',');
      }
    }

                async function submitFinalOrder() {
      if (cart.length === 0) {
        showToast('Adicione delícias ao carrinho primeiro!');
        return;
      }

      const name = document.getElementById('checkoutName').value.trim();
      const phone = document.getElementById('checkoutPhone').value.trim();
      const email = document.getElementById('checkoutEmail').value.trim();

      if (!name) {
        alert('Por favor, informe seu Nome Completo.');
        document.getElementById('checkoutName').focus();
        return;
      }
      if (!phone) {
        alert('Por favor, informe seu WhatsApp / Telefone.');
        document.getElementById('checkoutPhone').focus();
        return;
      }

      let addressData = {};
      if (currentFulfillment === 'delivery') {
        const neighborhood = document.getElementById('checkoutNeighborhood').value;
        const street = document.getElementById('checkoutStreet').value.trim();
        const number = document.getElementById('checkoutNumber').value.trim();
        const comp = document.getElementById('checkoutComp').value.trim();
        const ref = document.getElementById('checkoutRef').value.trim();

        if (!neighborhood) {
          alert('Por favor, selecione seu Bairro para calcular a entrega.');
          document.getElementById('checkoutNeighborhood').focus();
          return;
        }
        if (!street || !number) {
          alert('Por favor, informe a Rua e o Número para entrega.');
          document.getElementById('checkoutStreet').focus();
          return;
        }

        addressData = { neighborhood: neighborhood, street: street, number: number, comp: comp, ref: ref };
      }

      const payMethod = document.querySelector('input[name="payMethod"]:checked') ? document.querySelector('input[name="payMethod"]:checked').value : 'Pix';
      const changeFor = document.getElementById('checkoutChange') ? document.getElementById('checkoutChange').value.trim() : '';

      saveCustomerProfile(Object.assign({ name: name, phone: phone, email: email }, addressData));

      const orderNumber = Math.floor(1000 + Math.random() * 9000);
      const orderId = 'NJ-' + orderNumber;
      const itemsSubtotal = cart.reduce(function(sum, item) { return sum + item.price * item.qty; }, 0);
      const finalTotal = itemsSubtotal + currentDeliveryFee;

      const orderPayload = {
        id: orderId,
        createdAt: new Date().toISOString(),
        status: 'novo',
        fulfillment: currentFulfillment,
        customer: { name: name, phone: phone, email: email },
        address: addressData,
        deliveryFee: currentDeliveryFee,
        paymentMethod: payMethod,
        changeFor: changeFor,
        items: cart.slice(),
        subtotal: itemsSubtotal,
        total: finalTotal
      };

      try {
        await fetch(FIREBASE_BASE_URL + '/orders/' + orderId + '.json', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload)
        });
      } catch (e) {
        console.error('Error saving order to cloud:', e);
      }

      const cfg = JSON.parse(localStorage.getItem('nauj_config_v7') || '{}');
      const waNumber = cfg.whatsappNumber || '5521976846682';

      const msgLines = [];
      msgLines.push('🧁 *NOVO PEDIDO NAUJ DOCERIA (#' + orderId + ')*');
      msgLines.push('');
      msgLines.push('👤 *Cliente:* ' + name);
      msgLines.push('📱 *Telefone:* ' + phone);
      if (email) msgLines.push('📧 *E-mail:* ' + email);
      msgLines.push('');

      if (currentFulfillment === 'delivery') {
        msgLines.push('🛵 *ENTREGA (DELIVERY)*');
        msgLines.push('📍 *Bairro:* ' + addressData.neighborhood);
        let addrStr = '🏠 *Endereço:* ' + addressData.street + ', Nº ' + addressData.number;
        if (addressData.comp) addrStr += ' - ' + addressData.comp;
        if (addressData.ref) addrStr += ' (Ref: ' + addressData.ref + ')';
        msgLines.push(addrStr);
        msgLines.push('🛵 *Taxa de Entrega:* R$ ' + currentDeliveryFee.toFixed(2).replace('.', ','));
      } else {
        msgLines.push('🏬 *RETIRADA NO LOCAL (BALCÃO NAUJ)*');
        msgLines.push('📍 Grátis / Retirada pelo cliente');
      }

      msgLines.push('');
      msgLines.push('📋 *ITENS DO PEDIDO:*');
      cart.forEach(function(i) {
        msgLines.push('• *' + i.qty + 'x ' + i.name + '* (R$ ' + (i.price * i.qty).toFixed(2).replace('.', ',') + ')');
        if (i.variant) {
          msgLines.push('   └ ' + i.variant);
        }
      });

      msgLines.push('───────────────────');
      msgLines.push('💰 *Subtotal:* R$ ' + itemsSubtotal.toFixed(2).replace('.', ','));
      msgLines.push('🛵 *Taxa:* ' + (currentFulfillment === 'delivery' ? 'R$ ' + currentDeliveryFee.toFixed(2).replace('.', ',') : 'Grátis'));
      msgLines.push('⭐ *TOTAL A PAGAR: R$ ' + finalTotal.toFixed(2).replace('.', ',') + '*');
      msgLines.push('');

      let payStr = '💳 *Pagamento:* ' + payMethod;
      if (payMethod === 'Dinheiro' && changeFor) payStr += ' (' + changeFor + ')';
      msgLines.push(payStr);
      msgLines.push('');
      msgLines.push('Aguardando confirmação! ✨');

      const fullMessage = msgLines.join("\n");

      cart = [];
      renderCart();
      closeCartModal();

      window.open('https://wa.me/' + waNumber + '?text=' + encodeURIComponent(fullMessage), '_blank');
    }

    // ── CLOUD CATALOG SYNC ──
    async function pullCloudCatalog() {
      try {
        const resProds = await fetch(`${FIREBASE_BASE_URL}/products.json`);
        if (resProds.ok) {
          const cloudProds = await resProds.json();
          if (cloudProds) {
            const list = Array.isArray(cloudProds) ? cloudProds : Object.values(cloudProds);
            localStorage.setItem('nauj_products_v7', JSON.stringify(list));
            renderDynamicCatalog();
          }
        }

        const resCaldas = await fetch(`${FIREBASE_BASE_URL}/config/caldas.json`);
        if (resCaldas.ok) {
          const cloudCaldas = await resCaldas.json();
          if (cloudCaldas) {
            const list = Array.isArray(cloudCaldas) ? cloudCaldas : Object.values(cloudCaldas);
            localStorage.setItem('nauj_caldas_v7', JSON.stringify(list));
          }
        }

        const resComps = await fetch(`${FIREBASE_BASE_URL}/config/complements.json`);
        if (resComps.ok) {
          const cloudComps = await resComps.json();
          if (cloudComps) {
            const list = Array.isArray(cloudComps) ? cloudComps : Object.values(cloudComps);
            localStorage.setItem('nauj_complements_v7', JSON.stringify(list));
          }
        }

        
        const resAreas = await fetch(`${FIREBASE_BASE_URL}/config/delivery_areas.json`);
        if (resAreas.ok) {
          const cloudAreas = await resAreas.json();
          if (cloudAreas) {
            const list = Array.isArray(cloudAreas) ? cloudAreas : Object.values(cloudAreas);
            localStorage.setItem('nauj_delivery_areas_v7', JSON.stringify(list));
            populateNeighborhoodSelect();
          }
        }

        const resCfg = await fetch(`${FIREBASE_BASE_URL}/config.json`);
        if (resCfg.ok) {
          const cloudCfg = await resCfg.json();
          if (cloudCfg) {
            localStorage.setItem('nauj_config_v7', JSON.stringify(cloudCfg));
            applyStoreConfig();
          }
        }
      } catch (e) {
        console.log('Cloud sync error:', e);
      }
    }

    // Startup initialization
    applyStoreConfig();
    renderDynamicCatalog();
    pullCloudCatalog();
    setInterval(pullCloudCatalog, 8000);
  

console.log("=== SIMULATING ADDS ===");
console.log("1. Adding pastel-ninho...");
handleAddProductToCart("pastel-ninho");
console.log("Cart length:", cart.length);
console.log("Cart contents:", JSON.stringify(cart, null, 2));

console.log("2. Opening Açaí customizer for acai-garrafa...");
openAcaiCustomizer("acai-garrafa");
console.log("Customizing product:", currentCustomizingProduct ? currentCustomizingProduct.name : 'null');

console.log("3. Toggling complements & caldas...");
toggleCalda("calda-morango");
toggleComplement("comp-nutella");
confirmAcaiWithComplements();
console.log("Cart length after Açaí:", cart.length);
console.log("Cart contents:", JSON.stringify(cart, null, 2));
