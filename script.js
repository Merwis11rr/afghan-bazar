// Application State
const APP_STATE = {
    currentLanguage: 'fa',
    currentProvince: '',
    products: [],
    categories: [],
    provinces: [],
    filteredProducts: [],
    currentPage: 1,
    itemsPerPage: 20,
    searchQuery: '',
    filters: {
        minPrice: '',
        maxPrice: '',
        category: '',
        sort: 'newest'
    },
    supportedLanguages: ['fa', 'ps', 'en']
};

// Language translations
const TRANSLATIONS = {
    fa: {
        title: 'بازار افغانستان - خرید و فروش آنلاین',
        home: 'خانه',
        categories: 'دسته‌بندی‌ها',
        about: 'درباره ما',
        contact: 'تماس',
        search: 'جستجو',
        searchPlaceholder: 'جستجوی محصولات...',
        provinceLabel: 'انتخاب ولایت:',
        allProvinces: 'همه ولایات',
        filters: 'فیلترها',
        priceRange: 'محدوده قیمت:',
        minPrice: 'حداقل قیمت',
        maxPrice: 'حداکثر قیمت',
        sortBy: 'مرتب‌سازی:',
        newest: 'جدیدترین',
        priceLowToHigh: 'قیمت: کم به زیاد',
        priceHighToLow: 'قیمت: زیاد به کم',
        popular: 'محبوب‌ترین',
        applyFilters: 'اعمال فیلتر',
        loadMore: 'نمایش محصولات بیشتر',
        loading: 'در حال بارگذاری محصولات...',
        currency: 'افغانی',
        new: 'جدید',
        featured: 'ویژه',
        noResults: 'محصولی یافت نشد',
        contactInfo: 'اطلاعات تماس',
        phone: 'تلفن',
        email: 'ایمیل',
        address: 'آدرس',
        heroTitle: 'بزرگترین بازار آنلاین افغانستان',
        heroSubtitle: 'خرید و فروش آسان و امن در سراسر کشور'
    },
    ps: {
        title: 'د افغانستان بازار - آنلاین پیرودل او پلورل',
        home: 'کور',
        categories: 'ډولونه',
        about: 'زموږ په اړه',
        contact: 'اړیکه',
        search: 'لټون',
        searchPlaceholder: 'د محصولاتو لټون...',
        provinceLabel: 'ولایت غوره کړئ:',
        allProvinces: 'ټول ولایتونه',
        filters: 'فلټرونه',
        priceRange: 'د بیې حد:',
        minPrice: 'لږترلږه بیه',
        maxPrice: 'زیاتره بیه',
        sortBy: 'ترتیب:',
        newest: 'تر ټولو نوی',
        priceLowToHigh: 'بیه: لږ څخه زیات',
        priceHighToLow: 'بیه: زیات څخه لږ',
        popular: 'مشهور',
        applyFilters: 'فلټرونه پلي کړئ',
        loadMore: 'نور محصولات وښایاست',
        loading: 'محصولات بارېږي...',
        currency: 'افغانۍ',
        new: 'نوی',
        featured: 'ځانګړی',
        noResults: 'هیڅ محصول ونه موندل شو',
        contactInfo: 'د اړیکې معلومات',
        phone: 'تلیفون',
        email: 'بریښنالیک',
        address: 'پته',
        heroTitle: 'د افغانستان تر ټولو لوی آنلاین بازار',
        heroSubtitle: 'په ټول هیواد کې اسانه او خوندي پیرودنه او پلورنه'
    },
    en: {
        title: 'Afghanistan Bazaar - Online Marketplace',
        home: 'Home',
        categories: 'Categories',
        about: 'About Us',
        contact: 'Contact',
        search: 'Search',
        searchPlaceholder: 'Search products...',
        provinceLabel: 'Select Province:',
        allProvinces: 'All Provinces',
        filters: 'Filters',
        priceRange: 'Price Range:',
        minPrice: 'Min Price',
        maxPrice: 'Max Price',
        sortBy: 'Sort By:',
        newest: 'Newest',
        priceLowToHigh: 'Price: Low to High',
        priceHighToLow: 'Price: High to Low',
        popular: 'Most Popular',
        applyFilters: 'Apply Filters',
        loadMore: 'Load More Products',
        loading: 'Loading products...',
        currency: 'AFN',
        new: 'New',
        featured: 'Featured',
        noResults: 'No products found',
        contactInfo: 'Contact Information',
        phone: 'Phone',
        email: 'Email',
        address: 'Address',
        heroTitle: 'Afghanistan\'s Largest Online Marketplace',
        heroSubtitle: 'Easy and secure buying and selling across the country'
    }
};

// Utility Functions
const utils = {
    formatPrice: (price, currency = 'افغانی') => {
        return `${price.toLocaleString()} ${currency}`;
    },
    
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    shuffleArray: (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    },
    
    getRandomElement: (array) => {
        return array[Math.floor(Math.random() * array.length)];
    }
};

// Language Management
const languageManager = {
    init() {
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            langToggle.addEventListener('click', this.toggleLanguage.bind(this));
        }
        this.updateUI();
    },
    
    toggleLanguage() {
        const currentIndex = APP_STATE.supportedLanguages.indexOf(APP_STATE.currentLanguage);
        const nextIndex = (currentIndex + 1) % APP_STATE.supportedLanguages.length;
        APP_STATE.currentLanguage = APP_STATE.supportedLanguages[nextIndex];
        
        // Set text direction based on language
        document.documentElement.dir = APP_STATE.currentLanguage === 'en' ? 'ltr' : 'rtl';
        document.documentElement.lang = APP_STATE.currentLanguage;
        this.updateUI();
    },
    
    updateUI() {
        const t = TRANSLATIONS[APP_STATE.currentLanguage];
        
        // Update static texts
        document.title = t.title;
        
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            const langLabels = {
                'fa': 'EN',
                'ps': 'فارسی', 
                'en': 'پښتو'
            };
            langToggle.querySelector('.lang-text').textContent = langLabels[APP_STATE.currentLanguage];
        }
        
        // Update placeholders and labels
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.placeholder = t.searchPlaceholder;
        }
        
        // Update navigation
        const navLinks = document.querySelectorAll('.nav-link');
        const navTexts = [t.home, t.categories, t.about, t.contact];
        navLinks.forEach((link, index) => {
            if (navTexts[index]) {
                link.textContent = navTexts[index];
            }
        });
        
        // Update hero section
        const heroTitle = document.getElementById('heroTitle');
        const heroSubtitle = document.getElementById('heroSubtitle');
        if (heroTitle) heroTitle.textContent = t.heroTitle;
        if (heroSubtitle) heroSubtitle.textContent = t.heroSubtitle;
        
        // Update buttons and labels
        const elements = {
            'searchBtn .search-btn': t.search,
            'applyFilters': t.applyFilters,
            'loadMore': t.loadMore
        };
        
        Object.entries(elements).forEach(([id, text]) => {
            const element = document.getElementById(id) || document.querySelector(`.${id}`);
            if (element) {
                element.textContent = text;
            }
        });
    },
    
    t(key) {
        return TRANSLATIONS[APP_STATE.currentLanguage][key] || key;
    }
};

// Data Management
const dataManager = {
    async loadData() {
        try {
            // Load all data in parallel
            const [productsData, categoriesData, provincesData] = await Promise.all([
                this.loadProducts(),
                this.loadCategories(),
                this.loadProvinces()
            ]);
            
            APP_STATE.products = productsData;
            APP_STATE.categories = categoriesData;
            APP_STATE.provinces = provincesData;
            
            // Initialize filtered products with all products
            APP_STATE.filteredProducts = [...APP_STATE.products];
            
            return true;
        } catch (error) {
            console.error('Error loading data:', error);
            return false;
        }
    },
    
    async loadProducts() {
        try {
            const response = await fetch('./data/products.json');
            if (!response.ok) throw new Error('Failed to load products');
            return await response.json();
        } catch (error) {
            console.error('Error loading products:', error);
            // Return empty array if file doesn't exist
            return [];
        }
    },
    
    async loadCategories() {
        try {
            const response = await fetch('./data/categories.json');
            if (!response.ok) throw new Error('Failed to load categories');
            return await response.json();
        } catch (error) {
            console.error('Error loading categories:', error);
            return [];
        }
    },
    
    async loadProvinces() {
        try {
            const response = await fetch('./data/provinces.json');
            if (!response.ok) throw new Error('Failed to load provinces');
            return await response.json();
        } catch (error) {
            console.error('Error loading provinces:', error);
            return [];
        }
    }
};

// UI Rendering
const renderer = {
    renderCategories() {
        const categoriesGrid = document.getElementById('categoriesGrid');
        if (!categoriesGrid) return;
        
        categoriesGrid.innerHTML = '';
        
        APP_STATE.categories.forEach(category => {
            const categoryCard = document.createElement('a');
            categoryCard.href = '#';
            categoryCard.className = 'category-card fade-in-up';
            categoryCard.onclick = (e) => {
                e.preventDefault();
                this.filterByCategory(category.id);
            };
            
            categoryCard.innerHTML = `
                <div class="category-icon">
                    <i class="${category.icon}"></i>
                </div>
                <div class="category-name">${category.name[APP_STATE.currentLanguage]}</div>
                <div class="category-count">${category.count} محصول</div>
            `;
            
            categoriesGrid.appendChild(categoryCard);
        });
    },
    
    renderProducts(products = null) {
        const productsGrid = document.getElementById('productsGrid');
        const loading = document.getElementById('loading');
        
        if (!productsGrid) return;
        
        // Show loading
        if (loading) loading.style.display = 'block';
        
        // Use provided products or current filtered products
        const productsToRender = products || APP_STATE.filteredProducts;
        
        // Calculate pagination
        const startIndex = (APP_STATE.currentPage - 1) * APP_STATE.itemsPerPage;
        const endIndex = startIndex + APP_STATE.itemsPerPage;
        const currentPageProducts = productsToRender.slice(startIndex, endIndex);
        
        // Clear grid if it's the first page
        if (APP_STATE.currentPage === 1) {
            productsGrid.innerHTML = '';
        }
        
        // Hide loading
        setTimeout(() => {
            if (loading) loading.style.display = 'none';
            
            if (currentPageProducts.length === 0 && APP_STATE.currentPage === 1) {
                productsGrid.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search fa-3x"></i>
                        <h3>${languageManager.t('noResults')}</h3>
                    </div>
                `;
                return;
            }
            
            currentPageProducts.forEach(product => {
                const productCard = this.createProductCard(product);
                productsGrid.appendChild(productCard);
            });
            
            // Update load more button
            this.updateLoadMoreButton(productsToRender);
        }, 500);
    },
    
    createProductCard(product) {
        const productCard = document.createElement('div');
        productCard.className = 'product-card fade-in-up';
        productCard.onclick = () => this.showProductModal(product);
        
        const badges = [];
        if (product.isNew) badges.push(`<span class="badge badge-new">${languageManager.t('new')}</span>`);
        if (product.isFeatured) badges.push(`<span class="badge badge-featured">${languageManager.t('featured')}</span>`);
        
        productCard.innerHTML = `
            <div class="product-image">
                <i class="${product.icon || 'fas fa-box'}"></i>
            </div>
            <div class="product-info">
                <h4 class="product-title">${product.title[APP_STATE.currentLanguage]}</h4>
                <p class="product-description">${product.description[APP_STATE.currentLanguage]}</p>
                <div class="product-badges">
                    ${badges.join('')}
                </div>
                <div class="product-meta">
                    <span class="product-price">${utils.formatPrice(product.price)}</span>
                    <span class="product-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${product.location.province[APP_STATE.currentLanguage]}
                    </span>
                </div>
            </div>
        `;
        
        return productCard;
    },
    
    updateLoadMoreButton(products) {
        const loadMoreBtn = document.getElementById('loadMore');
        if (!loadMoreBtn) return;
        
        const totalProducts = products.length;
        const currentlyShown = APP_STATE.currentPage * APP_STATE.itemsPerPage;
        
        if (currentlyShown >= totalProducts) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    },
    
    renderProvinceSelector() {
        const provinceSelect = document.getElementById('provinceSelect');
        if (!provinceSelect) return;
        
        provinceSelect.innerHTML = `<option value="">${languageManager.t('allProvinces')}</option>`;
        
        APP_STATE.provinces.forEach(province => {
            const option = document.createElement('option');
            option.value = province.id;
            option.textContent = province.name[APP_STATE.currentLanguage];
            provinceSelect.appendChild(option);
        });
    },
    
    showProductModal(product) {
        const modal = document.getElementById('productModal');
        const modalBody = document.getElementById('modalBody');
        
        if (!modal || !modalBody) return;
        
        modalBody.innerHTML = `
            <div class="product-detail">
                <div class="product-detail-image">
                    <i class="${product.icon || 'fas fa-box'}"></i>
                </div>
                <div class="product-detail-info">
                    <h2>${product.title[APP_STATE.currentLanguage]}</h2>
                    <p class="product-detail-description">${product.description[APP_STATE.currentLanguage]}</p>
                    <div class="product-detail-price">${utils.formatPrice(product.price)}</div>
                    <div class="product-detail-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${product.location.province[APP_STATE.currentLanguage]}, ${product.location.city[APP_STATE.currentLanguage]}
                    </div>
                    <div class="product-detail-contact">
                        <h4>${languageManager.t('contactInfo')}</h4>
                        <p><i class="fas fa-phone"></i> ${product.seller.phone}</p>
                        <p><i class="fas fa-user"></i> ${product.seller.name}</p>
                    </div>
                    <div class="product-detail-actions">
                        <button class="btn-neon">
                            <i class="fas fa-phone"></i>
                            تماس با فروشنده
                        </button>
                        <button class="btn-neon">
                            <i class="fas fa-heart"></i>
                            ذخیره
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
    },
    
    filterByCategory(categoryId) {
        APP_STATE.filters.category = categoryId;
        this.applyFilters();
    }
};

// Search and Filter Management
const filterManager = {
    init() {
        // Search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', utils.debounce((e) => {
                APP_STATE.searchQuery = e.target.value;
                this.applyFilters();
            }, 300));
        }
        
        // Province selector
        const provinceSelect = document.getElementById('provinceSelect');
        if (provinceSelect) {
            provinceSelect.addEventListener('change', (e) => {
                APP_STATE.currentProvince = e.target.value;
                this.applyFilters();
            });
        }
        
        // Filter controls
        const applyFiltersBtn = document.getElementById('applyFilters');
        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', () => this.applyFilters());
        }
        
        // Price filters
        const minPrice = document.getElementById('minPrice');
        const maxPrice = document.getElementById('maxPrice');
        const sortSelect = document.getElementById('sortSelect');
        
        if (minPrice) minPrice.addEventListener('change', () => this.updateFilters());
        if (maxPrice) maxPrice.addEventListener('change', () => this.updateFilters());
        if (sortSelect) sortSelect.addEventListener('change', () => this.updateFilters());
    },
    
    updateFilters() {
        const minPrice = document.getElementById('minPrice');
        const maxPrice = document.getElementById('maxPrice');
        const sortSelect = document.getElementById('sortSelect');
        
        if (minPrice) APP_STATE.filters.minPrice = minPrice.value;
        if (maxPrice) APP_STATE.filters.maxPrice = maxPrice.value;
        if (sortSelect) APP_STATE.filters.sort = sortSelect.value;
    },
    
    applyFilters() {
        let filtered = [...APP_STATE.products];
        
        // Search filter
        if (APP_STATE.searchQuery) {
            const query = APP_STATE.searchQuery.toLowerCase();
            filtered = filtered.filter(product => 
                product.title[APP_STATE.currentLanguage].toLowerCase().includes(query) ||
                product.description[APP_STATE.currentLanguage].toLowerCase().includes(query)
            );
        }
        
        // Province filter
        if (APP_STATE.currentProvince) {
            filtered = filtered.filter(product => 
                product.location.provinceId === APP_STATE.currentProvince
            );
        }
        
        // Category filter
        if (APP_STATE.filters.category) {
            filtered = filtered.filter(product => 
                product.categoryId === APP_STATE.filters.category
            );
        }
        
        // Price filter
        if (APP_STATE.filters.minPrice) {
            filtered = filtered.filter(product => 
                product.price >= parseInt(APP_STATE.filters.minPrice)
            );
        }
        
        if (APP_STATE.filters.maxPrice) {
            filtered = filtered.filter(product => 
                product.price <= parseInt(APP_STATE.filters.maxPrice)
            );
        }
        
        // Sort
        this.sortProducts(filtered);
        
        APP_STATE.filteredProducts = filtered;
        APP_STATE.currentPage = 1;
        renderer.renderProducts();
    },
    
    sortProducts(products) {
        switch (APP_STATE.filters.sort) {
            case 'price-low':
                products.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                products.sort((a, b) => b.price - a.price);
                break;
            case 'popular':
                products.sort((a, b) => (b.views || 0) - (a.views || 0));
                break;
            case 'newest':
            default:
                products.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
                break;
        }
    }
};

// Event Handlers
const eventHandlers = {
    init() {
        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const nav = document.querySelector('.nav');
        
        if (mobileMenuToggle && nav) {
            mobileMenuToggle.addEventListener('click', () => {
                nav.classList.toggle('active');
            });
        }
        
        // Load more button
        const loadMoreBtn = document.getElementById('loadMore');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                APP_STATE.currentPage++;
                renderer.renderProducts();
            });
        }
        
        // Modal close
        const modalClose = document.getElementById('modalClose');
        const modal = document.getElementById('productModal');
        
        if (modalClose && modal) {
            modalClose.addEventListener('click', () => {
                modal.style.display = 'none';
            });
            
            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
        
        // Search form submit
        const searchForm = document.querySelector('.search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                filterManager.applyFilters();
            });
        }
        
        // Add neon animation to buttons
        this.addNeonAnimations();
    },
    
    addNeonAnimations() {
        const neonButtons = document.querySelectorAll('.btn-neon');
        neonButtons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.classList.add('animate');
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.classList.remove('animate');
            });
        });
    }
};

// Geolocation Management
const geolocation = {
    init() {
        this.detectUserLocation();
    },
    
    async detectUserLocation() {
        try {
            // Try to get user's location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => this.handleLocationSuccess(position),
                    (error) => this.handleLocationError(error)
                );
            } else {
                console.log('Geolocation is not supported by this browser.');
            }
        } catch (error) {
            console.error('Error detecting location:', error);
        }
    },
    
    handleLocationSuccess(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        // Find nearest province based on coordinates
        const nearestProvince = this.findNearestProvince(lat, lng);
        if (nearestProvince) {
            APP_STATE.currentProvince = nearestProvince.id;
            const provinceSelect = document.getElementById('provinceSelect');
            if (provinceSelect) {
                provinceSelect.value = nearestProvince.id;
                filterManager.applyFilters();
            }
        }
    },
    
    handleLocationError(error) {
        console.log('Location error:', error.message);
        // Fallback: show all provinces
    },
    
    findNearestProvince(lat, lng) {
        // Simple distance calculation to find nearest province
        let nearestProvince = null;
        let minDistance = Infinity;
        
        APP_STATE.provinces.forEach(province => {
            if (province.coordinates) {
                const distance = this.calculateDistance(
                    lat, lng,
                    province.coordinates.lat,
                    province.coordinates.lng
                );
                
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestProvince = province;
                }
            }
        });
        
        return nearestProvince;
    },
    
    calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // Earth's radius in kilometers
        const dLat = this.toRad(lat2 - lat1);
        const dLng = this.toRad(lng2 - lng1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
                  Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    },
    
    toRad(value) {
        return value * Math.PI / 180;
    }
};

// Application Initialization
class AfghanMarketApp {
    async init() {
        console.log('Initializing Afghan Market App...');
        
        // Initialize language manager first
        languageManager.init();
        
        // Load data
        const dataLoaded = await dataManager.loadData();
        if (!dataLoaded) {
            console.error('Failed to load application data');
            return;
        }
        
        // Initialize components
        filterManager.init();
        eventHandlers.init();
        geolocation.init();
        
        // Render UI components
        renderer.renderCategories();
        renderer.renderProvinceSelector();
        renderer.renderProducts();
        
        console.log('Afghan Market App initialized successfully!');
    }
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new AfghanMarketApp();
    app.init();
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        APP_STATE,
        languageManager,
        dataManager,
        renderer,
        filterManager,
        utils
    };
}
