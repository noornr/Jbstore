// ==========================================
// FAVORITES LOGIC — JB STORE
// ==========================================

// ===== GET / SAVE FAVORITES =====
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

function isFavorite(productId) {
    return getFavorites().includes(productId);
}

// ===== TOGGLE FAVORITE =====
function toggleFavorite(productId) {
    let favs = getFavorites();
    const idx = favs.indexOf(productId);

    if (idx > -1) {
        favs.splice(idx, 1);
        showToast('♡ Removed from favorites');
    } else {
        favs.push(productId);
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
    });

    // Update product page button if exists
    const prodFavBtn = document.querySelector('.product-fav-btn');
    if (prodFavBtn && prodFavBtn.dataset.productId === productId) {
        prodFavBtn.classList.toggle('is-fav', favs.includes(productId));
        const icon = prodFavBtn.querySelector('.fa-heart');
        if (icon) {
            icon.className = `fa-${favs.includes(productId) ? 'solid' : 'regular'} fa-heart`;
        }
        prodFavBtn.innerHTML = `<i class="fa-${favs.includes(productId) ? 'solid' : 'regular'} fa-heart"></i> ${favs.includes(productId) ? '♥ Favorite' : '♡ Add to Favorites'}`;
        prodFavBtn.classList.toggle('is-fav', favs.includes(productId));
    }

    // Update favorites count if on favorites page
    const favCount = document.querySelector('.fav-count');
    if (favCount) {
        favCount.textContent = favs.length + ' items';
    }
}

// ===== TOAST (fallback if script.js not loaded) =====
if (typeof showToast !== 'function') {
    window.showToast = function(message) {
        const existing = document.querySelector('.toast-notification');
        if (existing) existing.remove();
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `<span>${message}</span><button onclick="this.parentElement.remove()">✕</button>`;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };
}

// ==========================================
// BEST SELLERS — with HEART BUTTONS
// ==========================================
(function renderBestSellers() {
    // Wait for product data to be available
    const checkAndRender = () => {
        const allProducts = [
            ...(typeof mobileProducts !== 'undefined' ? mobileProducts : []),
            ...(typeof refrigeratorProducts !== 'undefined' ? refrigeratorProducts : []),
            ...(typeof washingProducts !== 'undefined' ? washingProducts : []),
            ...(typeof acProducts !== 'undefined' ? acProducts : []),
            ...(typeof tvProducts !== 'undefined' ? tvProducts : [])
        ];

        if (allProducts.length === 0) {
            // Retry after a short delay if data not loaded yet
            setTimeout(checkAndRender, 300);
            return;
        }

        const grid = document.getElementById('bestSellersGrid');
        if (!grid) return;

        const best = allProducts.slice(0, 4);
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
                <img src="${p.image || 'images/placeholder.png'}" alt="${p.name}">
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
        setTimeout(checkAndRender, 200);
    } else {
        document.addEventListener('DOMContentLoaded', () => setTimeout(checkAndRender, 200));
    }
})();

// ==========================================
// CALL BUTTON FIX
// ==========================================
(function fixCallButtons() {
    const phone = typeof STORE_PHONE !== 'undefined' ? STORE_PHONE : '919999999999';
    const tel = 'tel:' + phone;

    // Bottom bar call button
    const bottomCall = document.getElementById('bottomCall');
    if (bottomCall) {
        bottomCall.href = tel;
    }

    // Footer call link
    const footerCall = document.getElementById('footerCallLink');
    if (footerCall) {
        footerCall.href = tel;
    }

    // Any other .call-item links
    document.querySelectorAll('.call-item').forEach(el => {
        if (!el.href || el.href === '#' || el.href.endsWith('#')) {
            el.href = tel;
        }
    });
})();

// ==========================================
// BOTTOM BAR ACTIVE STATE (Favorites)
// ==========================================
(function setBottomBarActive() {
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
})();

// ==========================================
// EXPOSE FUNCTIONS GLOBALLY
// ==========================================
window.getFavorites = getFavorites;
window.saveFavorites = saveFavorites;
window.isFavorite = isFavorite;
window.toggleFavorite = toggleFavorite;
