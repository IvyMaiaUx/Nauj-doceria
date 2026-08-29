
    // ── PRODUCTS & CLOUD DATABASE ──
    const FIREBASE_BASE_URL = 'https://nauj-doceria-default-rtdb.firebaseio.com';

    const DEFAULT_PRODUCTS = [
      {
        id: "pastel-ninho",
        category: "Pastéis",
        name: "Pastel de Leite Ninho com Nutella",
        description: "Massa artesanal de Leite Ninho recheada com Nutella cremosa.",
        price: 17.99,
        image: "images/pastel-ninho-opt.jpg",
        options: ["Sem morango", "Com morango (+R$ 2,00)"],
        featured: true,
        tag: "Top 1 Favorito",
        paused: false
      },
      {
        id: "acai-garrafa",
        category: "Açaí",
        name: "Açaí de Garrafa Artesanal",
        description: "Açaí super cremoso na garrafinha com adesivo oficial da Nauj. Escolha o tamanho:",
        price: 21.99,
        image: "images/acai-garrafa-real.jpg",
        options: ["300 ml", "500 ml (+R$ 5,00)"],
        featured: true,
        tag: "Mais Vendido",
        paused: false
      },
      {
        id: "acai-copo-especial",
        category: "Açaí",
        name: "Açaí Especial no Copo",
        description: "Copo de açaí artesanal montado com caldas e complementos à sua escolha.",
        price: 24.99,
        image: "images/acai-copo-ninho-real.jpg",
        options: ["300 ml", "500 ml (+R$ 5,00)"],
        featured: false,
        tag: "",
        paused: false
      },
      {
        id: "batida-alcoolica",
        category: "Batidas",
        name: "Batida Alcoólica (+18)",
        description: "Batida artesanal cremosa e refrescante. Escolha o sabor e tamanho:",
        price: 21.99,
        image: "images/batidas-garrafa-real.jpg",
        options: ["300 ml (Morango)", "300 ml (Maracujá)", "500 ml (Morango) (+R$ 5,00)", "500 ml (Maracujá) (+R$ 5,00)"],
        ageRestricted: true,
        featured: false,
        tag: "+18",
        paused: false
      },
      {
        id: "coxinha-artesanal",
        category: "Salgados",
        name: "Coxinha Artesanal com Catupiry®",
        description: "Massa leve e crocante recheada com Catupiry® cremoso. Escolha o recheio:",
        price: 17.99,
        image: "images/coxinha-camarao-aberta.jpg",
        options: ["Camarão", "Costela", "Salmão"],
        featured: true,
        tag: "Crocante",
        paused: false
      }
    ];

    const ACAI_CALDAS = [
      { id: "calda-morango", name: "Calda de Morango", price: 0.00 },
      { id: "calda-condensado", name: "Leite Condensado", price: 0.00 },
      { id: "calda-chocolate", name: "Calda de Chocolate", price: 0.00 }
    ];

    const ACAI_COMPLEMENTS = [
      { id: "comp-leite-po", name: "Leite em Pó", price: 0.00 },
      { id: "comp-pacoca", name: "Paçoca", price: 0.00 },
      { id: "comp-amendoim", name: "Amendoim", price: 0.00 },
      { id: "comp-granulado", name: "Granulado Colorido", price: 0.00 },
      { id: "comp-bis", name: "Adicional Bis", price: 2.00 },
      { id: "comp-nutella", name: "Adicional Nutella", price: 3.50 }
    ];

    if (!localStorage.getItem('nauj_products_v3')) {
      localStorage.setItem('nauj_products_v3', JSON.stringify(DEFAULT_PRODUCTS));
    }
    if (!localStorage.getItem('nauj_caldas_v3')) {
      localStorage.setItem('nauj_caldas_v3', JSON.stringify(ACAI_CALDAS));
    }
    if (!localStorage.getItem('nauj_complements_v3')) {
      localStorage.setItem('nauj_complements_v3', JSON.stringify(ACAI_COMPLEMENTS));
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
      const cfg = JSON.parse(localStorage.getItem('nauj_config_v3') || '{}');
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
      const products = JSON.parse(localStorage.getItem('nauj_products_v3') || '[]');
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
      const products = JSON.parse(localStorage.getItem('nauj_products_v3') || '[]');
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

        function openAcaiCustomizer(productId) {
      const products = JSON.parse(localStorage.getItem('nauj_products_v3') || '[]');
      const item = products.find(p => p.id === productId);
      if (!item) return;

      const selectedOpt = selectedOptionsMap[productId] || {
        option: (item.options && item.options.length ? item.options[0] : ''),
        price: parseFloat(item.price)
      };

      currentCustomizingProduct = {
        ...item,
        selectedOption: selectedOpt.option,
        basePrice: selectedOpt.price
      };

      selectedCaldas = [];
      selectedComplements = [];
      document.getElementById('acaiModalObs').value = '';
      document.getElementById('acaiModalTitle').textContent = item.name + (selectedOpt.option ? ' (' + selectedOpt.option + ')' : '');
      document.getElementById('acaiModalSubtitle').textContent = 'Preço base: R$ ' + parseFloat(selectedOpt.price).toFixed(2).replace('.', ',');

      renderAcaiOptions();
      updateAcaiModalTotal();
      document.getElementById('acaiModalOverlay').classList.add('open');
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
      const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
      const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
      const formattedTotal = 'R$ ' + totalPrice.toFixed(2).replace('.', ',');

      if (totalQty > 0) {
        headerCartBadge.textContent = totalQty;
        headerCartBadge.classList.add('active');
        stickyCartBar.classList.add('active');
        floatingWaBtn.classList.add('hidden-by-cart');
      } else {
        headerCartBadge.classList.remove('active');
        stickyCartBar.classList.remove('active');
        floatingWaBtn.classList.remove('hidden-by-cart');
      }

      barQtyBubble.textContent = totalQty;
      barItemCount.textContent = totalQty + (totalQty === 1 ? ' item no pedido' : ' itens no pedido');
      barTotalAmount.textContent = formattedTotal;

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
              <button class="qty-btn" onclick="updateItemQty('${item.key}', -1)" aria-label="Diminuir quantidade">−</button>
              <span class="qty-count">${item.qty}</span>
              <button class="qty-btn" onclick="updateItemQty('${item.key}', 1)" aria-label="Aumentar quantidade">+</button>
            </div>
          </div>
        `).join('');
      }

      cartModalTotal.textContent = formattedTotal;
    }

    function openCartModal() {
      cartModal.classList.add('open');
      cartOverlay.classList.add('open');
    }

    function closeCartModal() {
      cartModal.classList.remove('open');
      cartOverlay.classList.remove('open');
    }

    function showToast(text) {
      toastText.textContent = text;
      toastMsg.classList.add('show');
      setTimeout(() => toastMsg.classList.remove('show'), 2200);
    }

    async function sendOrderWhatsApp() {
      const cfg = JSON.parse(localStorage.getItem('nauj_config_v3') || '{}');
      const waNumber = cfg.whatsappNumber || '5521976846682';

      if (cart.length === 0) {
        const msg = "Olá! Vim pelo cardápio da Nauj Doceria e gostaria de fazer um pedido.";
        window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, '_blank');
        return;
      }

      const orderNumber = Math.floor(1000 + Math.random() * 9000);
      const orderId = 'NJ-' + orderNumber;
      const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
      const formattedTotal = 'R$ ' + totalPrice.toFixed(2).replace('.', ',');

      const newOrder = {
        id: orderId,
        createdAt: new Date().toISOString(),
        status: 'novo',
        items: [...cart],
        total: totalPrice
      };

      // Push order to Firebase Cloud in real time
      try {
        await fetch(`${FIREBASE_BASE_URL}/orders/${orderId}.json`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newOrder)
        });
      } catch (e) {
        console.error('Error posting order to cloud:', e);
      }

      const itemsFormatted = cart.map(item => {
        const variantText = item.variant ? ` — ${item.variant}` : '';
        return `${item.qty}x ${item.name}${variantText}`;
      }).join('\n');

      const fullMessage = 
`Olá! Gostaria de fazer este pedido na Nauj Doceria (*Pedido #${orderId}*):

${itemsFormatted}

Total estimado: ${formattedTotal}

Pode me informar as opções de entrega e pagamento?`;

      cart = [];
      renderCart();
      closeCartModal();

      window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(fullMessage)}`, '_blank');
    }

    // ── CLOUD CATALOG SYNC ──
    async function pullCloudCatalog() {
      try {
        const resProds = await fetch(`${FIREBASE_BASE_URL}/products.json`);
        if (resProds.ok) {
          const cloudProds = await resProds.json();
          if (cloudProds) {
            const list = Array.isArray(cloudProds) ? cloudProds : Object.values(cloudProds);
            localStorage.setItem('nauj_products_v3', JSON.stringify(list));
            renderDynamicCatalog();
          }
        }

        const resCaldas = await fetch(`${FIREBASE_BASE_URL}/caldas.json`);
        if (resCaldas.ok) {
          const cloudCaldas = await resCaldas.json();
          if (cloudCaldas) {
            const list = Array.isArray(cloudCaldas) ? cloudCaldas : Object.values(cloudCaldas);
            localStorage.setItem('nauj_caldas_v3', JSON.stringify(list));
          }
        }

        const resComps = await fetch(`${FIREBASE_BASE_URL}/complements.json`);
        if (resComps.ok) {
          const cloudComps = await resComps.json();
          if (cloudComps) {
            const list = Array.isArray(cloudComps) ? cloudComps : Object.values(cloudComps);
            localStorage.setItem('nauj_complements_v3', JSON.stringify(list));
          }
        }

        const resCfg = await fetch(`${FIREBASE_BASE_URL}/config.json`);
        if (resCfg.ok) {
          const cloudCfg = await resCfg.json();
          if (cloudCfg) {
            localStorage.setItem('nauj_config_v3', JSON.stringify(cloudCfg));
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
  