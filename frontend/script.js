const API_BASE_URL = `${window.location.origin}/api`;
const SOCKET_URL = window.location.origin;
const page = document.body.dataset.page;
let transactionsChart;

document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  animateCounters();

  if (page === "home") {
    setupAuthForm();
    setupPredictionForm();
    loadRecentTransactions();
  }

  if (page === "dashboard") {
    setupDashboard();
  }
});

function initializeTheme() {
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("pulse-theme") || "dark";
  root.setAttribute("data-theme", savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", nextTheme);
      localStorage.setItem("pulse-theme", nextTheme);
    });
  }
}

function animateCounters() {
  document.querySelectorAll(".counter").forEach((counter) => {
    const target = Number(counter.dataset.target || 0);
    const step = Math.max(1, Math.floor(target / 64));
    let value = 0;

    const interval = window.setInterval(() => {
      value += step;

      if (value >= target) {
        value = target;
        clearInterval(interval);
      }

      counter.textContent = target > 999 ? value.toLocaleString() : value;
    }, 22);
  });
}

function setupPredictionForm() {
  const form = document.getElementById("predictionForm");
  const predictButton = document.getElementById("predictButton");
  const buttonText = predictButton?.querySelector(".btn-text");
  const loader = predictButton?.querySelector(".loader-ring");

  if (!form || !predictButton) {
    return;
  }

  form.time.value = new Date().toISOString().slice(0, 16);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(form).entries());
    payload.amount = Number(payload.amount);

    toggleLoadingState(true, predictButton, buttonText, loader);

    try {
      const token = localStorage.getItem("pulse-token");
      const response = await fetch(`${API_BASE_URL}/transactions/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Prediction failed");
      }

      renderPredictionResult(result.transaction);
      showToast(
        result.transaction.prediction
          ? "Fraud energy detected. Case flagged for review."
          : "Transaction looks clean. Sent to history.",
        result.transaction.prediction ? "danger" : "safe"
      );
      loadRecentTransactions();
      form.reset();
      form.time.value = new Date().toISOString().slice(0, 16);
    } catch (error) {
      showToast(error.message || "Unable to process transaction right now.", "danger");
    } finally {
      toggleLoadingState(false, predictButton, buttonText, loader, "Predict Fraud");
    }
  });
}

function setupAuthForm() {
  const form = document.getElementById("authForm");
  const status = document.getElementById("authStatus");
  const nameFieldWrapper = document.getElementById("nameFieldWrapper");
  const submitButton = document.getElementById("authSubmitButton");
  const modeTitle = document.getElementById("authModeTitle");
  const modeDescription = document.getElementById("authModeDescription");
  const tabs = Array.from(document.querySelectorAll(".auth-tab"));

  if (!form || !status || !nameFieldWrapper || !submitButton || tabs.length === 0) {
    return;
  }

  let mode = "signup";
  refreshAuthStatus(status);
  applyAuthMode(mode, tabs, nameFieldWrapper, submitButton, modeTitle, modeDescription);

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      mode = tab.dataset.authMode || "signup";
      applyAuthMode(mode, tabs, nameFieldWrapper, submitButton, modeTitle, modeDescription);
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(form).entries());

    if (mode === "login") {
      delete payload.name;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Authentication failed");
      }

      localStorage.setItem("pulse-token", result.token);
      localStorage.setItem("pulse-user", JSON.stringify(result.user));
      refreshAuthStatus(status);
      showToast(mode === "signup" ? "Account created and linked." : "Logged in and synced.", "safe");
      form.reset();
    } catch (error) {
      showToast(error.message || "Authentication failed", "danger");
    }
  });
}

function applyAuthMode(mode, tabs, nameFieldWrapper, submitButton, modeTitle, modeDescription) {
  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.authMode === mode);
  });

  nameFieldWrapper.classList.toggle("d-none", mode === "login");
  submitButton.textContent = mode === "signup" ? "Create Account" : "Login";

  if (modeTitle) {
    modeTitle.textContent = mode === "signup" ? "Create your analyst account" : "Welcome back to the analyst panel";
  }

  if (modeDescription) {
    modeDescription.textContent =
      mode === "signup"
        ? "Spin up a profile to attach JWT auth to every prediction you submit."
        : "Drop back in, restore your token flow, and keep your transaction checks tracked.";
  }
}

function toggleLoadingState(isLoading, button, textNode, loaderNode, idleLabel = "Predict Fraud") {
  button.disabled = isLoading;

  if (textNode) {
    textNode.textContent = isLoading ? "Analyzing..." : idleLabel;
  }

  if (loaderNode) {
    loaderNode.classList.toggle("d-none", !isLoading);
  }
}

function renderPredictionResult(transaction) {
  const resultState = document.getElementById("resultState");
  const resultCard = document.getElementById("resultCard");
  const alertBanner = document.getElementById("alertBanner");
  const probabilityValue = document.getElementById("probabilityValue");
  const decisionText = document.getElementById("decisionText");
  const recommendationText = document.getElementById("recommendationText");
  const probabilityRing = document.getElementById("probabilityRing");

  if (!resultCard || !probabilityRing) {
    return;
  }

  const probability = Math.round((transaction.probability || 0) * 100);
  const ringLength = 327;
  const offset = ringLength - (ringLength * probability) / 100;
  const isFraud = Boolean(transaction.prediction);

  resultState?.classList.add("d-none");
  resultCard.classList.remove("d-none");

  alertBanner.textContent = isFraud ? "Fraud detected" : "Safe transaction";
  alertBanner.className = `alert-banner ${isFraud ? "danger-state" : "safe-state"}`;
  probabilityValue.textContent = `${probability}%`;
  decisionText.textContent = isFraud ? "Suspicious transaction energy" : "Legitimate transaction pattern";
  recommendationText.textContent = isFraud
    ? "Escalate to manual review and block fulfillment until verified."
    : "Proceed normally and keep the transaction in the approved lane.";
  probabilityRing.style.strokeDashoffset = String(offset);
  probabilityRing.style.stroke = isFraud ? "#ff6f91" : "#6be8ff";
}

async function loadRecentTransactions() {
  const tbody = document.getElementById("recentTransactionsTable");

  if (!tbody) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/transactions?limit=5`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to load transactions");
    }

    tbody.innerHTML = data.transactions.map((transaction) => createRecentTransactionRow(transaction)).join("") || createEmptyRow(5);
  } catch (error) {
    tbody.innerHTML = `<tr><td colspan="5">${error.message}</td></tr>`;
  }
}

function createRecentTransactionRow(transaction) {
  const chipClass = transaction.prediction ? "danger-state" : "safe-state";
  const chipText = transaction.prediction ? "Fraud" : "Safe";

  return `
    <tr>
      <td>${transaction.userId}</td>
      <td>${formatCurrency(transaction.amount)}</td>
      <td>${transaction.location}</td>
      <td>${capitalize(transaction.device)}</td>
      <td><span class="status-chip ${chipClass}">${chipText}</span></td>
    </tr>
  `;
}

function setupDashboard() {
  loadDashboardData();

  document.getElementById("refreshDashboard")?.addEventListener("click", loadDashboardData);
  document.getElementById("fraudOnlyFilter")?.addEventListener("change", loadDashboardData);
  document.getElementById("exportCsv")?.addEventListener("click", () => {
    window.open(`${API_BASE_URL}/transactions/export/csv`, "_blank");
  });

  if (window.io) {
    const socket = window.io(SOCKET_URL);
    socket.on("transaction:new", () => {
      loadDashboardData();
      showToast("Live transaction pulse received.", "safe");
    });
  }
}

async function loadDashboardData() {
  const fraudOnly = document.getElementById("fraudOnlyFilter")?.checked;

  try {
    const [statsResponse, transactionsResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/transactions/stats/summary`),
      fetch(`${API_BASE_URL}/transactions?fraudOnly=${Boolean(fraudOnly)}`)
    ]);

    const stats = await statsResponse.json();
    const list = await transactionsResponse.json();

    if (!statsResponse.ok) {
      throw new Error(stats.message || "Unable to load dashboard stats");
    }

    if (!transactionsResponse.ok) {
      throw new Error(list.message || "Unable to load transactions");
    }

    updateDashboardMetrics(stats.stats);
    updateHistoryTable(list.transactions);
    updateTransactionsChart(stats.stats.chartData);
  } catch (error) {
    showToast(error.message || "Dashboard refresh failed", "danger");
  }
}

function updateDashboardMetrics(stats) {
  document.getElementById("totalTransactions").textContent = stats.totalTransactions;
  document.getElementById("fraudTransactions").textContent = stats.fraudDetected;
  document.getElementById("legitTransactions").textContent = stats.legitimateTransactions;

  const probabilityPercent = Math.round((stats.averageProbability || 0) * 100);
  const riskPill = document.getElementById("dashboardRiskPill");
  document.getElementById("avgProbability").textContent = `${probabilityPercent}%`;

  if (riskPill) {
    const highRisk = probabilityPercent >= 60;
    riskPill.textContent = highRisk ? "High Risk" : "Low Risk";
    riskPill.className = `risk-pill ${highRisk ? "danger-state" : "safe-state"}`;
  }
}

function updateHistoryTable(transactions) {
  const tbody = document.getElementById("historyTableBody");

  if (!tbody) {
    return;
  }

  tbody.innerHTML = transactions.map((transaction) => `
    <tr>
      <td>${transaction.userId}</td>
      <td>${formatCurrency(transaction.amount)}</td>
      <td>${transaction.location}</td>
      <td>${capitalize(transaction.device)}</td>
      <td>${formatDate(transaction.time)}</td>
      <td>${Math.round((transaction.probability || 0) * 100)}%</td>
      <td><span class="status-chip ${transaction.prediction ? "danger-state" : "safe-state"}">${transaction.prediction ? "Fraud" : "Safe"}</span></td>
    </tr>
  `).join("") || createEmptyRow(7);
}

function updateTransactionsChart(chartData) {
  const chartCanvas = document.getElementById("transactionsChart");

  if (!chartCanvas || !window.Chart) {
    return;
  }

  if (transactionsChart) {
    transactionsChart.destroy();
  }

  transactionsChart = new window.Chart(chartCanvas, {
    type: "line",
    data: {
      labels: chartData.labels,
      datasets: [
        {
          label: "Fraud probability",
          data: chartData.values,
          borderColor: "#6be8ff",
          backgroundColor: "rgba(107, 232, 255, 0.18)",
          tension: 0.36,
          fill: true,
          pointRadius: 3,
          pointHoverRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: getComputedStyle(document.documentElement).getPropertyValue("--text-main")
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: getComputedStyle(document.documentElement).getPropertyValue("--text-soft")
          },
          grid: {
            color: "rgba(255,255,255,0.05)"
          }
        },
        y: {
          suggestedMin: 0,
          suggestedMax: 1,
          ticks: {
            color: getComputedStyle(document.documentElement).getPropertyValue("--text-soft")
          },
          grid: {
            color: "rgba(255,255,255,0.05)"
          }
        }
      }
    }
  });
}

function showToast(message, tone = "safe") {
  const stack = document.getElementById("toastContainer");

  if (!stack) {
    return;
  }

  const toast = document.createElement("div");
  toast.className = "app-toast";
  toast.innerHTML = `<strong>${tone === "danger" ? "Alert" : "Notice"}</strong><div>${message}</div>`;
  stack.appendChild(toast);

  window.setTimeout(() => {
    toast.remove();
  }, 3200);
}

function createEmptyRow(colspan) {
  return `<tr><td colspan="${colspan}" class="text-center py-4">No transactions available.</td></tr>`;
}

function refreshAuthStatus(statusNode) {
  const user = localStorage.getItem("pulse-user");

  if (!statusNode) {
    return;
  }

  if (!user) {
    statusNode.textContent = "No analyst logged in yet. Sign up or login to attach JWT auth to your scans.";
    return;
  }

  const parsedUser = JSON.parse(user);
  statusNode.textContent = `Signed in as ${parsedUser.email}. Predictions now ride with your analyst token.`;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(Number(amount || 0));
}

function formatDate(value) {
  return new Date(value).toLocaleString();
}

function capitalize(value) {
  return String(value || "").charAt(0).toUpperCase() + String(value || "").slice(1);
}
