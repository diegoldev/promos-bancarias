const STORAGE_KEY = 'superpromos_data_v2';
const CATALOG_KEY = 'superpromos_catalogs_v2';
const RESET_TRACKER_KEY = 'superpromos_reset_tracker_v1';

const DAY_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const DAY_SHORT = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const DEFAULT_SUPERMARKETS = [
  'Coto',
  'Carrefour',
  'Jumbo',
  'Disco',
  'Vea',
  'Día'
];

const DEFAULT_BANKS = [
  'MODO (Santander)',
  'Santander Sorpresa',
  'Cuenta DNI',
  'Mercado Pago',
  'Comunidad / Fidelidad'
];

const BANK_COLORS = {
  'MODO (Santander)': '#ec0000',
  'Santander Sorpresa': '#b91c1c',
  'Cuenta DNI': '#009fe3',
  'Mercado Pago': '#00b1ea',
  'Comunidad / Fidelidad': '#8b5cf6'
};

// Promociones precargadas con Jumbo, Disco y Vea separados para que cada uno tenga sus propios días
const DEFAULT_PROMOS = [
  {
    id: 'santander-modo-coto',
    supermarket: 'Coto',
    bank: 'MODO (Santander)',
    discount: 25,
    cap: 15000,
    period: 'Semanal',
    days: [5, 6], // Viernes y Sábados
    title: 'Pagando con QR MODO desde App Santander o MODO',
    notes: 'Tarjetas Visa y Mastercard Crédito. Acumulable con promos del súper.',
    usedCap: 0
  },
  {
    id: 'santander-modo-carrefour',
    supermarket: 'Carrefour',
    bank: 'MODO (Santander)',
    discount: 25,
    cap: 15000,
    period: 'Semanal',
    days: [3, 5], // Miércoles y Viernes
    title: 'QR MODO con tarjetas Santander Visa/Mastercard',
    notes: 'Aplica en Hiper, Market y Express adheridos pagando con MODO.',
    usedCap: 0
  },
  {
    id: 'santander-sorpresa-jumbo',
    supermarket: 'Jumbo',
    bank: 'Santander Sorpresa',
    discount: 30,
    cap: 20000,
    period: 'Mensual',
    days: [2], // Martes (editable a tus días de Jumbo)
    title: 'Suscriptos a Sorpresa Santander + pago vía MODO',
    notes: 'Requiere tener activo Santander Sorpresa. Podés editar el día según tu cartera.',
    usedCap: 0
  },
  {
    id: 'santander-sorpresa-disco',
    supermarket: 'Disco',
    bank: 'Santander Sorpresa',
    discount: 30,
    cap: 20000,
    period: 'Mensual',
    days: [3], // Miércoles (editable a tus días de Disco)
    title: 'Suscriptos a Sorpresa Santander + pago vía MODO',
    notes: 'Exclusivo tiendas Disco. Podés cambiar el día tocando Editar.',
    usedCap: 0
  },
  {
    id: 'santander-sorpresa-vea',
    supermarket: 'Vea',
    bank: 'Santander Sorpresa',
    discount: 30,
    cap: 20000,
    period: 'Mensual',
    days: [4], // Jueves (editable a tus días de Vea)
    title: 'Suscriptos a Sorpresa Santander + pago vía MODO',
    notes: 'Exclusivo sucursales Vea. Podés cambiar el día tocando Editar.',
    usedCap: 0
  },
  {
    id: 'santander-modo-dia',
    supermarket: 'Día',
    bank: 'MODO (Santander)',
    discount: 25,
    cap: 10000,
    period: 'Semanal',
    days: [4, 6], // Jueves y Sábados
    title: 'Pagando con MODO desde App Santander',
    notes: 'Acumula con cupones de Club Día en tienda física.',
    usedCap: 0
  },
  {
    id: 'cuenta-dni-coto',
    supermarket: 'Coto',
    bank: 'Cuenta DNI',
    discount: 20,
    cap: 8000,
    period: 'Mensual',
    days: [1, 2], // Lunes y Martes
    title: 'Pago con QR Cuenta DNI o Clave DNI',
    notes: 'Reintegro en cuenta dentro de los 10 días hábiles.',
    usedCap: 0
  },
  {
    id: 'cuenta-dni-dia',
    supermarket: 'Día',
    bank: 'Cuenta DNI',
    discount: 20,
    cap: 8000,
    period: 'Semanal',
    days: [1, 2], // Lunes y Martes
    title: 'Pagando con QR Cuenta DNI en tiendas Día',
    notes: 'Suele requerir ticket mínimo. Acumulable con Club Día.',
    usedCap: 0
  },
  {
    id: 'cuenta-dni-jumbo',
    supermarket: 'Jumbo',
    bank: 'Cuenta DNI',
    discount: 20,
    cap: 8000,
    period: 'Mensual',
    days: [2], // Martes
    title: 'Sucursales adheridas Jumbo con QR Cuenta DNI',
    notes: 'Tope unificado mensual.',
    usedCap: 0
  },
  {
    id: 'cuenta-dni-disco',
    supermarket: 'Disco',
    bank: 'Cuenta DNI',
    discount: 20,
    cap: 8000,
    period: 'Mensual',
    days: [1, 3], // Lunes y Miércoles
    title: 'Sucursales adheridas Disco con QR Cuenta DNI',
    notes: 'Tope unificado mensual.',
    usedCap: 0
  },
  {
    id: 'cuenta-dni-vea',
    supermarket: 'Vea',
    bank: 'Cuenta DNI',
    discount: 20,
    cap: 8000,
    period: 'Mensual',
    days: [3, 4], // Miércoles y Jueves
    title: 'Sucursales adheridas Vea con QR Cuenta DNI',
    notes: 'Tope unificado mensual.',
    usedCap: 0
  },
  {
    id: 'mp-carrefour',
    supermarket: 'Carrefour',
    bank: 'Mercado Pago',
    discount: 15,
    cap: 0,
    period: 'En el acto (Sin tope)',
    days: [4], // Jueves
    title: 'Pagando con dinero en cuenta vía QR Mercado Pago',
    notes: 'Sin tope de reintegro en el acto en línea de cajas. Acumula con Mi Carrefour.',
    usedCap: 0
  },
  {
    id: 'mp-dia',
    supermarket: 'Día',
    bank: 'Mercado Pago',
    discount: 15,
    cap: 5000,
    period: 'Semanal',
    days: [3], // Miércoles
    title: 'QR Mercado Pago (compra mínima $15.000)',
    notes: 'Descuento inmediato al escanear QR de Mercado Pago.',
    usedCap: 0
  },
  {
    id: 'mp-coto',
    supermarket: 'Coto',
    bank: 'Mercado Pago',
    discount: 15,
    cap: 0,
    period: 'En el acto (Sin tope)',
    days: [5], // Viernes
    title: 'QR Mercado Pago (Sucursales físicas)',
    notes: 'Sin tope de reintegro pagando con QR seleccionando dinero en cuenta.',
    usedCap: 0
  }
];

let state = {
  promos: [],
  supermarkets: [],
  banks: [],
  selectedDay: new Date().getDay(), // 0-6, or 'all'
  selectedSuper: 'Todos',
  selectedBank: 'Todos'
};

function loadData() {
  try {
    const rawCatalogs = localStorage.getItem(CATALOG_KEY);
    if (rawCatalogs) {
      const parsed = JSON.parse(rawCatalogs);
      state.supermarkets = parsed.supermarkets || [...DEFAULT_SUPERMARKETS];
      state.banks = parsed.banks || [...DEFAULT_BANKS];
    } else {
      state.supermarkets = [...DEFAULT_SUPERMARKETS];
      state.banks = [...DEFAULT_BANKS];
      saveCatalogs();
    }

    const rawPromos = localStorage.getItem(STORAGE_KEY);
    if (rawPromos) {
      state.promos = JSON.parse(rawPromos);
    } else {
      // Migrar si tenía datos de v1 pero separando "Jumbo / Disco / Vea" en Jumbo, Disco y Vea
      const oldRaw = localStorage.getItem('superpromos_data_v1');
      if (oldRaw) {
        const oldPromos = JSON.parse(oldRaw);
        const migrated = [];
        oldPromos.forEach(p => {
          if (p.supermarket === 'Jumbo / Disco / Vea') {
            migrated.push({ ...p, id: p.id + '-jumbo', supermarket: 'Jumbo', days: [2] });
            migrated.push({ ...p, id: p.id + '-disco', supermarket: 'Disco', days: [3] });
            migrated.push({ ...p, id: p.id + '-vea', supermarket: 'Vea', days: [4] });
          } else {
            migrated.push(p);
          }
        });
        state.promos = migrated;
      } else {
        state.promos = JSON.parse(JSON.stringify(DEFAULT_PROMOS));
      }
      savePromos();
    }
    checkAndAutoResetCaps();
  } catch (e) {
    state.supermarkets = [...DEFAULT_SUPERMARKETS];
    state.banks = [...DEFAULT_BANKS];
    state.promos = JSON.parse(JSON.stringify(DEFAULT_PROMOS));
  }
}

function getPeriodIdentifiers(now = new Date()) {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const monthKey = `${year}-${month}`;
  const dayKey = `${year}-${month}-${day}`;

  // Lunes de la semana actual como identificador semanal
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dayOfWeek = d.getDay(); // 0 (Dom) a 6 (Sáb)
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  d.setDate(d.getDate() + diffToMonday);
  const weekKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  return { monthKey, weekKey, dayKey };
}

function checkAndAutoResetCaps() {
  const current = getPeriodIdentifiers();
  let last = null;
  try {
    const raw = localStorage.getItem(RESET_TRACKER_KEY);
    if (raw) last = JSON.parse(raw);
  } catch (e) {}

  if (!last) {
    localStorage.setItem(RESET_TRACKER_KEY, JSON.stringify(current));
    return;
  }

  let changed = false;
  state.promos.forEach(p => {
    if (!p.usedCap || p.usedCap <= 0) return;
    if (p.period === 'Mensual' && last.monthKey !== current.monthKey) {
      p.usedCap = 0;
      changed = true;
    } else if (p.period === 'Semanal' && last.weekKey !== current.weekKey) {
      p.usedCap = 0;
      changed = true;
    } else if (p.period === 'Por Día / Transacción' && last.dayKey !== current.dayKey) {
      p.usedCap = 0;
      changed = true;
    }
  });

  localStorage.setItem(RESET_TRACKER_KEY, JSON.stringify(current));
  if (changed) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.promos));
  }
}

function saveCatalogs() {
  localStorage.setItem(CATALOG_KEY, JSON.stringify({
    supermarkets: state.supermarkets,
    banks: state.banks
  }));
}

function savePromos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.promos));
  renderAll();
}

function formatARS(num) {
  return '$' + Math.round(num).toLocaleString('es-AR');
}

function getIdealMaxSpend(promo) {
  if (!promo.cap || promo.cap <= 0) return null;
  const remainingCap = Math.max(0, promo.cap - (promo.usedCap || 0));
  return Math.round((remainingCap / promo.discount) * 100);
}

// Render Header & iOS Summary Widget
function renderHeaderAndWidget() {
  const now = new Date();
  const todayIdx = now.getDay();
  const dateStr = now.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'short' });
  document.getElementById('currentDateLabel').textContent = `HOY • ${dateStr.toUpperCase()}`;

  const totalSaved = state.promos.reduce((acc, p) => acc + (Number(p.usedCap) || 0), 0);
  document.getElementById('widgetTotalSaved').textContent = `Ahorrado: ${formatARS(totalSaved)}`;

  const activeDay = state.selectedDay === 'all' ? todayIdx : Number(state.selectedDay);
  const dayPromos = state.promos
    .filter(p => p.days.includes(activeDay))
    .sort((a, b) => b.discount - a.discount);

  const dayLabel = activeDay === todayIdx ? 'PROMOS DE HOY (' + DAY_NAMES[activeDay].toUpperCase() + ')' : 'PROMOS DEL ' + DAY_NAMES[activeDay].toUpperCase();
  document.getElementById('widgetDayTitle').textContent = dayLabel;

  const headlineEl = document.getElementById('widgetHeadline');
  const subtextEl = document.getElementById('widgetSubtext');

  if (dayPromos.length === 0) {
    headlineEl.textContent = `No tenés promos cargadas para el ${DAY_NAMES[activeDay]}.`;
    subtextEl.textContent = 'Tocá ➕ arriba a la derecha para agregar una promoción.';
  } else {
    const best = dayPromos[0];
    const ideal = getIdealMaxSpend(best);
    headlineEl.textContent = `🔥 Mejor hoy: ${best.discount}% en ${best.supermarket} con ${best.bank}`;
    const othersCount = dayPromos.length - 1;
    const capText = best.cap > 0
      ? `Tope disp: ${formatARS(Math.max(0, best.cap - (best.usedCap || 0)))} (comprá hasta ${formatARS(ideal)})`
      : '¡Sin tope de reintegro!';
    subtextEl.textContent = `${capText}${othersCount > 0 ? ` • +${othersCount} promo${othersCount > 1 ? 's' : ''} más` : ''}`;
  }
}

// Render Days Bar
function renderDaysBar() {
  const container = document.getElementById('daysBar');
  const todayIdx = new Date().getDay();
  const order = [1, 2, 3, 4, 5, 6, 0]; // Lun a Dom

  let html = `
    <button class="day-btn ${state.selectedDay === 'all' ? 'active' : ''}" data-day="all">
      <span class="day-short">Todos</span>
      <span class="day-count">${state.promos.length}</span>
    </button>
  `;

  order.forEach(d => {
    const count = state.promos.filter(p => p.days.includes(d)).length;
    const isToday = d === todayIdx;
    const isActive = state.selectedDay === d;
    html += `
      <button class="day-btn ${isActive ? 'active' : ''} ${isToday ? 'is-today' : ''}" data-day="${d}">
        <span class="day-short">${DAY_SHORT[d]}${isToday ? '•' : ''}</span>
        <span class="day-count">${count}</span>
      </button>
    `;
  });

  container.innerHTML = html;

  container.querySelectorAll('.day-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.day;
      state.selectedDay = val === 'all' ? 'all' : Number(val);
      renderAll();
    });
  });
}

// Render Filter Pills + Edit Supermarkets Chip
function renderFilters() {
  const supers = ['Todos', ...state.supermarkets];
  const superRow = document.getElementById('superFilterRow');
  superRow.innerHTML = supers.map(s => `
    <button class="filter-pill ${state.selectedSuper === s ? 'active' : ''}" data-super="${s}">
      🛒 ${s}
    </button>
  `).join('') + `
    <button class="filter-pill" id="btnPillManageSupers" style="border-style: dashed; color: #34d399;">
      ✏️ Editar Súpers
    </button>
  `;

  superRow.querySelectorAll('.filter-pill[data-super]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedSuper = btn.dataset.super;
      renderAll();
    });
  });

  document.getElementById('btnPillManageSupers')?.addEventListener('click', openCatalogModal);

  const banks = ['Todos', ...state.banks];
  const bankRow = document.getElementById('bankFilterRow');
  bankRow.innerHTML = banks.map(b => `
    <button class="filter-pill ${state.selectedBank === b ? 'active' : ''}" data-bank="${b}">
      💳 ${b}
    </button>
  `).join('') + `
    <button class="filter-pill" id="btnPillManageBanks" style="border-style: dashed; color: #38bdf8;">
      ✏️ Editar Bancos
    </button>
  `;

  bankRow.querySelectorAll('.filter-pill[data-bank]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedBank = btn.dataset.bank;
      renderAll();
    });
  });

  document.getElementById('btnPillManageBanks')?.addEventListener('click', openCatalogModal);
}

// Populate Form Selects Dynamically
function populatePromoFormSelects(selectedSuper, selectedBank) {
  const superSelect = document.getElementById('promoSuper');
  const bankSelect = document.getElementById('promoBank');

  const supersList = [...state.supermarkets];
  if (selectedSuper && !supersList.includes(selectedSuper)) {
    supersList.push(selectedSuper);
  }
  superSelect.innerHTML = supersList.map(s => `<option value="${s}">${s}</option>`).join('');
  if (selectedSuper) superSelect.value = selectedSuper;

  const banksList = [...state.banks];
  if (selectedBank && !banksList.includes(selectedBank)) {
    banksList.push(selectedBank);
  }
  bankSelect.innerHTML = banksList.map(b => `<option value="${b}">${b}</option>`).join('');
  if (selectedBank) bankSelect.value = selectedBank;
}

// Render Promo Cards
function renderPromosList() {
  const listEl = document.getElementById('promosList');
  const todayIdx = new Date().getDay();

  const filtered = state.promos.filter(p => {
    const matchDay = state.selectedDay === 'all' || p.days.includes(Number(state.selectedDay));
    const matchSuper = state.selectedSuper === 'Todos' || p.supermarket === state.selectedSuper;
    const matchBank = state.selectedBank === 'Todos' || p.bank === state.selectedBank;
    return matchDay && matchSuper && matchBank;
  }).sort((a, b) => b.discount - a.discount);

  if (filtered.length === 0) {
    listEl.innerHTML = `
      <div class="empty-state">
        <p style="font-size: 15px; font-weight: 700; margin-bottom: 6px;">No hay promociones para este filtro</p>
        <p style="font-size: 13px;">Probá cambiando el día seleccionado arriba, tocá <strong>"Todos"</strong> o agregá una nueva promo con ➕.</p>
      </div>
    `;
    return;
  }

  listEl.innerHTML = filtered.map(p => {
    const color = BANK_COLORS[p.bank] || '#10b981';
    const hasCap = p.cap && p.cap > 0;
    const used = Number(p.usedCap) || 0;
    const remaining = hasCap ? Math.max(0, p.cap - used) : 0;
    const idealSpend = getIdealMaxSpend(p);
    const pctUsed = hasCap ? Math.min(100, Math.round((used / p.cap) * 100)) : 0;

    const daysChips = p.days.map(d => `
      <span class="day-chip ${d === todayIdx ? 'today' : ''}">${DAY_SHORT[d]}</span>
    `).join('');

    return `
      <article class="promo-card" style="--card-accent: ${color}">
        <div class="promo-header">
          <div class="promo-badges">
            <span class="super-badge">🛒 ${p.supermarket}</span>
            <span class="bank-badge" style="background: ${color}">${p.bank}</span>
          </div>
          <div class="discount-tag">${p.discount}%</div>
        </div>

        <h3 class="promo-title">${p.title}</h3>
        ${p.notes ? `<p class="promo-details">${p.notes}</p>` : ''}

        <div class="promo-meta-grid">
          <div class="meta-box">
            <span class="meta-label">Tope ${p.period}</span>
            <span class="meta-val">${hasCap ? formatARS(p.cap) : 'Sin Tope'}</span>
          </div>
          <div class="meta-box">
            <span class="meta-label">Tope Disp.</span>
            <span class="meta-val" style="color: ${hasCap && remaining === 0 ? '#ef4444' : '#34d399'}">
              ${hasCap ? formatARS(remaining) : 'Ilimitado'}
            </span>
          </div>
          <div class="meta-box">
            <span class="meta-label">Compra Ideal</span>
            <span class="meta-val highlight">${hasCap ? formatARS(idealSpend) : 'Sin límite'}</span>
          </div>
        </div>

        ${hasCap ? `
          <div class="tope-progress-wrap">
            <div class="tope-progress-header">
              <span>Tope usado: ${formatARS(used)} de ${formatARS(p.cap)}</span>
              <strong>${pctUsed}%</strong>
            </div>
            <div class="tope-progress-bar">
              <div class="tope-progress-fill ${pctUsed >= 85 ? 'warning' : ''}" style="width: ${pctUsed}%"></div>
            </div>
          </div>
        ` : ''}

        <div class="promo-actions">
          <div class="day-chips">${daysChips}</div>
          <div class="card-btns">
            ${hasCap ? `<button class="btn-small primary" data-action="spend" data-id="${p.id}">💸 Usé tope</button>` : ''}
            <button class="btn-small" data-action="edit" data-id="${p.id}">✏️ Editar</button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  listEl.querySelectorAll('[data-action="edit"]').forEach(btn => {
    btn.addEventListener('click', () => openEditModal(btn.dataset.id));
  });

  listEl.querySelectorAll('[data-action="spend"]').forEach(btn => {
    btn.addEventListener('click', () => openSpendModal(btn.dataset.id));
  });
}

// Calculator logic
function renderCalculator() {
  const select = document.getElementById('calcPromoSelect');
  const currentVal = select.value;

  select.innerHTML = state.promos.map(p => `
    <option value="${p.id}">${p.supermarket} - ${p.bank} (${p.discount}%)</option>
  `).join('');

  if (currentVal && state.promos.some(p => p.id === currentVal)) {
    select.value = currentVal;
  }

  updateCalculatorValues();
}

function updateCalculatorValues() {
  const select = document.getElementById('calcPromoSelect');
  const amountInput = document.getElementById('calcAmountInput');
  const promo = state.promos.find(p => p.id === select.value);
  if (!promo) return;

  const ticket = Number(amountInput.value) || 0;
  const hasCap = promo.cap && promo.cap > 0;
  const remainingCap = hasCap ? Math.max(0, promo.cap - (promo.usedCap || 0)) : Infinity;
  const idealSpend = hasCap ? Math.round((remainingCap / promo.discount) * 100) : null;

  const rawRefund = (ticket * promo.discount) / 100;
  const actualRefund = hasCap ? Math.min(rawRefund, remainingCap) : rawRefund;
  const finalPrice = Math.max(0, ticket - actualRefund);

  document.getElementById('calcDiscountLabel').textContent = `${promo.discount}% (${promo.period})`;
  document.getElementById('calcRemainingCap').textContent = hasCap ? formatARS(remainingCap) : 'Sin tope';
  document.getElementById('calcIdealSpend').textContent = hasCap ? formatARS(idealSpend) : 'Sin límite';
  document.getElementById('calcEstimatedRefund').textContent = formatARS(actualRefund);
  document.getElementById('calcFinalPrice').textContent = formatARS(finalPrice);
}

// Modals: Edit / Add Promo
function openEditModal(promoId = null) {
  const modal = document.getElementById('promoModal');
  const deleteBtn = document.getElementById('btnDeletePromo');
  const form = document.getElementById('promoForm');
  form.reset();

  if (promoId) {
    const p = state.promos.find(item => item.id === promoId);
    if (!p) return;
    populatePromoFormSelects(p.supermarket, p.bank);
    document.getElementById('modalTitle').textContent = 'Editar Promoción';
    document.getElementById('promoId').value = p.id;
    document.getElementById('promoDiscount').value = p.discount;
    document.getElementById('promoCap').value = p.cap;
    document.getElementById('promoPeriod').value = p.period;
    document.getElementById('promoTitle').value = p.title;
    document.getElementById('promoNotes').value = p.notes || '';

    document.querySelectorAll('input[name="promoDays"]').forEach(cb => {
      cb.checked = p.days.includes(Number(cb.value));
    });
    deleteBtn.style.display = 'block';
  } else {
    const defaultSuper = state.selectedSuper !== 'Todos' ? state.selectedSuper : state.supermarkets[0];
    const defaultBank = state.selectedBank !== 'Todos' ? state.selectedBank : state.banks[0];
    populatePromoFormSelects(defaultSuper, defaultBank);
    document.getElementById('modalTitle').textContent = 'Nueva Promoción';
    document.getElementById('promoId').value = '';
    deleteBtn.style.display = 'none';
  }

  modal.classList.add('open');
}

// Modal: Catalog Manager (Supermarkets & Banks CRUD)
function openCatalogModal() {
  renderCatalogLists();
  document.getElementById('catalogModal').classList.add('open');
}

function renderCatalogLists() {
  const superListEl = document.getElementById('superCatalogList');
  superListEl.innerHTML = state.supermarkets.map((s, idx) => `
    <div class="catalog-item">
      <span>🛒 ${s}</span>
      <div class="catalog-item-actions">
        <button type="button" class="btn-small" data-super-rename="${idx}">✏️ Renombrar</button>
        <button type="button" class="btn-small" style="color:#f87171;" data-super-del="${idx}">🗑️</button>
      </div>
    </div>
  `).join('');

  superListEl.querySelectorAll('[data-super-rename]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.superRename);
      const oldName = state.supermarkets[idx];
      const newName = prompt('Nuevo nombre para el supermercado:', oldName);
      if (newName && newName.trim() && newName.trim() !== oldName) {
        const clean = newName.trim();
        state.supermarkets[idx] = clean;
        state.promos.forEach(p => {
          if (p.supermarket === oldName) p.supermarket = clean;
        });
        if (state.selectedSuper === oldName) state.selectedSuper = clean;
        saveCatalogs();
        savePromos();
        renderCatalogLists();
      }
    });
  });

  superListEl.querySelectorAll('[data-super-del]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.superDel);
      const name = state.supermarkets[idx];
      if (state.supermarkets.length <= 1) {
        alert('Debe quedar al menos un supermercado en la lista.');
        return;
      }
      if (confirm(`¿Quitar "${name}" de la lista de supermercados?`)) {
        state.supermarkets.splice(idx, 1);
        if (state.selectedSuper === name) state.selectedSuper = 'Todos';
        saveCatalogs();
        renderAll();
        renderCatalogLists();
      }
    });
  });

  const bankListEl = document.getElementById('bankCatalogList');
  bankListEl.innerHTML = state.banks.map((b, idx) => `
    <div class="catalog-item">
      <span>💳 ${b}</span>
      <div class="catalog-item-actions">
        <button type="button" class="btn-small" data-bank-rename="${idx}">✏️ Renombrar</button>
        <button type="button" class="btn-small" style="color:#f87171;" data-bank-del="${idx}">🗑️</button>
      </div>
    </div>
  `).join('');

  bankListEl.querySelectorAll('[data-bank-rename]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.bankRename);
      const oldName = state.banks[idx];
      const newName = prompt('Nuevo nombre para el banco o billetera:', oldName);
      if (newName && newName.trim() && newName.trim() !== oldName) {
        const clean = newName.trim();
        state.banks[idx] = clean;
        state.promos.forEach(p => {
          if (p.bank === oldName) p.bank = clean;
        });
        if (state.selectedBank === oldName) state.selectedBank = clean;
        saveCatalogs();
        savePromos();
        renderCatalogLists();
      }
    });
  });

  bankListEl.querySelectorAll('[data-bank-del]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.bankDel);
      const name = state.banks[idx];
      if (state.banks.length <= 1) {
        alert('Debe quedar al menos un banco/billetera.');
        return;
      }
      if (confirm(`¿Quitar "${name}" de la lista de bancos?`)) {
        state.banks.splice(idx, 1);
        if (state.selectedBank === name) state.selectedBank = 'Todos';
        saveCatalogs();
        renderAll();
        renderCatalogLists();
      }
    });
  });
}

function openSpendModal(promoId) {
  const p = state.promos.find(item => item.id === promoId);
  if (!p) return;

  document.getElementById('spendPromoId').value = p.id;
  document.getElementById('spendModalTitle').textContent = `${p.supermarket} • ${p.bank}`;
  const remaining = Math.max(0, p.cap - (p.usedCap || 0));
  document.getElementById('spendModalDesc').textContent =
    `Descuento ${p.discount}% • Tope disponible: ${formatARS(remaining)} de ${formatARS(p.cap)}`;
  document.getElementById('spendTicketAmount').value = '';
  document.getElementById('spendRefundAmount').value = '';

  document.getElementById('spendModal').classList.add('open');
}

function generateScriptableCode() {
  const simplified = state.promos.map(p => ({
    s: p.supermarket,
    b: p.bank,
    d: p.discount,
    c: p.cap,
    days: p.days
  }));

  return `// Widget SuperPromos para iOS Scriptable
const PROMOS = ${JSON.stringify(simplified)};
const DAYS = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
const today = new Date().getDay();
const todaysPromos = PROMOS.filter(p => p.days.includes(today)).sort((a,b) => b.d - a.d);

let w = new ListWidget();
w.backgroundColor = new Color("#090d16");
w.setPadding(14, 16, 14, 16);

let title = w.addText("🛒 SUPERPROMOS • " + DAYS[today].toUpperCase());
title.font = Font.boldSystemFont(11);
title.textColor = new Color("#10b981");
w.addSpacer(6);

if (todaysPromos.length === 0) {
  let empty = w.addText("Sin promociones cargadas para hoy.");
  empty.font = Font.systemFont(13);
  empty.textColor = Color.white();
} else {
  todaysPromos.slice(0, 3).forEach(p => {
    let row = w.addText(\`• \${p.d}% \${p.s} - \${p.b} (\${p.c > 0 ? "Tope $" + p.c : "Sin tope"})\`);
    row.font = Font.semiboldSystemFont(12);
    row.textColor = Color.white();
    w.addSpacer(4);
  });
}

Script.setWidget(w);
Script.complete();
w.presentMedium();`;
}

function renderAll() {
  renderHeaderAndWidget();
  renderDaysBar();
  renderFilters();
  renderPromosList();
  renderCalculator();
}

// Event Listeners Setup
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  renderAll();

  // Bottom Navigation
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.target).classList.add('active');
    });
  });

  // Header buttons
  document.getElementById('btnManageCatalogs').addEventListener('click', openCatalogModal);
  document.getElementById('btnAddPromo').addEventListener('click', () => openEditModal(null));
  document.getElementById('btnResetMonth').addEventListener('click', () => {
    if (confirm('¿Querés reiniciar a $0 todos los topes consumidos para empezar una nueva semana/mes?')) {
      state.promos.forEach(p => { p.usedCap = 0; });
      savePromos();
    }
  });

  // Quick Add / Edit Supermarkets & Banks inside Promo Modal
  document.getElementById('btnQuickAddSuper').addEventListener('click', () => {
    const name = prompt('Nombre del nuevo supermercado (ej: ChangoMās, Makro, Vital):');
    if (name && name.trim()) {
      const clean = name.trim();
      if (!state.supermarkets.includes(clean)) {
        state.supermarkets.push(clean);
        saveCatalogs();
        renderFilters();
      }
      populatePromoFormSelects(clean, document.getElementById('promoBank').value);
    }
  });

  document.getElementById('btnQuickAddBank').addEventListener('click', () => {
    const name = prompt('Nombre del nuevo banco, billetera o club (ej: Galicia, BBVA, Jumbo+):');
    if (name && name.trim()) {
      const clean = name.trim();
      if (!state.banks.includes(clean)) {
        state.banks.push(clean);
        saveCatalogs();
        renderFilters();
      }
      populatePromoFormSelects(document.getElementById('promoSuper').value, clean);
    }
  });

  document.getElementById('btnQuickEditSupers').addEventListener('click', () => {
    document.getElementById('promoModal').classList.remove('open');
    openCatalogModal();
  });

  document.getElementById('btnQuickEditBanks').addEventListener('click', () => {
    document.getElementById('promoModal').classList.remove('open');
    openCatalogModal();
  });

  // Catalog Modal Add actions
  document.getElementById('btnAddSuperCatalog').addEventListener('click', () => {
    const input = document.getElementById('newSuperInput');
    const clean = input.value.trim();
    if (!clean) return;
    if (!state.supermarkets.includes(clean)) {
      state.supermarkets.push(clean);
      saveCatalogs();
      renderAll();
      renderCatalogLists();
    }
    input.value = '';
  });

  document.getElementById('btnAddBankCatalog').addEventListener('click', () => {
    const input = document.getElementById('newBankInput');
    const clean = input.value.trim();
    if (!clean) return;
    if (!state.banks.includes(clean)) {
      state.banks.push(clean);
      saveCatalogs();
      renderAll();
      renderCatalogLists();
    }
    input.value = '';
  });

  // Modal Close
  document.getElementById('btnCloseModal').addEventListener('click', () => {
    document.getElementById('promoModal').classList.remove('open');
  });
  document.getElementById('btnCloseCatalogModal').addEventListener('click', () => {
    document.getElementById('catalogModal').classList.remove('open');
  });
  document.getElementById('btnCloseSpendModal').addEventListener('click', () => {
    document.getElementById('spendModal').classList.remove('open');
  });

  // Promo Form Save
  document.getElementById('promoForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('promoId').value;
    const days = Array.from(document.querySelectorAll('input[name="promoDays"]:checked')).map(cb => Number(cb.value));

    if (days.length === 0) {
      alert('Seleccioná al menos un día de la semana.');
      return;
    }

    const promoData = {
      id: id || 'promo-' + Date.now(),
      supermarket: document.getElementById('promoSuper').value,
      bank: document.getElementById('promoBank').value,
      discount: Number(document.getElementById('promoDiscount').value),
      cap: Number(document.getElementById('promoCap').value) || 0,
      period: document.getElementById('promoPeriod').value,
      days,
      title: document.getElementById('promoTitle').value.trim(),
      notes: document.getElementById('promoNotes').value.trim(),
      usedCap: 0
    };

    if (id) {
      const idx = state.promos.findIndex(p => p.id === id);
      if (idx !== -1) {
        promoData.usedCap = state.promos[idx].usedCap || 0;
        state.promos[idx] = promoData;
      }
    } else {
      state.promos.push(promoData);
    }

    savePromos();
    document.getElementById('promoModal').classList.remove('open');
  });

  // Delete Promo
  document.getElementById('btnDeletePromo').addEventListener('click', () => {
    const id = document.getElementById('promoId').value;
    if (id && confirm('¿Eliminar esta promoción?')) {
      state.promos = state.promos.filter(p => p.id !== id);
      savePromos();
      document.getElementById('promoModal').classList.remove('open');
    }
  });

  // Spend Modal Auto-calculation
  document.getElementById('spendTicketAmount').addEventListener('input', (e) => {
    const id = document.getElementById('spendPromoId').value;
    const p = state.promos.find(item => item.id === id);
    if (!p) return;
    const ticket = Number(e.target.value) || 0;
    const remaining = Math.max(0, p.cap - (p.usedCap || 0));
    const estRefund = Math.min(remaining, Math.round((ticket * p.discount) / 100));
    document.getElementById('spendRefundAmount').value = estRefund > 0 ? estRefund : '';
  });

  document.getElementById('btnConfirmSpend').addEventListener('click', () => {
    const id = document.getElementById('spendPromoId').value;
    const p = state.promos.find(item => item.id === id);
    if (!p) return;
    const refund = Number(document.getElementById('spendRefundAmount').value) || 0;
    p.usedCap = Math.min(p.cap, (Number(p.usedCap) || 0) + refund);
    savePromos();
    document.getElementById('spendModal').classList.remove('open');
  });

  document.getElementById('btnResetSingleSpend').addEventListener('click', () => {
    const id = document.getElementById('spendPromoId').value;
    const p = state.promos.find(item => item.id === id);
    if (!p) return;
    p.usedCap = 0;
    savePromos();
    document.getElementById('spendModal').classList.remove('open');
  });

  // Calculator Events
  document.getElementById('calcPromoSelect').addEventListener('change', updateCalculatorValues);
  document.getElementById('calcAmountInput').addEventListener('input', updateCalculatorValues);
  document.getElementById('btnRegisterCalcSpend').addEventListener('click', () => {
    const select = document.getElementById('calcPromoSelect');
    const amountInput = document.getElementById('calcAmountInput');
    const promo = state.promos.find(p => p.id === select.value);
    if (!promo || !promo.cap) {
      alert('Esta promoción no tiene tope limitado para descontar.');
      return;
      }
    const ticket = Number(amountInput.value) || 0;
    if (ticket <= 0) {
      alert('Ingresá primero el monto del ticket a gastar.');
      return;
    }
    const remainingCap = Math.max(0, promo.cap - (promo.usedCap || 0));
    const refund = Math.min(remainingCap, Math.round((ticket * promo.discount) / 100));
    promo.usedCap = (promo.usedCap || 0) + refund;
    savePromos();
    alert(`¡Listo! Se registraron ${formatARS(refund)} usados del tope de ${promo.supermarket} (${promo.bank}).`);
  });

  // Copy Scriptable Widget Code
  document.getElementById('btnCopyScriptable').addEventListener('click', () => {
    const code = generateScriptableCode();
    navigator.clipboard.writeText(code).then(() => {
      alert('¡Código copiado al portapapeles! Pegalo en un script nuevo dentro de la app Scriptable en tu iPhone.');
    });
  });

  // Restore Defaults
  document.getElementById('btnRestoreDefaults').addEventListener('click', () => {
    if (confirm('¿Querés restaurar las promociones y supermercados originales (con Jumbo, Disco y Vea separados)?')) {
      state.supermarkets = [...DEFAULT_SUPERMARKETS];
      state.banks = [...DEFAULT_BANKS];
      state.promos = JSON.parse(JSON.stringify(DEFAULT_PROMOS));
      state.selectedSuper = 'Todos';
      state.selectedBank = 'Todos';
      saveCatalogs();
      savePromos();
    }
  });

  // Register Service Worker for offline PWA support
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
});
