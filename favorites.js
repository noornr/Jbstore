// ================================================================
//  JB STORE – PREMIUM FAVORITES ENGINE
//  Professional, modular, and production‑ready.
// ================================================================

(function(global) {
  'use strict';

  // ---------- Storage ----------
  function getFavorites() {
    try {
      return JSON.parse(localStorage.getItem('jb_favorites')) || [];
    } catch {
      return [];
    }
  }

  function saveFavorites(list) {
    localStorage.setItem('jb_favorites', JSON.stringify(list));
  }

  function isFavorite(id) {
    return getFavorites().includes(id);
  }

  // ---------- Toast (branded) ----------
  function showToast(message) {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <span style="display:flex;align-items:center;gap:10px;">
        <span style="font-size:20px;color:#D4AF37;">✦</span>
        ${message}
      </span>
      <button onclick="this.parentElement.remove()" style="background:transparent;border:none;color:#888;font-size:18px;cursor:pointer;">✕</button>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 350);
    }, 3200);
  }

  // ---------- Toggle favorite ----------
  function toggleFavorite(productId) {
    let favs = getFavorites();
    const idx = favs.indexOf(productId);
    let isNowFav = false;

    if (idx > -1) {
      favs.splice(idx, 1);
      showToast('♡ Removed from favorites');
    } else {
      favs.push(productId);
      isNowFav = true;
      showToast('❤️ Added to favorites!');
    }

    saveFavorites(favs);

    // Update all heart buttons for this product
    document.querySelectorAll(`.favorite-btn[data-product-id="${productId}"]`).forEach(btn => {
      const isFav = favs.includes(productId);
      btn.classList.toggle('is-fav', isFav);
      const icon = btn.querySelector('.fa-heart');
      if (icon) {
        icon.className = `fa-${isFav ? 'solid' : 'regular'} fa-heart`;
      }
      // re-trigger pop animation
      if (isFav) {
        btn.style.animation = 'none';
        requestAnimationFrame(() => {
          btn.style.animation = 'heartPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
      }
    });

    // Update the favorites badge
    updateFavBadge();

    // If we're on the favorites page, re-render the grid
    if (window.location.pathname.includes('favorites.html')) {
      if (typeof renderFavoritesGrid === 'function') {
        renderFavoritesGrid();
      }
    }
  }

  // ---------- Update favorites badge ----------
  function updateFavBadge() {
    const count = getFavorites().length;
    document.querySelectorAll('#favBadge, .fav-badge').forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  // ---------- Inject heart buttons into product grids ----------
  function injectHeartsIntoGrid(gridSelector, productIdExtractor) {
    const grid = document.querySelector(gridSelector);
    if (!grid) return;

    const cards = grid.querySelectorAll('.deal-card, .best-card, .search-product-card');
    cards.forEach(card => {
      // Avoid duplicate hearts
      if (card.querySelector('.favorite-btn')) return;

      let productId = productIdExtractor(card);
      if (!productId) return;

      const isFav = isFavorite(productId);
      const btn = document.createElement('button');
      btn.className = `favorite-btn ${isFav ? 'is-fav' : ''}`;
      btn.setAttribute('data-product-id', productId);
      btn.setAttribute('aria-label', 'Toggle favorite');
      btn.innerHTML = `<i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>`;
      btn.onclick = function(e) {
        e.stopPropagation();
        toggleFavorite(productId);
      };
      card.style.position = 'relative';
      card.appendChild(btn);
    });
  }

  // ---------- Override displayProducts to add hearts ----------
  function setupDisplayOverride() {
    if (typeof window.displayProducts !== 'function') {
      // Retry until script.js loads
      setTimeout(setupDisplayOverride, 200);
      return;
    }

    const originalDisplay = window.displayProducts;

    window.displayProducts = function() {
      // Call original to render the grid
      originalDisplay();

      // Now inject hearts
      const grid = document.getElementById('productGrid');
      if (!grid) return;

      const cards = grid.querySelectorAll('.deal-card');
      cards.forEach(card => {
        if (card.querySelector('.favorite-btn')) return;

        // Extract product ID from "View Details" button
        const viewBtn = card.querySelector('.view-details-btn');
        let productId = null;
        if (viewBtn) {
          const onclick = viewBtn.getAttribute('onclick') || '';
          const match = onclick.match(/viewProduct\('([^']+)'\)/);
          if (match) productId = match[1];
        }
        if (!productId) {
          // Fallback: try to find by name
          const nameEl = card.querySelector('h3');
          if (nameEl && window.allProducts) {
            const found = window.allProducts.find(p => p.name === nameEl.textContent.trim());
            if (found) productId = found.id;
          }
        }
        if (!productId) return;

        const isFav = isFavorite(productId);
        const btn = document.createElement('button');
        btn.className = `favorite-btn ${isFav ? 'is-fav' : ''}`;
        btn.setAttribute('data-product-id', productId);
        btn.setAttribute('aria-label', 'Toggle favorite');
        btn.innerHTML = `<i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>`;
        btn.onclick = function(e) {
          e.stopPropagation();
          toggleFavorite(productId);
        };
        card.style.position = 'relative';
        card.appendChild(btn);
      });
    };

    // Re-run to apply hearts immediately
    window.displayProducts();
  }

  // ---------- Best Sellers (with hearts) ----------
  function renderBestSellersWithHearts() {
    const checkAndRender = () => {
      const all = [
        ...(global.mobileProducts || []),
        ...(global.refrigeratorProducts || []),
        ...(global.washingProducts || []),
        ...(global.acProducts || []),
        ...(global.tvProducts || [])
      ];

      if (all.length === 0) {
        setTimeout(checkAndRender, 300);
        return;
      }

      const grid = document.getElementById('bestSellersGrid');
      if (!grid) return;

      const best = all.slice(0, 4);
      grid.innerHTML = '';

      best.forEach(p => {
        const isFav = isFavorite(p.id);
        const card = document.createElement('div');
        card.className = 'best-card';
        card.style.position = 'relative';
        card.style.cursor = 'pointer';
        card.setAttribute('onclick', `viewProduct('${p.id}')`);

        card.innerHTML = `
          <button class="favorite-btn ${isFav ? 'is-fav' : ''}"
                  data-product-id="${p.id}"
                  onclick="event.stopPropagation(); toggleFavorite('${p.id}')"
                  aria-label="Toggle favorite">
            <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
          </button>
          <img src="${p.image || 'images/placeholder.png'}" alt="${p.name}" loading="lazy">
          <h3>${p.name}</h3>
          <p class="brand">${p.brand}</p>
          <div class="price-row">
            <span class="new">₹${(p.price || 0).toLocaleString('en-IN')}</span>
            <span class="old">₹${(p.oldPrice || 0).toLocaleString('en-IN')}</span>
          </div>
          <button onclick="event.stopPropagation(); viewProduct('${p.id}')">View Details</button>
        `;
        grid.appendChild(card);
      });
    };

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(checkAndRender, 150);
    } else {
      document.addEventListener('DOMContentLoaded', () => setTimeout(checkAndRender, 150));
    }
  }

  // ---------- Fix call buttons ----------
  function fixCallButtons() {
    const phone = global.STORE_PHONE || '919999999999';
    const tel = 'tel:' + phone;

    const bottomCall = document.getElementById('bottomCall');
    if (bottomCall) bottomCall.href = tel;

    const footerCall = document.getElementById('footerCallLink');
    if (footerCall) footerCall.href = tel;

    document.querySelectorAll('.call-item').forEach(el => {
      if (!el.href || el.href === '#' || el.href.endsWith('#')) {
        el.href = tel;
      }
    });
  }

  // ---------- Bottom bar active state ----------
  function setActiveBar() {
    const path = window.location.pathname;
    const isFavPage = path.includes('favorites.html');
    const home = document.getElementById('bottomHome');
    const fav = document.getElementById('bottomFav');

    if (isFavPage && fav) {
      fav.classList.add('active', 'fav-active');
      if (home) home.classList.remove('active');
    } else if (home) {
      home.classList.add('active');
      if (fav) fav.classList.remove('active', 'fav-active');
    }
  }

  // ---------- Init ----------
  function init() {
    fixCallButtons();
    setActiveBar();
    updateFavBadge();
    renderBestSellersWithHearts();
    setupDisplayOverride();

    // Also run after a delay for dynamically loaded content
    setTimeout(() => {
      injectHeartsIntoGrid('#productGrid', (card) => {
        const btn = card.querySelector('.view-details-btn');
        if (btn) {
          const match = (btn.getAttribute('onclick') || '').match(/viewProduct\('([^']+)'\)/);
          return match ? match[1] : null;
        }
        return null;
      });
    }, 500);
  }

  // ---------- Expose to global ----------
  global.getFavorites = getFavorites;
  global.saveFavorites = saveFavorites;
  global.isFavorite = isFavorite;
  global.toggleFavorite = toggleFavorite;
  global.updateFavBadge = updateFavBadge;

  // Start when ready
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(init, 100);
  } else {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 100));
  }

})(window);
